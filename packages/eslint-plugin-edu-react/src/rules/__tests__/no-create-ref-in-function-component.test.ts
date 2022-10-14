import {RuleTester} from 'eslint';
import rule from '../no-create-ref-in-function-component';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

ruleTester.run('no-create-ref-in-function-component', rule, {
  valid: [
    {
      // useRef in function component
      code: `
        function Foo() {
          const ref = useRef();
          return null;
        }
      `,
    },
    {
      // React.useRef in function component
      code: `
        function Foo() {
          const ref = React.useRef();
          return null;
        }
      `,
    },
    {
      // createRef in class component
      code: `
        class Foo extends React.Component {
          constructor() {
            this.ref = createRef();
          }

          render() {
            return null;
          }
        }
      `,
    },
    {
      // React.createRef in class component
      code: `
        class Foo extends React.Component {
          constructor() {
            this.ref = createRef();
          }

          render() {
            return null;
          }
        }
      `,
    },
  ],
  invalid: [
    {
      // createRef in a function component
      code: `
        function Foo() {
          const ref = createRef();
          return null;
        }
      `,
      errors: [{type: 'CallExpression'}],
    },
    {
      // React.createRef in a function component
      code: `
        function Foo() {
          const ref = React.createRef();
          return null;
        }
      `,
      errors: [{type: 'CallExpression'}],
    },
  ],
});
