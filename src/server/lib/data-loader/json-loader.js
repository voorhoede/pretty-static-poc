const fs = require('fs').promises;

module.exports = async function({ filename, params }) {
    const contents = await fs.readFile(filename, 'utf8');
    return JSON.parse(contents);
};
