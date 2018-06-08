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
        message: '',
        choices: ['Express', 'Feather', 'Hapi', 'Koa'],
        when: response => {
          return response.architecture === 'Api' || response.architecture === 'MVC';
        }
      },
      // -------------------------
      {
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
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
