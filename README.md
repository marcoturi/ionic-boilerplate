# IONIC Boilerplate
 [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![Dependency Status](https://david-dm.org/marcoturi/ionic2-boilerplate.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate) [![devDependencies Status](https://david-dm.org/marcoturi/ionic2-boilerplate/dev-status.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate?type=dev) ![build status](https://gitlab.com/marco_turi/ionic2-boilerplate/badges/master/build.svg) [![coverage report](https://gitlab.com/marco_turi/ionic2-boilerplate/badges/master/coverage.svg)](https://gitlab.com/marco_turi/ionic2-boilerplate/commits/master) [![Join the chat at https://gitter.im/marcoturi/ionic2-boilerplate](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/marcoturi/ionic2-boilerplate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<br>A ionic boilerplate for starting new projects. This boilerplate will follow the best practices for angular and ionic development.

NOTE: I moved Unit tests from running through Rollup to Webpack with release 0.10.0. If you are looking to the old configuration see the [rollup](https://github.com/marcoturi/ionic2-boilerplate/tree/rollup) branch.
## Table of Contents
- [Features](#features)
- [Roadmap](#roadmap)
- [Installation & Configuration](#installation)
    - [Quick Start](#quick-start)
    - [NPM scripts commands](#npm-scripts)
    - [Gitlab CI Configuration](#gitlab-ci)
- [Tips](#tips)
    - [Optional Libraries](#optional-libraries)
    - [Git Workflow](#git-workflow)
    - [Useful Links](#links)
    - [Ionic & Cordova](#ionic-cordova)
    - [Webstorm](#webstorm)
    - [Windows](#windows)
- [License](#license)

## <a name="features"></a>Features
- Ionic 3
- [Es-Lodash](#optional-libraries) instead of Lodash to reduce final bundle size.
- [NVM](https://github.com/creationix/nvm) to manage multiple active node.js versions
- [Yarn](https://github.com/yarnpkg/yarn) for fast, reliable, and secure dependency management.
- [BetterScripts](https://github.com/benoror/better-npm-run) for better NPM scripts.
- ENV variables from package.json injected automatically.
- Documentation with [Typedoc](https://github.com/TypeStrong/typedoc/).
- Continuous Integration with Gitlab CI [see here for info](#gitlab-ci).
    - Automatic apk only when pushing to release branch.
    - Automatic ipa through ionic package only when pushing to release branch.
    - A [Docker image](https://github.com/marcoturi/ionic-docker).
- Tests
    - Unit tests with Karma.
    - E2E tests with Protractor.
    - Screenshot reporter for Protractor.
    - Code coverage with Istanbul.
    - Gitlab badge [see here for info](#gitlab-ci)
    - Headless Chrome support for testing
- Linting
    - [SCSS Lint](https://github.com/HugoGiraudel/sass-boilerplate) following Sass Guidelines.
    - TSlint with [Codelyzer](https://github.com/mgechev/codelyzer).
- GIT 
    - Workflow with [Commitizen](https://github.com/commitizen/cz-cli).
    - Automatic changelog.
    - Automatic alignment of app version in config.xml from package.json through cordova hook.

## <a name="roadmap"></a>Roadmap
- Automatic download .ipa in gitlab artificts.

## <a name="installation"></a>Installation & Configuration
### <a name="quick-start"></a>Quick Start
```bash
# Required dependecies (on Mac Os also install ios-sim and ios-deploy)
npm i -g cordova ionic yarn
gem install scss_lint

# Clone the repo --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/marcoturi/ionic2-boilerplate.git

# Change directory
cd ionic2-boilerplate

# Install project dependencies
yarn
npm run post-install

# Launch ionic serve
npm run dev
```
**TO RUN IONIC: Make sure you have Node version >= 6.X and NPM >= 3** <br>
**TO RUN SCSS-LINT: Make sure you have Ruby >= 2** <br>

### <a name="npm-scripts"></a>NPM scripts commands
| Task              | Description                                            |
|-------------------|--------------------------------------------------------|
| `dev`             | Run ionic serve                                        |
| `build`           | Full production build. Use `--dev` flag for dev build. |
| `release`         | Generate changelog based on commits                    |
| `push`            | Shortcut for git push origin master --follow-tags      |
| `lint`            | Lint with tslint                                       |
| `scss-lint`       | Lint scss                                              |
| `test`            | Runs Karma test                                        |
| `test:watch`      | Runs Karma test watching for edits (TDD style)         |
| `e2e`             | Runs e2e protractor tests                              |
| `e2e:interactive` | Runs e2e protractor tests in interactive mode          |
| `docs`            | Generate code documentation through Typedoc            |
| `outdated`        | Search npm packages for outdated dependencies          |
| `post-install`    | Update web-driver to be able to run e2e tests.         |
| `ios:dev`         | Build .ipa using dev environment vars                  |
| `ios:release`     | Build .ipa with production environment vars            |
| `android:dev`     | Build .apk using dev environment vars                  |
| `android:release` | Build .apk with production environment vars            |

### <a name="gitlab-ci"></a>Gitlab CI Configuration
- To get code coverage percentage badge use the following regexp: `Lines\s*:\s*(\d*\.?\d+)%` in Gitlab CI/CD pipelines.
- To get the automatic .ipa from ionic package first setup a ionic.io profile with certificates for ios. Secondly add the following Secret variables in Gitlab. N.B. Be sure to don't show Build results (edit project settings) for your repo otherwise those vars could be exposed.

| Key                            | Description                                                                                                      |
|--------------------------------|------------------------------------------------------------------------------------------------------------------|
| `IONIC_EMAIL`                  | Your ionic.io email                                                                                              |
| `IONIC_PASSWORD`               | Your ionic.io password                                                                                           |
| `IONIC_PACKAGE_BUILD_RELEASE`  | (Optional) Indicate whether this is a release build. Possible values are `true` or `false`. Defaults to `false`. |
| `IONIC_PACKAGE_BUILD_PROFILE`  | Security profile to use for the build, as defined in Ionic.io console.                                           |

## <a name="tips"></a>Tips
### <a name="optional-libraries"></a>Optional Libraries
If you want everything to just work nicely with rollup, use es2015 libraries like lodash-es instead of lodash. In the case of lodash-es try to do: `import map from 'lodash-es/map'` rather than `import { map } from 'lodash-es'`. See [here](https://github.com/rollup/rollup/wiki/Troubleshooting) for further info. To find examples on how to import 3rd party libs with ionic and rollup see [here](https://github.com/danbucholtz/ionic-third-party-lib-mega-test) and [here](http://ionicframework.com/docs/v2/resources/third-party-libs/)
- Error logging: [Sentry](https://docs.sentry.io/clients/javascript/integrations/angular2/)
- Database: [PouchDB](https://pouchdb.com/) or [Ionic-storage](https://github.com/driftyco/ionic-storage). Don't use localstorage as it can be deleted by OS to free memory.
- Time and Dates: [MomentJs](http://momentjs.com/)
- [NGRX](https://github.com/ngrx/store) pattern/library if you plan to make a big app.

### <a name="git-workflow"></a>Git Workflow
- Optionally you can use [Git flow](http://danielkummer.github.io/git-flow-cheatsheet/)
- If you want to bump the changelog, run "npm run release"
- This repo has a [mirror repo in gitlab for CI](https://gitlab.com/marco_turi/ionic2-boilerplate) after every push on master you will get automatically all tests and lints run. To get .ipa and .apk build you need to push to the release git branch. The reason is to avoid unnecessary builds (free limit is 100/month) for ios.  
- You should consider to write a shortcut in .bashrc for the following commands<br>
**Workflow:**<br>
```
git add .
npm run commit // this will run tslint + scss lint + commit
npm run push // this will run unit tests + push to master
// now check on GITLAB if there are no errors, than if you want push your commits to the release branch to get automatic ipa and apk
```

### <a name="links"></a>Useful Links
- [Search engine for find typescript typings](http://microsoft.github.io/TypeSearch/)
- [Cordova-xcode 8](https://dpogue.ca/articles/cordova-xcode8.html)
- [Ionic package setup](https://docs.ionic.io/services/package/)
- [Useful Hooks](https://github.com/driftyco/ionic-package-hooks)

### <a name="ionic-cordova"></a>Ionic & Cordova
- Avoid the use of ionic state commands and also ionic plugin/platform. Use directly cordova prepare (or cordova plugin/platform). Also save your plugin/platform only inside config.xml, not package.json to avoid confusion. See [this](https://github.com/driftyco/ionic-cli/issues/1324) for further informations. 

### <a name="webstorm"></a>Webstorm
- Set code style for typescript:
    - {import} -> { import }
    - import * from "lodash" -> import * from 'lodash'
- Set typescript settings to be used with the version inside node_modules instead of the bundled one
- [Don't activate typescript compiler.](https://github.com/driftyco/ionic/issues/8303)
- Enable tslint in settings
- Download scss lint plugin and enable it

### <a name="windows"></a>Windows
- You should avoid Windows. I tried a lot of times and at the end found myself switching to a Mac VM or Hackintosh or Linux distro. The following tips are not resolutive but can help you set up a nice environment.
- Instead of windows terminal I used [cmder](https://github.com/cmderdev/cmder).
- If you use Webstorm. Set terminal settings as follow -> "cmd.exe" /k ""%CMDER_ROOT%\vendor\init.bat""
- Remember to re-start webstorm every time you make a change to the terminal.
- npm install --global --production windows-build-tools //node-gyp fix
- Set webstorm to write with line endingds LF (mac os or unix)
- To avoid git warnings: git config core.autocrlf false

## <a name="license"></a>License
    Copyright (c) 2016 Marco Turi
    Source code is open source and released under the MIT license.
