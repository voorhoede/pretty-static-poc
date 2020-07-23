# Routing

## Features

- [x] File based router
- [x] Static routes (`routes/page.njk`)
- [x] Dynamic routes (`routes/_param.njk`)
- [x] Query parameters (`?paramQ=...`)
- [x] Route expressions (`_slug([a-z]+).njk`)
- [ ] Splat / wildcard routes (`_*.njk`)
- [x] Custom file extensions (`*.xml.njk`)
- [ ] Computed parameters (`*.params.js`)
- [ ] Parameter validation (`*.params.js`)
- [x] Routes in templates (`route()`)
- [ ] Optional absolute route (`route(..., params, { absolute: true })`)
- [ ] Optional prefetching route (`route(..., params, { prefetch: true })`)
- [ ] Routes in templates extra (`isRoute()`, `isExactRoute()`)


## File based router

Pretty Static has a file-system based router, inspired by [Next.js](https://nextjs.org/docs/routing/introduction), [Nuxt.js](https://nuxtjs.org/guide/routing/) and [Sapper](https://sapper.svelte.dev/docs#Routing).

When a file is added to the routes directory (`src/client/routes/`) it's automatically available as a route. Route files can be used for both template and data routes:

* Template routes (`[name](.ext).njk`) are for HTML pages and other rendered files.
* Data routes (`[name].data.[ext]` expose data in templates and as via an API endpoint.


### Static routes

The router supports static routes where each template file matches exactly one website URL.
The router supports nested routes and automatically routes files named `index` to the root of the directory:

- `routes/index.njk` → `/`
- `routes/about.njk` → `/about/`
- `routes/about/index.njk` → `/about/`
- `routes/blog/index.njk` → `/blog/`

### Dynamic routes

The router supports dynamic routes containing path parameters, using the `_param` syntax:

- `routes/_locale/blog/_slug.njk` → `/:locale/blog/:slug`

These parameters will be available in your [data loader](/docs/data.md).
For example `/en/blog/my-article/` exposes `{ locale: "en", slug: "my-article" }`.

### Query parameters

The router also supports query string parameters in the URL: `?param1=value1&param2=value2`.
Like path parameters, these query parameters will be available in your [data loader](/docs/data.md).
Note that path parameters with the same name override query parameters.

### Route expressions

The router supports refining a route using regular expressions, using the `_param(regex)` syntax:

- `routes/blog/_slug([a-z-]+).njk`
- `routes/_locale(en|nl)/blog/_slug([a-z-]+).njk`

Because of technical limitations, the following characters cannot be used: `/`, `\`, `?`, `:`, `(` and `)`.

Inspired by [Sapper's regexes in routes](https://sapper.svelte.dev/docs#Regexes_in_routes)

### Custom file extensions

The server responds with a `content-type` based on the route name.
By default the server responds with `text/html`.
When you add a file extension (like `.xml`) the server reponds with the related content type:

- `routes/sitemap.njk` → `/sitemap` with response header `content-type: text/html`
- `routes/sitemap.xml.njk` → `/sitemap.xml` with response header `content-type: application/xml`

### Computed parameters

```js
// routes/blog/_page.params.js
const limit = 5;
module.exports = {
  computed(params) {
    return {
      limit,
      offset: params.page * limit,
    };
  }
};
```

### Parameter validation

```js
// routes/blog/_page.params.js
module.exports = {
  validate(params) {
    return parseInt(params.page, 10) > 0;
  }
};
```


## The route object

```
{
  name: "blog/_slug",
  pattern: "/blog/:slug(/)",
  urlPath: "/blog/my-first-article/,
  params: {
    slug: "my-first-article",
  }
  host: "www.example.com",
  isIndex: false
}
```

## Using routes in templates

```njk
<a href="{{ route('blog/:slug', { slug: 'my-article' }) }}">
```
outputs:
```html
<a href="/blog/my-article/">
```

```
{{ isRoute(...) }}
{{ isExactRoute(...) }}
```

Within a template, the current route is available via `_route`.
During development `_route` is always logged to the console.