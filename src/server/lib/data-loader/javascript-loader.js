/**
 * Ensure we always load the latest *.data.js file.
 * @todo only clear cache in development?
 * @param {String} module
 */
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

module.exports = async function ({ filename, params }) {
    const fn = requireUncached(filename);
    return fn({ params });
};
