# Known Error DataBase

This is an approximation for registering errors and their solutions or workarounds.

The main idea of a KEDB is to be "a repository that holds information about problems for which the root cause is known but a permanent solution doesn't", but in order to make it more useful, we'll also register solved errors. This way we can have more information if they repeat themselves after, for example, a change in configuration.

## Code-related errors

We don't have any of those registered for now.

## Deployment-related errors

### NGINX: 404 error when refreshing page with F5

The default NGINX configuration (using NGINX) has an issue when reloading a page.
Here is an example of the error when refreshing the animal view (_animals-all_):

```
2020/12/20 09:35:44 [error] 30#30: *1 open() "/usr/share/nginx/html/animals-all" failed (2: No such file or directory), client: 172.17.0.1, server: localhost, request: "GET /animals-all HTTP/1.1", host: "localhost:8080"
```

It can be avoided at least in two ways:

- (Workaround) Disabling history mode in Vue Router

  We can prevent the error if we leave the Vue Router configuration by default (hash mode)
  This is made by removing the line `mode: 'history'` when creating the VueRouter instance (in @/router.js)

  This is not the perfect solution since the URLS are 'uglier' (i.e. _http://{host}:8080/#/some-route_ instead of _http://{host}:8080/some-route_)

  And, of course, rebuilding the image and redeploying it (how-to at README.md)

- Changing NGINX configuration

  This is the solution that we currently have applied. It's based on adding this configuration to the NGINX server (i.e. redirect to index.html all unknown URLS that would otherwise cause a 404 error):

  ```
  # [...]
  location / {
      # [...]
      try_files $uri $uri/ /index.html;
  }
  ```

We added a new file (nginx/default.conf) that replaces the configuration file from the container.

The file is copied as stated in this Dockerfile line:
`COPY ./nginx/default.conf /etc/nginx/conf.d/`

More info about Vue Router modes [here](https://router.vuejs.org/guide/essentials/history-mode.html).
More info about NGINX configuration [here](https://hub.docker.com/_/nginx), [here](http://nginx.org/en/docs/http/ngx_http_core_module.html#try_files) and [here](https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/)
