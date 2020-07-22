const path = require('path');

const clientDir = path.dirname(require.resolve('client/package.json'));
const routesDir = path.join(clientDir, 'routes/');

module.exports = {
    clientDir,
    routesDir,
    templateExt: '.njk',
}
