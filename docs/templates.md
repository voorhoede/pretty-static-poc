# Templates

## Features

- [x] Nunjucks templating language
- [x] Route URL helper
- [x] Asset URL helper
- [x] Class name helper
- [x] Format date filter
- [ ] Load data filter
- [ ] Minification
- [ ] Compression
- [ ] Rendering in service worker
- [ ] Rendering client-side
- [ ] Client-/Server-only templates (`*.client.njk`/`{% client %}`/`{% if _env.client %}`)
- [ ] Bring your own template engine

## Nunjucks templating language

Pretty Static uses [Nunjucks](https://mozilla.github.io/nunjucks/) for its templates.

Templates use the community adopted [`.njk` extension](https://mozilla.github.io/nunjucks/templating.html#file-extensions).

## Directory structure

```
src/client/
  components/
    my-component/
      my-component.njk
      (my-component.fragment.graphql)
  routes/
    my-dir/
      _my-page.njk
      _my-page.data.graphql
      (_my-page.data.js)
    404.njk
```

## Extra template helpers

### `assetUrl()` helper

```njk
<img alt="..." src="{{ assetUrl('logo.png') }}">
```
outputs:
```html
<img alt="..." src="/assets/logo.b2fa5cf8ab.png">
```

### `className()` helper

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

### `formatDateTime` filter

Filter to format date and time strings based on an input date:

```njk
{% set date = '2030-12-25' %}
{{ date | formatDateTime }}
```
outputs:
```html
12/25/2030
```

You can format the string:
```njk
{% set options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
} %}
{{ date | formatDateTime(options) }}
```
outputs:
```html
Wednesday, December 25, 2030
```

And change the locale:
```njk
{% set locale = 'nl' %}
{{ date | formatDateTime(locale) }}
```
outputs:
```html
25-12-2030
```

Or set both locale and format options:
```njk
{{ date | formatDateTime(locale, options) }}
```
outputs:
```html
woensdag 25 december 2030
```

The `formatDateTime` filter is based on the native [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) and uses its syntax for `locale` and `options`.

The `Intl.DateTimeFormat` API is supported in all modern browsers and Node.js. [Node.js requires ICU to be installed](https://nodejs.org/api/intl.html). If you're using an older version of Node.js you may need to install the [`full-icu` package](https://www.npmjs.com/package/full-icu).