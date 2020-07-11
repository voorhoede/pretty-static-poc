const path = require('path');

const clientDir = path.join(__dirname, '../../client/');
const pagesDir = path.join(clientDir, 'pages/');

module.exports = {
    clientDir,
    pagesDir,
    templateExt: '.njk',
    graphqlQueryExt: '.query.graphql',
}
