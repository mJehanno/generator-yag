'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the top-notch ${chalk.red('generator-yag')} generator!`));

    const prompts = [
      // ********************************** Configuration
      {
        type: 'input',
        name: 'appName',
        message: 'Give a name to your app',
        default: process.argv[2]
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you use ?',
        default: 'Npm',
        choices: ['Npm', 'Yarn']
      },
      {
        type: 'list',
        name: 'logger',
        message: 'Since console.log() is deprecated we recommend you to use a logger : ',
        choices: ['Morgan', 'Winston'],
        default: 'Winston'
      },
      {
        type: 'confirm',
        name: 'env',
        message: 'Do you want to use environment variables ?',
        default: true
      },
      // ********************************** Architecture
      {
        type: 'list',
        name: 'architecture',
        message: 'Which type of apps do you want to create ?',
        choices: ['Api', 'MVC', 'Microservices'],
        default: 'Api'
      },
      // -------------------------
      {
        type: 'list',
        name: 'router',
        message: 'Which router will you use ?',
        choices: ['Express', 'Feather', 'Hapi', 'Koa'],
        when: response => {
          return response.architecture === 'Api' || response.architecture === 'MVC';
        }
      },
      // -------------------------
      {
        type: 'list',
        name: 'templateEngine',
        message: 'Which template engine do you want ?',
        choices: [
          'Dust',
          'Ejs',
          'Haml',
          'Handlebar',
          'Mustache',
          'Nunjucks',
          'Pug',
          'Swig',
          'None of the above'
        ],
        when: response => {
          return response.architecture === 'MVC';
        }
      },
      {
        type: 'confirm',
        message: 'Do you need to handle file upload ?',
        name: 'fileUpload',
        default: false,
        when: response => {
          return response.architecture === 'MVC';
        }
      },
      // -------------------------
      {
        when: response => {
          return response.architecture === 'Microservices';
        }
      }

      // ********************************** Tests

      // ********************************** Databases
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      const devDependencies = [];
      const projectDependencies = [];

      this.install(devDependencies, true, this.props.packageManager);
      this.install(projectDependencies, false, this.props.packageManager);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install(dependencies, dev, packageManager) {
    if (dev) {
      switch (packageManager) {
        case 'Npm':
        default:
          this.npmInstall(dependencies, { 'save-dev': true });
          break;
        case 'Yarn':
          this.yarnInstall(dependencies, { 'save-dev': true });
      }
    } else {
      switch (packageManager) {
        case 'Npm':
        default:
          this.npmInstall(dependencies);
          break;
        case 'Yarn':
          this.yarnInstall(dependencies);
      }
    }
  }
};
