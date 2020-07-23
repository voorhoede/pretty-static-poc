const requireUncached = require('../require-uncached');

module.exports = async function ({ filename, params }) {
    const fn = requireUncached(filename);
    return fn({ params });
};
