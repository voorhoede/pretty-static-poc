# Data

## Features

- [x] File based data loading
- [x] Serverless data loading
- [ ] Global data (files)
- [ ] Caching (during development)
- [ ] Template helper for data loading
- [x] JavaScript data loader
- [x] JSON data loader
- [x] GraphQL data loader
- [ ] Bring your own data loader

## File based data loading

To load data in a template, simply add a `.data.extension` file next to the template file:

```
src/pages/
  my-page.njk
  my-page.data.graphql
```

## Available data loaders

- [x] `.data.js`: JavaScript data loader
- [x] `.data.json`: JSON data loader
- [x] `.data.graphql`: GraphQL data loader
- [ ] `.data.yaml`: YAML data loader
- [ ] `.data.toml`: TOML data loader
- [ ] `.data.md`: Markdown data loader

### JavaScript Data Loader

Route parameters are available as JavaScript function parameters:

```js
const fetch = require('node-fetch');

module.exports = async function ({ params }) {
    return fetch('https://example.com/api/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'MY_API_TOKEN',
            },
            body: JSON.stringify({ params }),
        })
        .then(response => response.json())
        .then(data => ({ title: data.title }))
}
```

Response object properties are available as data in template:

```njk
<h1>{{ title }}</h1>
```

### GraphQL Data Loader

- [ ] Configure GraphQL endpoint (incl headers)
- [ ] Allow `#imports` inside data files

Route parameters are available as GraphQL variables:

```graphql

```

GraphQL query properties are available as data in template:

```njk

```

## Data loading using template helper

```njk
{% set sharedData = 'data/shared.graphql' | loadData %}

{{ sharedData.someProp }}
```

```njk
{% set sharedData = 'data/shared.graphql' | loadData('graphql') %}

{{ sharedData.someProp }}
```