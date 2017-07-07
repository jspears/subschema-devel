var path = require('path');
function findBabel(v) {
    if (!v) {
        return false;
    }
    if (v === 'babel-loader' || v.loader == 'babel-loader') {
        return true;
    }
    if (Array.isArray(v)) {
        return v.find(findBabel);
    }

    if (Array.isArray(v.use)) {
        return v.use.find(findBabel);
    }
    return findBabel(v.use);
}
module.exports = function (options, webpack) {
    console.warn(`using markdown`);

    const babel = webpack.module.rules.find(findBabel);

    webpack.module.rules.push({
        test   : /\.md$/,
        include: ['docs'].concat(babel.include),
        use    : [].concat(babel.use, {
            loader: path.resolve(__dirname, 'subschema-markdown-it-loader'),
        })
    });



    return webpack;
};
