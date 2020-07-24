const path = require('path');

const clientDir = path.join(__dirname, '../../client');
const routesDir = path.join(clientDir, 'routes/');

module.exports = {
    clientDir,
    routesDir,
    templateExt: '.njk',
}
