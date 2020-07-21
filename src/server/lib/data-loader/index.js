const fs = require('fs').promises;
const path = require('path');
const graphqlLoader = require('./graphql-loader');
const jsLoader = require('./javascript-loader');
const jsonLoader = require('./json-loader');
const { pagesDir } = require('../paths');

const loaders = [
    {
        name: 'javascript',
        extensions: ['js', 'cjs'],
        loadData: jsLoader,
    },
    {
        name: 'json',
        extensions: ['json'],
        loadData: jsonLoader,
    },
    {
        name: 'graphql',
        extensions: ['graphql', 'gql'],
        loadData: graphqlLoader,
    },
];

async function getDataFiles(routeName) {
    const dirname = path.dirname(path.join(pagesDir, `${routeName}`));
    const basename = `${path.basename(routeName)}.data.`;
    const filenames = await fs.readdir(dirname);
    return filenames
        .filter(filename => filename.startsWith(basename))
        .map(filename => ({
            filename: path.join(dirname, filename),
            extension: path.extname(filename).substr(1),
        }));
}

function findDataLoader(dataFiles) {
    const loader = loaders.find(loader => {
        return dataFiles.some(dataFile => loader.extensions.includes(dataFile.extension));
    });
    return loader;
}

async function loadData({ route }) {
    const dataFiles = await getDataFiles(route.name);
    if (!dataFiles.length) return;
    if (dataFiles.length > 1) {
        console.warn(`multiple data files detected for ${route.name}`);
    }

    const loader = findDataLoader(dataFiles);
    if (!loader) {
        console.warn(`no data loader found for ${route.name}.data.* files`);
        return;
    };

    const { filename } = dataFiles.find(dataFile => loader.extensions.includes(dataFile.extension))
    const params = {  ...route.queryParams, ...route.params };
    const data = await loader.loadData({ filename, params });
    return data;
}

module.exports = {
    loadData,
}
