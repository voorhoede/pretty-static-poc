const { loadData } = require('../../data-loader');

module.exports = function(/* arguments */) {
    const args = [].slice.call(arguments);
    const callback = args.pop(); // @see https://github.com/mozilla/nunjucks/issues/820
    const [name, params] = args;
    const route = { name, params };
    loadData({ route })
        .then(data => callback(null, data));
};
