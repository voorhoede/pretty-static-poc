const glob = require('fast-glob');
const Route = require('route-parser');
const { pagesDir, templateExt } = require('./paths');

async function getBasenames() {
    const templateNames = await glob(`**/*${templateExt}`, { cwd: pagesDir })
    return templateNames.map(name => name.substr(0, name.length - templateExt.length));
}

function isIndexRoute(name) {
    return `/${name}`.endsWith('/index');
}

function getPattern(name) {
    const isIndex = isIndexRoute(name);
    const basePattern = isIndex
        ? `/${name}`.replace(/\/index$/, '(/)(index)')  // optional /index
        : `/${name}`.concat('(/)');                     // optional trailing slash
    return basePattern.replace(/\/_/gi, '/:');          // transform /:param notation
}

async function getRoutes() {
    const basenames = await getBasenames();
    return basenames
        .map(name => ({
            name,
            isIndex: isIndexRoute(name),
            pattern: getPattern(name),
        }))
        // @todo: order by specificity, and indix routes before param route
        .sort((a, b) => (b.isIndex - a.isIndex));
}

async function matchRoute(urlPath) {
    const routes = await getRoutes();
    return routes
        .map(route => {
            const output = (new Route(route.pattern)).match(urlPath);
            return {
                ...route,
                urlPath,
                isMatch: !!output,
                params: output ? output : {}
            }
        })
        .find(route => route.isMatch);
}

function reverseRoute({ name, params = {} }) {
    const pattern = getPattern(name);
    const route = new Route(pattern);
    let urlPath = route.reverse(params);
    if (!urlPath.endsWith('/')) {
        urlPath += '/';
    }
    return urlPath.replace(/\/index\//, '/');
}

module.exports = {
    getRoutes,
    matchRoute,
    reverseRoute,
};
