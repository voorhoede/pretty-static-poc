# Directory structure

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
  routes/           <-
  static/           <- will be served as-is
```