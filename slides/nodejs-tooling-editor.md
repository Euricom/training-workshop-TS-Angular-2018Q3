---
title: NodeJS, Tooling and Editor
transition: 'fade'
---

# NodeJS, Tooling and Editor

<img src="./images/tooling.jpg" width="400px" /><br>
<small>
by Peter Cosemans<br>
Copyright (c) 2017-2018 Euricom nv.
</small>

<!-- markdownlint-disable -->

<style type="text/css">
.reveal h1 {
    font-size: 3.0em;
}
.reveal h2 {
    font-size: 2.00em;
}
.reveal h3 {
    font-size: 1.00em;
}
.reveal p {
    font-size: 70%;
}
.reveal blockquote {
    font-size: 80%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 90%;
}
</style>

---

# It's not your grandmother JavaScript anymore

> Tooling will help us

----

## Tooling

- ***NodeJS*** - Cross-platform JavaScript runtime environment.
- ***Npm*** - JavaScript module package manager
- ***Babel*** - ES6+ to JavaScript transpiler
- ***TSC*** - TypeScript to JavaScript transpiler
- ***Prettier*** - An opinionated code formatter
- ***Linting*** - Analyse your code for potential errors
- ***WebPack*** - Task runner and module bundler.

---

# NodeJS

> Your Javascript engine for the desktop

----

## NodeJS - Active LTS or Current

To Install
[https://nodejs.org/en/](https://nodejs.org/en/)

<img src="./images/node-schedule.png" width="600px" /><br>

[https://github.com/nodejs/Release#release-schedule](https://github.com/nodejs/Release#release-schedule)

----

## Multiple node versions

MacOS

    // install
    $ npm install n -g

    // use
    $ n latest
    $ n

Windows / MacOS

[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

    // use
    $ nvm list available
    $ nvm install 4.4.5
    $ nvm use 4.4.5

----

## NodeJS != Browser

Node doesn't have:

```
    + window object
    + location object
    + document object
```

Node is/has:

```
    + global object (== window object)
    + headless (no DOM)
    + process object (to get info about the process)
    + __dirname & __filename object

    + module object (to export a module)
    + everything is a module (every file)
    + required function (to load other modules)
```

In common with browser:

```
   + console object
   + setInterval & setTimeout function
```

----

## Node Package Manager (NPM)

The JavaScript way of packaging and deploying code (modules)

```bash
# versions
$ node --version      # node version
$ npm --version       # npm version

# to create a package.json (definition of all packages in this project)
$ npm init

# to install a module
$ npm install jquery

# to install all modules defined in the package.json
$ npm install

# to remove a module
$ npm uninstall jquery --save
```

----

## Npm Commands

Other usefull commands

```bash
npm init
npm install eslint --save-dev   # install as desdependency
npm list --depth=0              # list local install packages
npm list --depth=0 -g           # list global install packages
npm cache clean                 # clear cache
npm config list                 # show configs
npm install -g npm@latest       # upgrade npm to latest version
```

----

## Npm Config

```bash
$ npm config list       # show config
$ npm config list -l    # show full config
$ npm config get cache  # show single config item
$ npm config set cache
```

Location of npm config file

```bash
# local config
$ npm config get userconfig

# global config (by default not available)
$ npm config get globalconfig
```

----

## Npm Registry

All modules are installed from npm registry

```bash
$ npm config get registry
$ npm config set registry <registry url>
```

But you install specify a different source

```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<pkg>
npm install [<@scope>/]<pkg>@<tag>
npm install [<@scope>/]<pkg>@<version>
npm install [<@scope>/]<pkg>@<version range>
npm install <folder>
npm install <tarball file>
npm install <tarball url>
npm install <git:// url>
npm install <github username>/<github project>
```

----

## Npm scripts

You can run small CLI script via npm/yarn

```json
{
    "name": "temp",
    "version": "1.0.0",
    "scripts": {
        "start": "node main.js"
    },
    ...
}
```

To run

```bash
$ yarn start            # or 'npm run start'
yarn serve v0.18.1
$ node main.js
✨  Done in 0.12s.
```

----

## Npx

Executor for local and ad-hoc npm binaries

```bash
# add a local package
yarn add cowsay

# run local package
npx cowsay May the force be with you

# run remote package (this will install, run and uninstall)
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

> Now you don't have to install tools globally or create a script line.

----

## Yarn

Yarn (fast, reliable and secure) alternative to npm

```bash
# install (npm install jquery)
$ yarn add jquery

# install all modules from package.json (npm install)
$ yarn

# uninstall jquery (npm uninstall)
$ yarn remove jquery

# others
$ yarn info jquery              # show information about package
$ yarn add jquery@2.2.4         # install jquery v2.2.4
$ yarn outdated                 # show which packages are outdated
$ yarn upgrade-interactive      # interactive upgrade all modules
```

---

# Babel

> Use the latest and greatest of ESNext

----

## Setup

[Using Babel (official website)](https://babeljs.io/docs/setup/)

Install

```bash
# install as npm module (v7.x)
yarn add @babel/cli @babel/core --dev
yarn add @babel/preset-env --dev
```

Configure: .babelrc

```json
{
  "presets": ["@babel/preset-env"]
}
```

[@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) defines which ES6 feature to use during the build.

----

## Setup - Node

You can specifies the target you building for:

.babelrc

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

Babel will transpile to ES that runs on node 6.1

----

## Setup - Browser

.babelrc

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "ie 10"]
      }
    }]
  ]
}
```

or package.json

```json
{
    ...
    "browserslist": "last 2 versions, ie 10"
}
```

Babel will transpile to ES that runs on the last two version of all the browsers and IE 10.

The browserlist config can be re-used by other tools (Autoprefixer)

----

## Setup - Supporting pre-releases

[ECMAScript proposals](https://github.com/tc39/proposals)

Install stage preset

```bash
yarn add @babel/preset-stage-2 --dev
```

Configure: .babelrc

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-stage-2", { "decoratorsLegacy": true }]
  ]
}
```

----

## Build

To build

```bash
npx babel main.js -d ./dist
```

Typical you setup a script (package.json)

```
{
    ...
    "scripts": {
        "build": "babel src -d dist --source-maps --ignore *.spec.js"
    }
}
```

To run it

```bash
yarn build     # or 'npm run build'
```

----

## Run with @babel/node

[@babel/node](https://github.com/babel/babel/tree/master/packages/babel-node) is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.

```bash
# install
yarn add @babel/node --dev

# compile and start app
npx babel-node app.js

# nodemon
nodemon --exec babel-node app.js
```

Or use script

```
{
    ...
    "scripts": {
        "start": "nodemon --exec babel-node app.js"
    }
}
```

> Don't use babel-node in production

----

## WebPack

For the browser we need to compile and bundle the javascript. We use WebPack in co-operation with babel.

install

```bash
yarn add webpack webpack-cli babel-loader@8.0.0-beta.3 --dev
```

webpack.config.js

```js
module.exports = {
  entry: './main.js',
  mode: 'development',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

Build and bundle

```bash
npx webpack
```

---

# TypeScript - TSC

> Your TypeScript compiler

----

## Setup

Install

```bash
$ yarn add typescript --dev
```

Configure

```bash
# Create the tsconfig.json
$ tsc --init
```

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "strict": false,                /* don't be strict */
    "noImplicitAny": false,         /* don't require typing */
    "lib": ["es2017", "dom"],       /* add libraries */
    "outDir": "./dist",             /* build output in dist */
  },
  "exclude": ["node_modules"]
}
```

[Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

----

## Build

To Build

```bash
npx tsc main.ts
```

Typically you provide a script (package.json)

```json
{
    ...
    "scripts": {
        "build": "tsc --outDir ./dist"
    }
}
```

----

## Run with ts-node

[ts-node](https://github.com/TypeStrong/ts-node) is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling the TypeScript before running it.

```bash
# install
yarn add ts-node --dev

# compile and start app
npx ts-node main.ts

# nodemon
nodemon --exec ./node_modules/.bin/ts-node ./main.ts
```

Or use script

```
{
    ...
    "scripts": {
        "start": "nodemon --exec ./node_modules/.bin/ts-node ./main.ts"
    }
}
```

> Don't use ts-node in production

----

## WebPack

For the browser we need to compile and bundle the javascript. We use WebPack in co-operation with typescript.

install

```bash
$ yarn add webpack webpack-cli ts-loader --dev
```

webpack.config.js

```js
module.exports = {
  entry: './main.ts',
  mode: 'development',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

Build and bundle

```bash
npx webpack
```

---

# Styling

> Nice code is half the work

----

## Prettier

Use [https://prettier.io/](Prettier) to format your code.

```js
// Input
foo(reallyLongArg(),omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne()
);
```

```js
// Ouput
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

----

## VSCode - Plugin

Install VSCode plugin<br>

<img src="./images/prettier-vscode.png" width="300px" /><br>

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

----

## Setup


Config file: ```.prettierrc```

```
{
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "useTabs": false,
  "semi": true
}

```

Ignore file: ```.prettierignore```

```
.vscode
node_modules/**/*
dist/**/*
```


---

# Linting

> Don't start without it.

----

## Use a linter

Static code analyses to improve your code.

<img src="./images/linting.png" width="800px" /><br>

Available to JavaScript (ESLint), TypeScript (TSLint) and CSS (StyleLint)

----

## IDE/Editor Support

Any good JS editor support's linting

* Visual Studio Code
* WebStorm
* Atom

<img src="./images/linting-vscode.png" width="800px" /><br>

----

# ESLint

> The pluggable linting utility for JavaScript and JSX

----

## ESLint - Setup

```bash
# install
yarn add eslint                      # linter engine
yarn add eslint-config-airbnb-base   # linter configuration (airbnb)
yarn add eslint-plugin-import        # additional rules
```

.eslintrc

```json
{
  "extends": ["airbnb-base"],
  "globals": {},
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "strict": [0],        // use strict is required for commonjs
    "no-console": [0, ""] // allow console.log
  }
}

```

Add npm script

```json
scripts: {
    "lint": "eslint \"**/*.js\""
}
```

<small>This setup follow the airbnb styleguide: https://github.com/zalmoxisus/javascript</small>

----

## ESlint - VSCode

<img src="./images/eslint-vscode.png" width="300px">

[ESLint Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

----

## ESLint - Disable styling rules

When using Prettier you can disable all formatting rules

```bash
# install additional eslint config
$ yarn add eslint-config-prettier --dev
```

.eslintrc

```json
{
  "extends": [
      "airbnb-base",
      "prettier"
  ],
  ...
}
```

No more linting errors for formatting.

----

# TSLint

[TSLint](https://palantir.github.io/tslint/) is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.

----

## TSLint Setup

```bash
$ yarn add tslint --dev
$ yarn add tslint-config-airbnb --dev
```

Config: tslint.json

```json
{
  "extends": "tslint-config-airbnb",
  "rules": {
    "no-console": [false, "log", "error"]
  }
}
```

Add npm script

```json
"scripts": {
    ...
    "lint": "tslint --project tsconfig.json"
}
```

----

## TSlint - VSCode

<img src="./images/tslint-vscode.png" width="300px">

[TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

----

## TSLint - Disable styling rules

Use tslint with prettier without any formatting conflict

```bash
# install additional eslint config
$ yarn add tslint-config-prettier --dev
```

.eslintrc

```json
{
  "extends": [
      "tslint-config-airbnb",
      "tslint-config-prettier"
  ],
  ...
}
```

No more linting errors for formatting.

---

## Templates

Pre-defined projects for easy startup.

Where to find?

```
<root>/topics/javascript/template/js-node
<root>/topics/javascript/template/js-webpack
<root>/topics/javascript/template/ts-node
<root>/topics/javascript/template/ts-webpack
```

Template ready to:

* Run any TS/ES6+ code in nodeJS or browser
* Prettier setup
* Linting with AirBnb config
* Editorconfig for consistent tabs/spacing
* VSCode config

---

# Now y'are ready to write some JavaScript
