const nunjucks = require('nunjucks');
const { clientDir, templateExt } = require('../paths');
const { reverseRoute } = require('../router');
const assetUrlFilter = require('./filters/asset-url');
const formatDateTimeFilter = require('./filters/format-date-time');
const loadDataFilter = require('./filters/load-data');
const stringifyPropsFilter = require('./filters/stringify-props');

require('dotenv').config();

const isProduction = (process.env.NODE_ENV === 'production');

function createEnv() {
    const env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(clientDir),
        { 
            noCache: !isProduction,
            watch: !isProduction,
        },
    );
    const defaultState = () => ({
        firstTimers: [],
    });
    let state = defaultState();

    // @todo configure env using nunjucks.config.js in project root?
    env.addFilter('formatDateTime', formatDateTimeFilter);
    env.addFilter('loadData', loadDataFilter, true);
    env.addGlobal('assetUrl', assetUrlFilter);
    env.addGlobal('className', stringifyPropsFilter);
    env.addGlobal('stringifyProps', stringifyPropsFilter);
    env.addGlobal('route', (name, params) => reverseRoute({ name, params }));
    env.addGlobal('isFirstTime', (key) => {
        if (state.firstTimers.includes(key)) return false;
        state.firstTimers.push(key);
        return true;
    })

    return env;
}

function render(filename, data) {
    const env = createEnv();
    const _env = {
        appEnv: 'server',
        createdAt: new Date(),
        debug: true,
    }
    return new Promise((resolve, reject) => {
        env.render(`routes/${filename}${templateExt}`, { ...data, _env }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

module.exports = {
    render
};
