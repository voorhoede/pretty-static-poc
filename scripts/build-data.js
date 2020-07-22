const fse = require('fs-extra');
const path = require('path');
const { handler: loadData } = require('../src/server/functions/load-data/load-data');

const log = message => console.log(message);

const urls = [
    '/en/cases.json',
    '/en/cases/quantum-inspire.json',
];

// hat tip: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
function asyncSequence(arr, asyncMethod) {
    return arr.reduce((previousPromise, item) => {
        return previousPromise.then(() => asyncMethod(item));
    }, Promise.resolve());
}

// @todo: throw error if response.status != 200
function renderAndSave(url) {
    const outputFilename = path.join(__dirname, '../dist/_pretty/data', url);
    return loadData({
            httpMethod: 'GET',
            path: `/api/data${url}`,
            headers: {},
        })
        .then(response => fse.outputFile(outputFilename, response.body))
        .then(() => log(`✓ Generated ${url}`));
}

log(`\nⓘ Generating data files\n`);
asyncSequence(urls, renderAndSave)
    .then(() => log(`\nⓘ Generated ${urls.length} data files\n`));