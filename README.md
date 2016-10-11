# IONIC 2 Boilerplate
 [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![Dependency Status](https://david-dm.org/marcoturi/ionic2-boilerplate.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate) [![devDependencies Status](https://david-dm.org/marcoturi/ionic2-boilerplate/dev-status.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate?type=dev) [![build status](https://gitlab.com/marco_turi/ionic2-boilerplate/badges/master/build.svg)[![coverage report](https://gitlab.com/marco_turi/ionic2-boilerplate/badges/master/coverage.svg)](https://gitlab.com/marco_turi/ionic2-boilerplate/commits/master)
<br>A ionic 2 boilerplate for starting new projects. This boilerplate will follow the best practices for angular and ionic development.

## FEATURES
- Ionic rc0
- Continuous Integration with Gitlab + Automatic apk (**why**: i chose Gitlab instead of travis because it's free for private projects)
- Dockerfile (https://github.com/marcoturi/ionic-docker)
- Unit testing with karma
- e2e tests with protractor + screenshot reporter
- Coverege with istanbul
- SCSS Lint (ref: https://github.com/HugoGiraudel/sass-boilerplate)
- TSlint with Codelyzer (ref: https://github.com/mgechev/codelyzer)
- NVM (ref: https://github.com/creationix/nvm)
- GIT workflow with Commitizen + automatic changelog (see GIT section below) (ref: https://github.com/commitizen/cz-cli)
- BetterScripts for npm (ref: https://github.com/benoror/better-npm-run)
- ENV variables from package.json injected
- Es-Lodash

## TODO
- Automatic ipa after CI through ionic upload
- Documentation with typedoc (waiting a new release that supports ts 2.0 (https://github.com/TypeStrong/typedoc/issues/234)

## OPTIONAL LIBRARIES
- Error logging: Sentry (https://docs.sentry.io/clients/javascript/integrations/angular2/)
- Database: PouchDB (https://pouchdb.com/). Don't use localstorage as it can be deleted.
- Time and Dates: MomentJs (http://momentjs.com/)
- NGRX pattern/library if you plan to make a big app. (https://github.com/ngrx/store)

## PREINSTALL COMMANDS
```
npm i -g cordova ionic
gem install scss_lint
ionic state restore
./node_modules/.bin/webdriver-manager update
```
Note: you should have python 2 (if you have the 3.0 you should update e2e script) and ruby 2 installed.

## All Available NPM scripts commands

| Task              | Description                                            |
|-------------------|--------------------------------------------------------|
| `dev`             | run ionic serve                                        |
| `build`           | Full production build. Use `--dev` flag for dev build. |
| `release`         | generate changelog based on commits                    |
| `push`            | shortcut for git push origin master --follow-tags      |
| `lint`            | lint with tslint                                       |
| `scss-lint`       | lint scss                                              |
| `test`            | runs Karma test                                        |
| `test:watch`      | runs Karma test watching for edits (usefull for TDD)   |
| `e2e`             | runs e2e protractor tests                              |
| `e2e:interactive` | runs e2e protractor tests in interactive mode          |
| `docs`            | not working yet                                        |
| `outdated`        | search npm packages for outdated dependencies          |
| `ios:dev`         | build .ipa using dev environment vars                  |
| `ios:release`     | build .ipa with production environment vars            |
| `android:dev`     | build .apk using dev environment vars                  |
| `android:release` | build .apk with production environment vars            |

## GIT WORKLOW
- Optionally you can use Git flow (ref: http://danielkummer.github.io/git-flow-cheatsheet/)
- If you want to bump the changelog, run "npm run release"
- You should consider to write a shortcut in .bashrc for the following commands<br>
- This repo has a mirror in gitlab for CI (https://gitlab.com/marco_turi/ionic2-boilerplate) after every push on master you will get automatically an .apk generated from CI.
**Workflow:**<br>
```
git add .
npm run commit // this will run tslint + scss lint + commit
npm run push // this will run unit tests + push
```

## TYPINGS
http://microsoft.github.io/TypeSearch/

## E2E
- I'm using a python server to run the e2e tests for 2 reasons. First, sometimes you have 2 or more projects running together and this mean that port 8100 is not available. Secondly sometimes, even working on a single project you have to kill the process manually because the original process didn't exit correctly and port is still unavailable.

## WEBSTORM TIPS
- Set code style for typesript:
    - {import} -> { import }
    - import * from "lodash" -> import * from 'lodash'
- Set typescript settings to be used with the version inside node_modules instead of the bundled one (1.8)
- Don't activate typescript compiler. https://github.com/driftyco/ionic/issues/8303
- Enable tslint in settings
- Download scss lint plugin and enable it

## WINDOWS TIPS
- You should avoid Windows. I tried a lot of times and at the end found myself switching to a Mac VM or Hackintosh or Linux distro. The following tips are not resolutive but can help you set up a nice environment.
- Instead of windows terminal I used cmder. https://github.com/cmderdev/cmder
- If you use Webstorm. Set terminal settings as follow -> "cmd.exe" /k ""%CMDER_ROOT%\vendor\init.bat""
- Remember to re-start webstorm every time you make a change to the terminal.
- npm install --global --production windows-build-tools //node-gyp fix
- Set webstorm to write with line endingds LF (mac os or unix)
- To avoid git warnings: git config core.autocrlf false
- e2e commands is not working on windows, because the python server can't be launched. As a workaround add START /B before python -m and remove & at the end of the line in package.json. Anyway you will have to kill manually the process every time after every execution.
