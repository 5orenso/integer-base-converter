/*
 * https://github.com/5orenso
 *
 * Copyright (c) 2015 Øistein Sørensen
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path'),
    appPath = path.normalize(__dirname + '/../');

var App = require(appPath + 'lib/integer-base-converter.js');
var app = new App();

module.exports = app;
