# Pretty Static

**Pretty Static is a lightweight serverless web app framework optimised for mostly static sites,**
**with optional dynamic serverless rendering and data loading.**

Pretty Static draws inspiration from other web app frameworks like Next.js, Nuxt.js, Sapper and Eleventy.
The setup is similar but without a JavaScript or Single Page App framework. That makes it ideal for mostly static sites.
You can generate fully static sites. And ig you need dynamic rendering and data loading, Pretty offers this using serverless functions.

## Features

* Static site generation
* Dynamic server-side rendering
* File based routing
* GraphQL data fetching built-in

## Roadmap

* Asset optimisation and caching
* I18n
* Custom data fetching optional

## Getting started

* [Routing](docs/routing.md) - file-system based router supporting dynamic routes.
* [Templates](docs/templates.md) - 
* [Data](docs/data.md) -
* [Assets](docs/assets.md) - 
* [Server](docs/server.md) - 

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
  routes/            <-
  static/           <- will be served as-is
```
