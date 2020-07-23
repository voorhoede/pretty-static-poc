# Getting started

**Learn how build web things with Pretty Static step-by-step.**

## Start your web server

Pretty Static is a web app framework, so let's start a web server:

```bash
npm run dev
```

Visit [`http://localhost:8888`](http://localhost:8888) in the browser and you'll see:

```html
<h1>404</h1>
```

Makes sense, as we haven't created anything yet. Let's change that.


## Create your first route

Create an `index.njk` file in the `routes/` directory:

`src/client/routes/index.njk`:

```njk
{% set name = 'world' %}

<h1>Hello, {{ name | capitalize }}</h1>
```

Visit [`http://localhost:8888/`](http://localhost:8888/) again:

```html
<h1>Hello, World</h1>
```

What's going on here?

* When you create a file inside the `routes/` directory, it is automatically available as a web page. The [Pretty Static router](routing.md) takes care of this. We call this simple route a [static route](routing.md#static-routes).
* The index file has a `.njk` extension. That's because Pretty Static uses the [Nunjucks templating language](templates.md#nunjucks-templating-language). It supports features like `{{ variable }}`, `| filter` and much more. See [templates](templates.md).


## Make your route dynamic

What if we want our `name` variable to be dynamic?
Create a `_name.njk` file in the `routes/` directory:

`src/client/routes/_name.njk`:

```njk
<h1>Hello, {{ _params.name | capitalize }}</h1>
```

Visit [`http://localhost:8888/jasper`](http://localhost:8888/jasper) (or your name):

```html
<h1>Hello, Jasper</h1>
```

* `_params`: -> routing.md#dynamic-routes
* Note `routes/_name.njk` is equivalent to `routes/_name/index.njk`.


## Loading data in your template

`src/client/routes/_locale/_name.njk`
`src/client/routes/_locale/_name.data.json`

```json
{
    "greeting": {
        "en": "Hello",
        "es": "¡Hola!"
    }
}
```

```njk
...
```

[ use in template ]


## Add expression to route

`src/client/routes/_locale(en|es)/_name.njk`


## Using query parameters

`/en/jasper/?from=ruby`

```njk

```

...