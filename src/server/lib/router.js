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

function getParamPatterns(name) {
    const paramWithPattern = /^_(.*)\((.*)\)$/
    return name.split('/')
        .filter(part => paramWithPattern.test(part))
        .map(part => {
            const [match, name, pattern] = paramWithPattern.exec(part);
            return { name, pattern };
        })
        .reduce((out, { name, pattern }) => ({ ...out, [name]: pattern }), {});
}

function getPattern(name) {
    const cleanName = name.replace(/\(.*\)/g, '');          // remove param patterns
    const isIndex = isIndexRoute(cleanName);
    const basePattern = isIndex
        ? `/${cleanName}`.replace(/\/index$/, '(/)(index)') // optional /index
        : `/${cleanName}`.concat('(/)');                    // optional trailing slash
    return basePattern.replace(/\/_/gi, '/:');              // transform /:param notation
}

async function getRoutes() {
    const basenames = await getBasenames();
    return basenames
        .map(name => ({
            name,
            isIndex: isIndexRoute(name),
            pattern: getPattern(name),
            paramPatterns: getParamPatterns(name),
        }))
        // @todo: order by specificity, and index routes before param route
        .sort((a, b) => (b.isIndex - a.isIndex));
}

function matchParams({ params, patterns }) {
    return Object.keys(patterns).every(paramName => {
        const pattern = new RegExp(`^${patterns[paramName]}$`);
        const value = params[paramName];
        return pattern.test(value);
    });
}

async function matchRoute(urlPath) {
    const routes = await getRoutes();
    return routes
        .map(route => {
            const output = (new Route(route.pattern)).match(urlPath);
            const isMatch = output && matchParams({ params: output, patterns: route.paramPatterns });
            return {
                ...route,
                urlPath,
                isMatch,
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
