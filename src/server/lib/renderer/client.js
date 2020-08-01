const configureEnv = require('./configure');

let gettingEnv;

function createAssetUrlFilter(revManifest) {
    return function (filename) {
        filename = filename.startsWith('/') ? filename.substr(1) : filename;
        if (revManifest.hasOwnProperty(filename)) {
            const revUrl = revManifest[filename];
            return `/_pretty/assets/${revUrl}`;
        }
        return `/assets/${filename}`;
    }
}

function getAssetUrlFilter() {
    return fetch('/_pretty/rev-manifest.json')
        .then(response => response.json())
        .then(createAssetUrlFilter);
}

async function getEnv() {
    if (gettingEnv) {
        return gettingEnv;
    }

    gettingEnv = Promise.all([
        getAssetUrlFilter()
    ]).then(([assetUrlFilter]) => {
        return configureEnv({ 
                env: new nunjucks.Environment(),
                mode: 'client'
            })
            .addGlobal('assetUrl', assetUrlFilter)
            .addGlobal('route', (route) => route);
    });

    return gettingEnv;
}

// @todo: render in worker to free up main thread for user interaction
function render(route, data) {
    // console.log('render client-side', { route, data });
    return getEnv()
        .then(env => new Promise((resolve, reject) => {
            env.render(route, data, (err, res) => err ? reject(err) : resolve(res));
        }))
}

const $pretty = {
    render,
};

window.$pretty = $pretty;