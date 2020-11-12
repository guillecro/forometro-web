# stream-fundacion-metropolitana

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Strapi

```
docker-compose -f docker-compose.dev.yml up
```

Or you can use the one without mongo, if you have one in another container or installed in your OS

```
docker-compose -f docker-compose.guille.yml up
```

