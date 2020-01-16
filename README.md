# submission-platform-web

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Install caddy

```
curl https://getcaddy.com | bash -s personal hook.service
```

Then check that the Caddyfile has the following config:

```
0.0.0.0:8080 {
        root dist/
        rewrite / {
                to {path} /
        }
}
```

To run the server, simply execute:

```
pm2 start 'caddy' --name caddy
```
