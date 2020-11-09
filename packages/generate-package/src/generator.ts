import Generator from 'yeoman-generator';
import kebabCase from 'lodash/kebabCase';
import path from 'path';

type Answers = {
  isPublic: boolean;
  packageName: string;
};

export default class extends Generator {
  answers: Answers = { packageName: 'default-package-name', isPublic: false };

  async prompting() {
    this.answers = await this.prompt([
      { type: 'input', name: 'packageName' },
      {
        type: 'confirm',
        default: false,
        message:
          'Should this package be public and published to npm? (default: false)',
        name: 'isPublic',
      },
    ]);
  }

  writing() {
    const isPublic = this.answers.isPublic;
    const packageName = kebabCase(this.answers.packageName);
    const templateVariables = { packageName, isPublic };

    // Set the destination root to the frontend-libs/packages directory. This generator runs with a
    // working directory of frontend-libs/packages/generate-package, so we need to set it to one
    // levels up.
    this.destinationRoot(path.join('..'));

    // package.json
    this.fs.copyTpl(
      this.templatePath(
        isPublic ? 'package.json.public.ejs' : 'package.json.private.ejs',
      ),
      path.join(packageName, 'package.json'),
      templateVariables,
    );

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      path.join(packageName, 'README.md'),
      templateVariables,
    );

    // tsconfig.json
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      path.join(packageName, 'README.md'),
      templateVariables,
    );

    // src/index.ts
    this.fs.copyTpl(
      this.templatePath('src', 'index.ts.ejs'),
      path.join(packageName, 'src', 'index.ts'),
      templateVariables,
    );
  }
}
