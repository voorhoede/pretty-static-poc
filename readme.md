# Pretty Static

**Pretty Static is a lightweight serverless web app framework optimised for mostly static sites, with ...**

Lightweight serverless web app setup in Next/Nuxt/Sapper style sans single page app framework.

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
  pages/            <-
  static/           <- will be served as-is
```
