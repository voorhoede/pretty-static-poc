# Data

You add data to your project by adding data files.
A data file has a `*.data.(js|json|grapqhl|...)` extension.

Data is loaded using extension specific data loaders.
The data loaders have access to the [route](/docs/routing.md) `params`,
so you can dynamically return data.

Data is available in your templates, as well as via the `/api/data/:route(.json)` URL endpoint.


## Features

- [x] File based data loading
- [x] Serverless data loading
- [ ] Static generated data files
- [ ] Global data (files)?
- [ ] Caching (during development)
- [ ] Template helper for data loading
- [x] JavaScript data loader
- [x] JSON data loader
- [x] GraphQL data loader
- [ ] Bring your own data loader

## File based data loading

To load data in a template, simply add a data file with the same basename next to the template file:

```
routes/
  my-page.njk
  my-page.data.(js|json|graphql)
```

For example `my-page.data.json`:

```json
{
  "title": "My page",
  "description": "is defined in a data file"
}
```

Loads `title` and `description` into the template:

```njk
<h1>{{ title }}</h1>
<p>{{ description }}</p>
```

## Serverless data loading

All data files are also available via the `/api/data/:route` URL endpoint.

The `routes/my-page.data.json` example above, is available via `/api/data/my-page/` and will return:

```json
{
  "statusCode": 200,
  "data": {
    "title": "My page",
    "description": "is defined in a data file"
  }
}
```

In fact, you can create any API endpoint you want. It doesn't need to have a related template file.

For example you can create a weather API endpoint in `routes/weather.data.js`:

```js
// routes/weather.data.js
const fetch = require('node-fetch');
const openWeatherUrl = 'api.openweathermap.org/data/2.5/weather';
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

module.exports = async function({ params }) {
  const { city, country } = params;
  return fetch(`${openWeatherApiKey}?q=${city},${country}&appid=${openWeatherApiKey}`)
    .then(response => response.json());
}
```

You can call this API endpoint via `/api/data/weather?city=Amsterdam&country=NL`.

## Available data loaders

- [x] `.data.js`: JavaScript data loader
- [x] `.data.json`: JSON data loader
- [x] `.data.graphql`: GraphQL data loader
- [ ] `.data.yaml`: YAML data loader
- [ ] `.data.toml`: TOML data loader
- [ ] `.data.json5`: JSON5 data loader
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