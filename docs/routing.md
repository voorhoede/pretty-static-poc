# Routing

## Features

- [x] File based router
- [x] Static routes
- [x] Dynamic routes
- [ ] Query parameters
- [x] Route expressions
- [ ] Splat / wildcard routes (`_*.njk`)
- [x] Custom file extensions (`*.xml.njk`)
- [x] Routes in templates (`route()`)
- [ ] Optional absolute route (`route(..., params, { absolute: true })`)
- [ ] Optional prefetching route (`route(..., params, { prefetch: true })`)
- [ ] Routes in templates extra (`isRoute()`, `isExactRoute()`)


## File based router

The framework has a file-system based router, inspired by [Next.js](https://nextjs.org/docs/routing/introduction), [Nuxt.js](https://nuxtjs.org/guide/routing/) and [Sapper](https://sapper.svelte.dev/docs#Routing).
When a file is added to the pages directory (`src/client/pages/`) it's automatically available as a route.

### Static routes

The router supports static routes where each template file matches exactly one website URL.
The router supports nested routes and automatically routes files named `index` to the root of the directory:

- `pages/index.njk` → `/`
- `pages/about.njk` → `/about/`
- `pages/about/index.njk` → `/about/`
- `pages/blog/index.njk` → `/blog/`

### Dynamic routes

The router supports dynamic routes containing path parameters, using the `_param` syntax:

- `pages/_locale/blog/_slug.njk` → `/:locale/blog/:slug`

These parameters will be available in your [data loader](/docs/data.md).
For example `/en/blog/my-article/` exposes `{ locale: "en", slug: "my-article" }`.

### Query parameters

The router also supports query string parameters in the URL: `?param1=value1&param2=value2`.
Like path parameters, these query parameters will be available in your [data loader](/docs/data.md).
Note that path parameters with the same name override query parameters.

### Route expressions

The router supports refining a route using regular expressions, using the `_param(regex)` syntax:

- `pages/blog/_slug([a-z-]+).njk`
- `pages/_locale(en|nl)/blog/_slug([a-z-]+).njk`

Because of technical limitations, the following characters cannot be used: `/`, `\`, `?`, `:`, `(` and `)`.

Inspired by [Sapper's regexes in routes](https://sapper.svelte.dev/docs#Regexes_in_routes)

### Custom file extensions

The server responds with a `content-type` based on the route name.
By default the server responds with `text/html`.
When you add a file extension (like `.xml`) the server reponds with the related content type:

- `pages/sitemap.njk` → `/sitemap` with response header `content-type: text/html`
- `pages/sitemap.xml.njk` → `/sitemap.xml` with response header `content-type: application/xml`


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