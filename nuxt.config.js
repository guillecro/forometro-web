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
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css', rel: 'stylesheet', integrity: 'sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==', crossorigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap' }
    ]
  }, 
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // {src: '~/plugins/vue-slick-carousel.js'}
    { src: '~/plugins/vue-slick-carousel.js', mode: 'client' },
    { src: '~/plugins/vue-particles.js', mode: 'client' },
    { src: '~/plugins/services.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
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
    entities: ['homepage', 'acompanamientos', 'eventos', 'stands','galeria','socios'],
    url: process.env.STRAPI_URL || 'http://localhost:1337'
  },

  markdownit: {
    injected: true,
    linkify: false,
    html: true,
  },

  googleAnalytics: {
    id: 'UA-183289065-1', // Use as fallback if no runtime config is provided
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
