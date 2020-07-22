# Templates

## Features

- [x] Nunjucks templating language
- [x] Route URL helper
- [x] Asset URL helper
- [x] Class name helper
- [ ] Format date helper
- [ ] Load data helper
- [ ] Minification
- [ ] Compression
- [ ] Rendering in service worker
- [ ] Rendering client-side
- [ ] Client-/Server-only templates (`*.client.njk`, `*.server.njk`)
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

## `assetUrl()` helper

```njk
<img alt="..." src="{{ assetUrl('logo.png') }}">
```
outputs:
```html
<img alt="..." src="/assets/logo.b2fa5cf8ab.png">
```

## `className()` helper

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