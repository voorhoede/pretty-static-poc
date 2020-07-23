/**
 * Ensure we always load the latest *.data.js file.
 * @todo only clear cache in development?
 * @param {String} module
 */
module.exports = function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}
