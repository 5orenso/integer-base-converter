/*
 * https://github.com/5orenso
 *
 * Copyright (c) 2015 Øistein Sørensen
 * Licensed under the MIT license.
 */
'use strict';

var buster = require('buster'),
    _ = require('underscore'),
    assert = buster.assert,
    appPath = __dirname + '/../../';

var logger = {
    log: function () {
        var msg = [];
        var meta = null;
        for (var i = 0, l = arguments.length; i < l; i++) {
            if (_.isString(arguments[i]) || _.isNumber(arguments[i])) {
                msg.push(arguments[i]);
            } else if (_.isObject(arguments[i]) && !meta) {
                meta = arguments[i];
            } else if (_.isObject(arguments[i])) {
                msg.push(JSON.stringify(arguments[i]));
            }
        }
        console.log(msg.join(', '));
    }
};

buster.testCase('lib/integer-base-converter', {
    setUp: function () {
    },
    tearDown: function () {
        delete require.cache[require.resolve(appPath + 'lib/integer-base-converter')];
    },
    'integer-base-converter:': {
        'Convert some numbers with the core function': function () {
            var IntBaseConv = require(appPath + 'lib/integer-base-converter');
            var ibc = new IntBaseConv({}, {logger: logger});
            assert.equals(ibc.convert(1000, 10, 60), 'Ge');
            assert.equals(ibc.convert(1001, 10, 60), 'Gf');
            assert.equals(ibc.convert(3.14159, 10, 60), '3.8ThQO');
        },

        'Convert some negative numbers with the core function': function () {
            var IntBaseConv = require(appPath + 'lib/integer-base-converter');
            var ibc = new IntBaseConv({logger: logger}, {});
            assert.equals(ibc.convert(-1000, 10, 60), '-Ge');
            assert.equals(ibc.convert(-1001, 10, 60), '-Gf');
            assert.equals(ibc.convert(-3.14159, 10, 60), '-3.8ThQO');
        },

        'Convert to wrong base': function () {
            var IntBaseConv = require(appPath + 'lib/integer-base-converter');
            var ibc = new IntBaseConv();
            assert.exception(function () {
                assert.equals(ibc.convert(1000, 1, 2), 2);
            },  { name: 'RangeError' });
            assert.exception(function () {
                assert.equals(ibc.convert(1000, 2, 1), 2);
            },  { name: 'RangeError' });

        },

        'Convert to base10': function () {
            var IntBaseConv = require(appPath + 'lib/integer-base-converter');
            var ibc = new IntBaseConv({}, {logger: logger});
            //var result = ibc.convert('Ge', 60, 10);
            //console.log('Negative base60 number:', result, typeof result);
            assert.equals(ibc.convert('Ge', 60, 10), 1000);
            assert.equals(ibc.convert('-Ge', 60, 10), -1000);
        },

        '//Convert decimal to base10': function () {
            var IntBaseConv = require(appPath + 'lib/integer-base-converter');
            var ibc = new IntBaseConv({}, {logger: logger});
            //var result = ibc.convert('Ge', 60, 10);
            //console.log('Negative base60 number:', result, typeof result);
            assert.equals(ibc.convert('3.8ThQO', 60, 10), 3.14159);
        }
    }
});
