const path = require('path');

const clientDir = path.dirname(require.resolve('client/package.json'));
// const clientDir = '/home/siilwyn/codeground/a-voorhoede/pretty-static/src/client'
console.log({ clientDir })
const pagesDir = path.join(clientDir, 'pages/');

module.exports = {
    clientDir,
    pagesDir,
    templateExt: '.njk',
    graphqlQueryExt: '.query.graphql',
}
