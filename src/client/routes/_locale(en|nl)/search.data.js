const fetch = require('node-fetch');
const dotenv = require('dotenv');
const { URL } = require('url');

dotenv.config();

/**
 * Search using Dato CMS Site Search
 * @see https://www.datocms.com/docs/site-search
 * @see https://github.com/datocms/datocms-search/blob/master/src/base.js#L31-L53
 */
module.exports = async function ({ params }) {
    const { query, locale = 'en', limit = 10, offset = 0 } = params;
    if (!query) {
        return;
    }

    const endpoint = `https://site-api.datocms.com/search-results?q=${query}&locale=${locale}&offset=${offset}&limit=${limit}&environment=production`;
    const { data, meta } = await fetch(endpoint, {
            headers: {
                'Authorization': process.env.DATO_API_TOKEN,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json());

    const results = data
        .map(({ attributes }) => ({
            ...attributes,
            urlPath: (new URL(attributes.url)).pathname,
        }));

    return {
        results,
        count: meta.total_count,
    }
}
