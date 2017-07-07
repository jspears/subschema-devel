var loader = require('../subschema-markdown-it-loader');
var fs     = require('fs');
var path   = require('path');
var src    = fs.readFileSync(
        path.resolve(__dirname, '..', 'public', 'docs', 'Test.md'), 'utf8')
             + '';

describe('subschema-markdown-it-loader-test', function () {


    it('should parse', function () {
        console.log(loader(src));
    })
})
