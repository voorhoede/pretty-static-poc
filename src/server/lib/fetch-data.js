/**
 * @todo: move to src/lib and use isomorphic-unfetch? 
 *        how to keep token private? netlify proxy or function?
 */

const fetch = require('node-fetch');

require('dotenv').config();

function fetchData({ query, variables }) {
    return fetch('https://graphql.datocms.com/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.DATO_API_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.errors) throw Error(JSON.stringify(response, null, 4));
        return response.data;
    });
};

module.exports = fetchData;