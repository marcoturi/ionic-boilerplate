# IONIC 2 Boilerplate
A ionic 2 boilerplate for starting new projects. This boilerplate will follow the best practice for angular and ionic development.

## FEATURES
- Ionic rc0
- Unit testing with karma
- SCSS Lint (Refs: https://github.com/HugoGiraudel/sass-boilerplate)
- TSlint 
- NVM (Refs: https://github.com/creationix/nvm)
- Commitizen (see GIT)
- betterScripts for npm
- ENV variables from package.json injected 

## PREINSTALL COMMANDS
```
npm i -g cordova ionic
gem install scss_lint
```

## All Available NPM scripts commands

| Task              | Description                                            |
|-------------------|--------------------------------------------------------|
| `dev`             | run ionic serve                                        |
| `build`           | Full production build. Use `--dev` flag for dev build. |
| `build`           | build for production                                   |
| `release`         | generate changelog based on commits                    |
| `push`            | shortcut for git push origin master --follow-tags      |
| `lint`            | lint with tslint                                       |
| `scss-lint`       | lint scss                                              |
| `docs`            | not working yet, see below                             |
| `outdated`        | search npm packages for autdated dependences           |
| `ios:dev`         | build .ipa using dev envirorment vars                  |
| `ios:release`     | build .ipa with production envirorment vars            |
| `android:dev`     | build .apk using dev envirorment vars                  |
| `android:release` | build .apk with production envirorment vars            |

## WEBSTORM TIPS
- Set code style for typesript:
    - {import} -> { import }
    - import * from "lodash" -> import * from 'lodash'
- Set typescript settings to be used with the version inside node_modules instead of the boundled one (1.8)
- Don't activate typescript compiler. https://github.com/driftyco/ionic/issues/8303
- Enable tslint in settings
- Download scss lint plugin and enable it

## GIT
- Before commit tslint and scss lint run
- Git flow: optional
Workflow:
- git add .
- npm run commit
- npm run push

## TYPEDOC
- not working yet as typedoc doesn't support typescript 2.0
http://typedoc.org/guides/doccomments/

## TYPINGS
http://microsoft.github.io/TypeSearch/
