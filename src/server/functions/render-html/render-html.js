const fs = require('fs-extra');
const path = require('path');
const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpSecurityHeaders = require('@middy/http-security-headers');
const validator = require('@middy/validator');

const fetchData = require('lib/fetch-data');
const { pagesDir, graphqlQueryExt } = require('lib/paths');
const { render } = require('lib/renderer');
const { matchRoute } = require('lib/router');
const { inputSchema, outputSchema } = require('./schema');

require('dotenv').config();

const pageNotFound = () => ({
    statusCode: 404,
    headers: { 'content-type': 'text/html' },
    body: render(`404`, { _data: {}, _route: {} }),
});

const handler = async (event) => {
    console.log({ event })
    const route = await matchRoute(event.path);
    console.log({ route })
    if (!route) return pageNotFound();

    const graphlFilename = path.join(pagesDir, `${route.name}${graphqlQueryExt}`);
    const hasDataFile = await fs.pathExists(graphlFilename);
    let data = {};

    if (hasDataFile) {
        try {
            const query = await fs.readFile(graphlFilename, 'utf8');
            const variables = { ...route.params };
            data = await fetchData({ query, variables });
            const hasData = Object.values(data).some(value => !!value);
            if (!hasData) throw Error('No data');
        } catch(error) {
            return pageNotFound();
        }
    }

    const html = render(route.name, { ...data, _data: data, _route: route });

    return {
        statusCode: 200,
        headers: { 'content-type': 'text/html' },
        body: html,
    };
};

exports.handler = middy(handler)
    .use(httpEventNormalizer())
    .use(validator({ inputSchema, outputSchema }))
    .use(httpErrorHandler())
    .use(httpSecurityHeaders());
