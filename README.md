# node-boilerplate

[![Build Status](https://travis-ci.org/5orenso/node-boilerplate.svg)](https://travis-ci.org/5orenso/node-boilerplate)
[![Coverage Status](https://coveralls.io/repos/5orenso/node-boilerplate/badge.svg)](https://coveralls.io/r/5orenso/node-boilerplate)

A small boilerplate to help you kickstart your projects with unit tests, integration tests, code coverage, continous integration, code hinting and code style enforcement.

Helper modules in use:

__JSHint__
A tool that helps to detect errors and potential problems in your JavaScript code.

__Grunt__
The Javascript task runner. In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes.

__Buster.js__
A browser JavaScript testing toolkit. It does browser testing with browser automation (think JsTestDriver), QUnit style static HTML page testing, testing in headless browsers (PhantomJS, jsdom), and more.

__JSCS__
JSCS is a code style linter for programmatically enforcing your style guide.

__Istanbul__
A Javascript code coverage tool written in JS.

__Travis__
Travis CI is a hosted continuous integration service. It is integrated with GitHub and offers first class support for many languages.

__Coveralls.io__
Coveralls is a web service to help you track your code coverage over time, and ensure that all your new code is fully covered.


### HOWTO upgrade dev environment
```bash
npm install buster --save-dev
npm install buster-istanbul --save-dev
npm install grunt --save-dev
npm install grunt-buster --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-nodeunit --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-coveralls --save-dev
npm install grunt-jscs --save-dev
npm install grunt-nodemon --save-dev
npm install grunt-shell --save-dev
```
