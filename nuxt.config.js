export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '17° Foro Metropolitano - Edición 2020 - 1 al 4 de Diciembre 2020',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css', rel: 'stylesheet', integrity: 'sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==', crossorigin: 'anonymous' }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // {src: '~/plugins/vue-slick-carousel.js'}
    { src: '~/plugins/vue-slick-carousel.js' },
    { src: '~/plugins/services.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://strapi.io/documentation/v3.x/getting-started/nuxt-js.html
    '@nuxtjs/strapi',
    // https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit'
  ],
  publicRuntimeConfig: {
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337'
  },
  privateRuntimeConfig: {
    // strapiUrl: process.env.STRAPI_URL
  },

  strapi: {
    entities: ['homepage', 'acompanamientos', 'eventos'],
    url: process.env.STRAPI_URL || 'http://localhost:1337'
  },

  markdownit: {
    injected: true
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
