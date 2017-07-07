var loader = require('../subschema-docgen-loader');
var fs     = require('fs');
var path   = require('path');
var src    = fs.readFileSync(
        path.resolve(__dirname, '..', 'public', 'TestComponent.jsx'), 'utf8')
             + '';

describe('subschema-docgen-loader-test', function () {


    it('should parse', function () {
        console.log(loader(src));
    })
})
