const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpSecurityHeaders = require('@middy/http-security-headers');
const validator = require('@middy/validator');

const { loadData } = require('lib/data-loader');
const { matchRoute } = require('lib/router');
const serverTimer = require('lib/server-timer');
const { inputSchema, outputSchema } = require('./schema');

require('dotenv').config();

const isProduction = (process.env.NODE_ENV === 'production');
const jsonResponse = ({ body, headers, statusCode = 200 }) => ({
    statusCode,
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify({ ...body, statusCode }),
});
const pageNotFound = () => jsonResponse({
    statusCode: 404,
    body: { message: 'Page not found' },
});
const serverError = (error) => jsonResponse({
    statusCode: 500,
    body: {
        error: isProduction ? error : 'Server error',
    },
});
const urlPrefix = '/api/data/'; // must match redirect rule in `netlify.toml`

const handler = async (event) => {
    try {
        const { withTiming, timingsToString } = serverTimer('Request (total)');
        const urlPath = event.path
            .substr(urlPrefix.length -1)
            .replace(/\.json$/, '');
        const route = await withTiming('Routing', matchRoute({
            urlPath,
            queryParams: event.queryStringParameters,
        }));
        if (!route.isMatch) return pageNotFound();

        const data = await withTiming('Load data', loadData({ route })) || {};
        return jsonResponse({
            body: { data },
            headers: {
                'Server-Timing': timingsToString(),
            }
        });
    } catch(error) {
        console.error(error);
        return serverError(error.toString());
    }
};

exports.handler = middy(handler)
    .use(httpEventNormalizer())
    .use(validator({ inputSchema, outputSchema }))
    .use(httpErrorHandler())
    .use(httpSecurityHeaders());
