const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpSecurityHeaders = require('@middy/http-security-headers');
const validator = require('@middy/validator');

const { loadData } = require('lib/data-loader');
const { matchRoute } = require('lib/router');
const { inputSchema, outputSchema } = require('./schema');

require('dotenv').config();

const isProduction = (process.env.NODE_ENV === 'production');
const jsonResponse = ({ body, statusCode = 200 }) => ({
    statusCode,
    headers: { 'content-type': 'application/json' },
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
    const urlPath = event.path.substr(urlPrefix.length -1);
    const route = {
        ...await matchRoute(urlPath),
        queryParams: event.queryStringParameters
    };
    if (!route.isMatch) return pageNotFound();

    try {
        const data = await loadData({ route });
        return jsonResponse({
            body: { data },
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
