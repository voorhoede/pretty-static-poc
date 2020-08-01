const fse = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const rollup = require('rollup');
const rollupPluginCommonjs = require('@rollup/plugin-commonjs');
const series = require('promise.series');
const { createEnv } = require('../src/server/lib/renderer');

const rootDir = path.join(__dirname, '../');
const outputDir = path.join(rootDir, 'dist/_pretty');

function buildClient() {
    return series([
        buildClientApp,
        compileTemplates,
        copyNunjucksFiles,
    ]);
}

async function buildClientApp() {
    const inputOptions = {
        input: path.join(rootDir, 'src/server/lib/renderer/client.js'),
        plugins: [
            rollupPluginCommonjs({
                dynamicRequireTargets: [
                    path.join(rootDir, 'src/server/lib/renderer/helpers/*.client.js')
                ]
            }),
        ],
    };
    const outputOptions = {
        file: path.join(outputDir, 'client.js'),
        format: 'iife',
        sourcemap: true,
    };
    const bundle = await rollup.rollup(inputOptions);
    return await bundle.write(outputOptions);
}

function compileTemplates() {
    const templates = nunjucks.precompile('src/client/', { 
        env: createEnv(),
        include: ['\\.njk$'],
    });
    const filename = path.join(outputDir, 'templates.js');
    return fse.outputFile(filename, templates);
}

function copyNunjucksFiles() {
    const nunjucksBrowserDir = path.join(path.dirname(require.resolve('nunjucks/package.json')), 'browser/');
    const nunjucksFiles = [
        'nunjucks-slim.min.js',
        'nunjucks-slim.min.js.map',
    ];
    return Promise.all(nunjucksFiles.map(filename => {
        fse.copyFile(path.join(nunjucksBrowserDir, filename), path.join(outputDir, filename));
    }));
}

module.exports = buildClient;

if (require.main === module) {
    console.log('Building client ...');
    buildClient()
        .then(() => console.log(`Built client to ${path.relative(rootDir, outputDir)}`))
        .catch((err) => console.error('Error building client', err));
}
