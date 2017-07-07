var docgen = require('react-docgen');

var resolver           = require(
    'react-docgen/dist/resolver/findAllExportedComponentDefinitions').default;
var handlers           = require('react-docgen/dist/handlers');
var getMemberValuePath = require(
    'react-docgen/dist/utils/getMemberValuePath').default;
var recast             = require('recast');
var types              = recast.types.namedTypes;
var traverse           = require('react-docgen/dist/utils/traverse').default;
var resolveToValue     = require(
    'react-docgen/dist/utils/resolveToValue').default;
var defaultHandlers    = [
    handlers.propTypeHandler,
    handlers.propTypeCompositionHandler,
    handlers.propDocBlockHandler,
    handlers.flowTypeHandler,
    handlers.flowTypeDocBlockHandler,
    handlers.defaultPropsHandler,
    handlers.componentDocblockHandler,
    handlers.displayNameHandler,
    handlers.componentMethodsHandler,
    handlers.componentMethodsJsDocHandler,
    function (document, path) {
        var displayNamePath = document.get('displayName');
        if (!displayNamePath) {
            displayNamePath = path.get('id').get('name').value;
            if (displayNamePath) {
                document.set('displayName', displayNamePath);
            }
            return;
        }
    }
];
/**
 * ,
 * //figure out later
 defaultHandlers.concat(function (document, path) {
            console.log('path', path);

        }
 * @param source
 */
module.exports = function (source) {
    this.cacheable && this.cacheable();

    const res = docgen.parse(source, resolver, defaultHandlers);

    return JSON.stringify(res, null, 2);
};
