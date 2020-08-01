module.exports = function(/* arguments */) {
    const args = [].slice.call(arguments);
    const callback = args.pop(); // @see https://github.com/mozilla/nunjucks/issues/820
    const [name, params] = args;
    const route = { name, params };
    // const query = Object.entries(params)
    //     .map((key, value) => `${key}=${value}`)
    //     .join('&');
    const query = '';

    fetch(`/api/data/${route.name}?${query}`)
        .then(response => response.json())
        .then(({ data }) => callback(null, data));
};
