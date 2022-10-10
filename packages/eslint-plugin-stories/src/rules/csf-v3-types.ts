import type { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import isStories from '../utils/isStories';

const failureMessages = {
  specifyType:
    'Specify a type of `StoryObj<Args>` for object stories, so that `composeStories` and Storybook can infer the correct args',
};

/**
 * Enforce specifying an explicit type for story objects where necessary for `composeStories` and
 * Storybook to correctly infer their args.
 *
 * For example, instead of
 *
 *   const Primary = {
 *     render: (args) => { ... },
 *   }
 *
 * this rules enforces adding a type annotation
 *
 *   const Primary: StoryObj<Args> = {
 *     render: (args) => { ... },
 *   }
 *
 * Only detects instances where we're sure a type annotation is needed. For example, when there's a
 * render function defined that takes args (as in the examples above).
 */
const rule: TSESLint.RuleModule<keyof typeof failureMessages> = {
  defaultOptions: [],
  meta: {
    messages: failureMessages,
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      // Examine any named exports. In a stories file, these are likely to be stories.
      // i.e. `export const foo = {}`
      ExportNamedDeclaration(node) {
        const story = StoryObject.parse(node);

        if (story?.definitelyTakesArgs) {
          if (!story.typeAnnotation) {
            context.report({ node, messageId: 'specifyType' });
          }
        }
      },
    };
  },
};

export default rule;

class StoryObject {
  /**
   * Parse a named export into a component story format (CSF) v3 object if possible. Return
   * undefined if not possible.
   */
  static parse(node: TSESTree.ExportNamedDeclaration): StoryObject | undefined {
    // Declaration: the thing being exported.
    // i.e. `const foo = {}`
    const declaration = node.declaration;

    // Is this declaration a variable (not a function or class) and a const?
    // prettier-ignore
    if (declaration?.type === 'VariableDeclaration' && declaration.kind === 'const') {
      // Declarator: name and value of the variable.
      // i.e. `foo = {}`
      const declarator = declaration.declarations[0];

      // The "initial" expression is the value of the variable.
      // i.e. `{}`
      const expression = declarator.init;

      // If the value is an object literal, assume its a story.
      if (expression?.type === 'ObjectExpression') {
        return new StoryObject(declarator, expression);
      }
    }
  }

  declarator: TSESTree.VariableDeclarator;
  expression: TSESTree.ObjectExpression;

  // prettier-ignore
  private constructor(declarator: TSESTree.VariableDeclarator, expression: TSESTree.ObjectExpression) {
    this.declarator = declarator;
    this.expression = expression;
  }

  get definitelyTakesArgs() {
    return this.hasRenderArgs || this.hasImplicitRender;
  }

  get hasRenderArgs() {
    return (this.renderPropertyValue?.params?.length ?? 0) >= 1;
  }

  get hasImplicitRender() {
    return (
      !this.renderPropertyValue &&
      // If an object is being spread, assume that it's bringing in a render function of its own,
      // and the destination object therefore doesn't have an implicit render function. This isn't
      // necessarily true, but we're bailing out in this case so we don't have to try to figure out
      // what the source object is bringing in.
      !this.hasObjectSpread
    );
  }

  get hasObjectSpread() {
    return this.expression.properties.some((property) => {
      return property.type === 'SpreadElement';
    });
  }

  get renderPropertyValue() {
    for (const property of this.expression.properties) {
      // Is this property named "render"?
      if (
        property.type === 'Property' &&
        property.key.type === 'Identifier' &&
        property.key.name === 'render'
      ) {
        // Is its value some sort of function?
        if (
          property.value.type === 'ArrowFunctionExpression' ||
          property.value.type === 'FunctionExpression'
        ) {
          return property.value;
        }
      }
    }
  }

  get typeAnnotation() {
    return this.declarator.id.typeAnnotation;
  }
}
