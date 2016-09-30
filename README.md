# IONIC 2 Boilerplate
 [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![Dependency Status](https://david-dm.org/marcoturi/ionic2-boilerplate.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate) [![devDependencies Status](https://david-dm.org/marcoturi/ionic2-boilerplate/dev-status.svg)](https://david-dm.org/marcoturi/ionic2-boilerplate?type=dev)
<br>A ionic 2 boilerplate for starting new projects. This boilerplate will follow the best practices for angular and ionic development.

## FEATURES
- Ionic rc0
- Unit testing with karma
- e2e tests with protractor + screenshot reporter
- SCSS Lint (ref: https://github.com/HugoGiraudel/sass-boilerplate)
- TSlint 
- NVM (ref: https://github.com/creationix/nvm)
- GIT workflow with Commitizen (see GIT section below)
- BetterScripts for npm
- ENV variables from package.json injected
- Es-Lodash

## TODO
- Continuous Integration files with travis and gitlab + Dockerfile
- Automatic ipa/apk after CI through ionic upload
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
```

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
| `e2e`             | runs e2e protractor tests                              |
| `docs`            | not working yet                                        |
| `outdated`        | search npm packages for outdated dependencies          |
| `ios:dev`         | build .ipa using dev environment vars                  |
| `ios:release`     | build .ipa with production environment vars            |
| `android:dev`     | build .apk using dev environment vars                  |
| `android:release` | build .apk with production environment vars            |

## WEBSTORM TIPS
- Set code style for typesript:
    - {import} -> { import }
    - import * from "lodash" -> import * from 'lodash'
- Set typescript settings to be used with the version inside node_modules instead of the bundled one (1.8)
- Don't activate typescript compiler. https://github.com/driftyco/ionic/issues/8303
- Enable tslint in settings
- Download scss lint plugin and enable it

## GIT WORKLOW
- Optionally you can use Git flow (ref: http://danielkummer.github.io/git-flow-cheatsheet/)
- If you want to bump the changelog, run "npm run release"
- You should consider to write a shortcut in .bashrc for the following commands<br>
**Workflow:**<br>
```
git add .
npm run commit // this will run tslint + scss lint + commit
npm run push // this will run unit tests + push
```

## TYPINGS
http://microsoft.github.io/TypeSearch/
