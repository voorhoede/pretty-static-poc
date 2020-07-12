const fse = require('fs-extra');
const path = require('path');
const { handler: renderHtml } = require('../src/server/functions/render-html/render-html');
const { reverseRoute } = require('../src/server/lib/router');

const log = message => console.log(message);

const routes = [
    { name: 'index' },
    { name: 'cases/index' },
    { name: 'cases/_slug', params: { slug: 'quantum-inspire' }},
];

// hat tip: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
function asyncSequence(arr, asyncMethod) {
    return arr.reduce((previousPromise, item) => {
        return previousPromise.then(() => asyncMethod(item));
    }, Promise.resolve());
}

function renderAndSave({ name, params }) {
    const urlPath = reverseRoute({ name, params });
    const outputFilename = path.join(__dirname, '../dist', urlPath, 'index.html');
    return renderHtml({
            httpMethod: 'GET',
            path: urlPath,
            headers: {},
        })
        .then(response => fse.outputFile(outputFilename, response.body))
        .then(() => log(`✓ Generated ${urlPath}`));
}

log(`\nⓘ Generating pages\n`);
asyncSequence(routes, renderAndSave)
    .then(() => log(`\nⓘ Generated ${routes.length} pages\n`));