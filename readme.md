# Pretty Static

Lightweight serverless web app setup in Nuxt/Next/Sapper style sans single page app framework.

## Features

* Dynamic server-side rendering
* File based routing
* GraphQL data fetching built-in

## Roadmap

* Static site generation
* Asset optimisation and caching
* I18n
* Custom data fetching optional

## Structure

```
src/          <- web app source code
  client/     <- templates and other files sent to the browser
  lib/        <- shared between client & server
  server/     <- server config & serverless functions
```

## The client

```
src/client/
  assets/           <- will be optimised + hash in filename
  components/       <-
  layouts/          <-
  pages/            <-
  static/           <- will be served as-is
```

### Routing


### Async data


### Templates

```
src/client/
  components/
    my-component/
      my-component.njk
      (my-component.fragment.graphql)
  pages/
    my-dir/
      _my-page.njk
      _my-page.query.graphql
      (_my-page.data.js)
    404.njk
```

#### `className()`

Inspired by [Vue class and style bindings(https://vuejs.org/v2/guide/class-and-style.html).

**Object syntax**
```njk
<div class="{{ className({ 'conditional-class': condition, 'another-class': true }) }}">
```
if `condition` is `true`, outputs:
```html
<div class="conditional-class another-class">
```

**Array syntax**
```njk
<div class="{{ className(['static-class', { 'my-class': condition } ]) }}">
```
if `condition` is `true`, outputs:
```html
<div class="static-class conditional-class">
```


#### `asset()` url

```njk
{{ asset('filename.ext') }}
```
outputs:
```html
filename.a61b24c.ext
```

#### Route helpers

```njk
<a href="{{ route('blog/:slug', { slug: 'my-slug' }) }}">
```
outputs:
```html
<a href="/blog/my-slug/">
```

```
{{ isRoute(...) }}
{{ isExactRoute(...) }}
```

Within a template, the current route is available via `_route`.
During development `_route` is always logged to the console.

## The server

```
```

Netlify unbundled JavaScript functions

Server `lib`