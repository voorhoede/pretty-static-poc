# Pretty Static

**Pretty Static is a lightweight serverless web app framework optimised for mostly static sites,**
**with optional dynamic serverless rendering and data loading.**

> **Status: working proof-of-concept**
>
> Try it using `npx degit voorhoede/pretty-static`

Pretty Static draws inspiration from other web app frameworks like Next.js, Nuxt.js, Sapper and Eleventy.
The setup is similar but without a JavaScript or Single Page App framework. That makes it ideal for mostly static sites.
You can generate fully static sites. And if you need dynamic rendering and an API for your data, Pretty offers this using serverless functions.

## Features

* Full static site generation (no client-side JS)
* Optional dynamic rendering using cloud functions
* Powerful templating syntax using Nunjucks with extra helpers
* File-system based routing for pages and data
* Built-in data loaders for JSON, GraphQL and JS
* Optional dynamic data API using cloud functions
* Asset optimisation and caching

## Roadmap

* [ ] Add your own data loaders
* [ ] I18n support
* [ ] Dynamic rendering client-side
* [ ] Dynamic rendering in Service Worker

## Documentation

* [Getting started](docs/getting-started.md): learn how-to build a web site step-by-step.
* [Routing](docs/routing.md): file-system based router supporting dynamic routes.
* [Templates](docs/templates.md): 
* [Data](docs/data.md): 
* [Assets](docs/assets.md): 
* [Server](docs/server.md): 

## License

[MIT Licensed](license) by [De Voorhoede](https://www.voorhoede.nl)
