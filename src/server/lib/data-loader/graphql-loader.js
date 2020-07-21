const fs = require('fs').promises;
const fetch = require('node-fetch');

require('dotenv').config();

module.exports = async function({ filename, params }) {
    const query = await fs.readFile(filename, 'utf8');
    const variables = params;

    const data = await fetch('https://graphql.datocms.com/', {
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

    const hasData = Object.values(data).some(value => !!value);
    if (!hasData) throw Error('No data');

    return data;
};
