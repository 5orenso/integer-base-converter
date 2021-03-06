# integer-base-converter

[![Build Status](https://travis-ci.org/5orenso/integer-base-converter.svg)](https://travis-ci.org/5orenso/integer-base-converter)
[![Coverage Status](https://coveralls.io/repos/5orenso/integer-base-converter/badge.svg)](https://coveralls.io/r/5orenso/integer-base-converter)
[![GitHub version](https://badge.fury.io/gh/5orenso%2Finteger-base-converter.svg)](http://badge.fury.io/gh/5orenso%2Finteger-base-converter)
[![npm version](https://badge.fury.io/js/integer-base-converter.svg)](http://badge.fury.io/js/integer-base-converter)

A module for converting numbers between bases. Convert your number from base10 to base2-60. 

This module can be useful for different application.

__Example:__

* __URL shortener__ where you need you number to be presented in a shorted fashion. Instead of:    
https://example.com/123456789 you get https://example.com/9VXX9


## Quick start

```bash
npm install integer-base-converter
```

Then you can use it like this:
```javascript
var ibc = require('integer-base-converter');
var result = ibc.convert(1000, 10, 60);
console.log(result);
# -> Result should be 'Ge'
```

## Howto contribute

```bash
git clone git@github.com:5orenso/integer-base-converter.git
```
Do your magic and create a pull request.

## Howto report issues

Use the [Issue tracker](https://github.com/5orenso/integer-base-converter/issues)

### Howto upgrade modules
```bash
$ npm install -g npm-check-updates
$ ncu -u
$ npm install --save --no-optional
```

## More about the author

- Twitter: [@sorenso](https://twitter.com/sorenso)
- Instagram: [@sorenso](https://instagram.com/sorenso)
- Facebook: [@sorenso](https://facebook.com/sorenso)

## Other resources

- http://convertxy.com/index.php/numberbases/