const nunjucks = require('nunjucks');
const { clientDir, templateExt } = require('./paths');
const { reverseRoute } = require('./router');
const stringifyProps = require('./stringify-props');

const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(clientDir),
    { noCache: true },
);
// @todo configure env using nunjucks.config.js in project root

env.addGlobal('className', stringifyProps);
env.addGlobal('stringifyProps', stringifyProps);
env.addGlobal('route', (name, params) => reverseRoute({ name, params }));

function render(filename, data) {
    return env.render(`pages/${filename}${templateExt}`, data);
}

module.exports = {
    render
};
