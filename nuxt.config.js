const pkg = require('./package')
const Prismic = require ('prismic-javascript')
const PrismicConfig = require('./prismic.config')
require('dotenv').config()


// Needed for Netlify  $yarn run generate
const dynamicRoutes =  () => {
  const routes = require('./_data/prismic-routes.json')
  return routes
}


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Impact ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'apple-touch-icon', size: '180x180', type: 'image/png', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Anton&display=swap' }
    ],
    script: [
        { src: '//static.cdn.prismic.io/prismic.js?repo=at-prismic&new=true', type: 'text/javascript', defer: true, async: true }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/global/global-imports.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  '~/plugins/link-resolver.js',
  '~/plugins/html-serializer.js',
  '~/plugins/prismic-vue.js',
  '~/plugins/svg4everybody'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // 'modules/debug-nuxt-hooks',
    'modules/prismic-dynamic-routes',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    ['@nuxtjs/dotenv', { systemvars: true }],
    ['nuxt-gmaps', { key: process.env.GMAPS_KEY }]
  ],

  styleResources: {
    scss: [
      '~/assets/scss/component-imports/*.scss'
    ]
  },

  svgSprite: {
    input: '~/assets/icons/'
  },


  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // router: {
  //   base: '/wip/'
  // },

  /*
  ** Generate
  */

  generate: {
    routes: dynamicRoutes
  },

  /*

  */

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
       config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
