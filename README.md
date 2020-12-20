# Adopt me - Pet shelter

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Deployment

Deployment is still in very early stages. For now, these are the instructions in order to launch an updated Docker container with our frontend application.
We have used an NGINX image for the web server, as suggested [here](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html#Real-World-Example).

### Build Docker image

```
docker build -t adoptme/frontend .
```

### Run app in Docker container

```
docker run -it -p 8080:80 --rm --name frontend-1 adoptme/frontend

```

App will be accessible at localhost:8080

See more information at [Vue Cookbook - Dockerize](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html) and [Docker docs](https://docs.docker.com/get-started/)
