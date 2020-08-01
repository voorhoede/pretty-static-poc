const nunjucks = require('nunjucks');
const { clientDir, templateExt } = require('../paths');
const { reverseRoute } = require('../router');
const configureEnv = require('./configure');
const assetUrlFilter = require('./helpers/asset-url');

require('dotenv').config();

const isProduction = (process.env.NODE_ENV === 'production');

function createEnv() {
    return configureEnv({ 
            env: new nunjucks.Environment(
                new nunjucks.FileSystemLoader(clientDir),
                { 
                    noCache: !isProduction,
                    watch: !isProduction,
                },
            ), 
            mode: 'server'
        })
        .addGlobal('assetUrl', assetUrlFilter)
        .addGlobal('route', (name, params) => reverseRoute({ name, params }));
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
    createEnv,
    render
};
