const nunjucks = require('nunjucks');
const { clientDir, templateExt } = require('../paths');
const { reverseRoute } = require('../router');
const assetUrl = require('./filters/asset-url');
const stringifyProps = require('./filters/stringify-props');

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

    // @todo configure env using nunjucks.config.js in project root
    env.addGlobal('assetUrl', assetUrl);
    env.addGlobal('className', stringifyProps);
    env.addGlobal('stringifyProps', stringifyProps);
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
    return new Promise((resolve, reject) => {
        env.render(`routes/${filename}${templateExt}`, data, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

module.exports = {
    render
};
