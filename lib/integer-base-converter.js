/*
 * https://github.com/5orenso
 *
 * Copyright (c) 2015 Øistein Sørensen
 * Licensed under the MIT license.
 */
'use strict';

var _ = require('underscore'),
    logger;

var decToBaseMap = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '+', '/'];

var reverseMap = {};

function IntegerBaseConverter(opt, mockServices) {
    var opts = opt || {};
    mockServices = mockServices || {};
    if (_.isObject(mockServices.logger)) {
        logger = mockServices.logger;
    } else if (_.isObject(opts.logger)) {
        logger = opts.logger;
    } else {
        logger = {
            log: function () {}
            //err: function (msg) {
            //    console.error(msg);
            //}
        };
    }
}

IntegerBaseConverter.prototype.convert = function convert(number, fromBase, toBase) {
    logger.log('IntegerBaseConverter.prototype.convert [before] (' + number + ')', 'from=' + fromBase, 'to=' + toBase);
    if (fromBase !== 10) {
        number = IntegerBaseConverter.prototype.convertToBase10(number, fromBase);
    }
    var result = IntegerBaseConverter.prototype.convertFromBase10(number, toBase);
    logger.log('IntegerBaseConverter.prototype.convert [after] (' + number + ')', 'from=' + fromBase,
        'to=' + toBase, 'result=' + result);
    return result;
};

IntegerBaseConverter.prototype.isNegative = function isNegative(number) {
    var negative;
    if (typeof number === 'string') {
        if (number.charAt(0) === '-') {
            negative = true;
        }
    } else {
        if (number < 0) {
            negative = true;
        }
    }
    return negative;
};

IntegerBaseConverter.prototype.convertFromBase10 = function convertFromBase10(number, base) {
    if (base < 2 || base > 64) {
        throw new RangeError('Base should be between 2 and 64');
    }
    var negative = this.isNegative(number) ? '-' : '';
    number = number.toString().split('.');
    var integer = Math.abs(number[0]);
    var fraction = number[1];
    var result = '';
    while (integer > 0) {
        result = decToBaseMap[integer % base] + result;
        integer = parseInt(integer / base, 10);
    }
    if (fraction) {
        var decimalPlaces = fraction.toString().length;
        result += '.';
        fraction = parseFloat('.' + fraction);
        var x = 0;
        while (x < decimalPlaces) {
            x++;
            var res = (fraction * base).toString().split('.');
            result = result + decToBaseMap[res[0]];

            if (res[1]) {
                fraction = parseFloat('.' + res[1]);
            } else {
                break;
            }
        }
    }
    logger.log('IntegerBaseConverter.prototype.convertFromBase10 (' + number + ')',
        'base=' + base, 'result=' + result);
    if (base === 10) {
        return parseFloat(negative + result);
    } else {
        return negative + result;
    }
};

IntegerBaseConverter.prototype.buildReverseMap = function buildReverseMap() {
    for (var i = 0; i < decToBaseMap.length; i++) {
        reverseMap[decToBaseMap[i]] = i;
    }
};

IntegerBaseConverter.prototype.convertToBase10 = function convertToBase10(number, fromBase) {
    if (fromBase < 2 || fromBase > 64) {
        throw new RangeError('Base should be between 2 and 64');
    }
    var isNegative = IntegerBaseConverter.prototype.isNegative(number);
    if (isNegative) {
        number = number.substr(1);
    }
    var result = 0;
    var resultFraction = 0;
    var digitValue = 0;
    number = number.toString().split('.');
    var integer = number[0];
    var fraction = number[1];
    var len = integer.length;
    if (_.isEmpty(reverseMap[0])) {
        IntegerBaseConverter.prototype.buildReverseMap();
    }
    for (var i = 0; i < len; i++) {
        digitValue = reverseMap[integer.charAt(i)];
        result = result * fromBase + digitValue;
    }
    if (fraction) {
        resultFraction = IntegerBaseConverter.prototype.convertToBase10(fraction, fromBase);
        result = parseFloat(result + '.' + resultFraction);
    }
    logger.log('IntegerBaseConverter.prototype.convertToBase10 (' + number + ')',
        'fromBase=' + fromBase, 'result=' + result);

    return parseFloat((isNegative ? '-' : '') + result);
};

module.exports = IntegerBaseConverter;
