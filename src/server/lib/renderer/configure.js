/**
 * @todo extend configure with nunjucks.config.js in project root?
 */
module.exports = function configure({ env, mode }) {
    const loadData = require(`./helpers/load-data.${mode}`);
    const formatDateTime = require('./helpers/format-date-time');
    const isFirstTime = require('./helpers/is-first-time');
    const stringifyProps = require('./helpers/stringify-props');

    const envData = {
        appEnv: mode,
        createdAt: new Date(),
        debug: true,
    };
    let state = {};

    return env
        .addFilter('formatDateTime', formatDateTime)
        .addFilter('loadData', loadData, true)
        .addGlobal('className', stringifyProps)
        .addGlobal('stringifyProps', stringifyProps)
        .addGlobal('_env', envData)
        .addGlobal('isFirstTime', isFirstTime(state));
}
