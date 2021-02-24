export default {
  server: {
    host: '0' // default: localhost
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kyushoku2050.org',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/site.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/localstorage.client.ts',
    '~/plugins/vue-tr.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      strategy: 'prefix',
      vueI18nLoader: true
    }],
    '@nuxt/content',
    'vue-plausible'
  ],

  plausible: {
    domain: 'kyushoku2050.org',
    apiHost: '//stats.kyushoku2050.org',
    hashMode: true
  },

  content: {
    // https://content.nuxtjs.org/configuration
    liveEdit: false
  },

  i18n: {
    locales: [
      {
        name: '日本語',
        code: 'ja',
        file: 'messages.ja.yaml'
      },
      {
        name: 'にほんご',
        code: 'ja-simple',
        file: 'messages.ja-simple.yaml'
      },
      {
        name: 'English',
        code: 'en',
        file: 'messages.en.yaml'
      }
    ],
    defaultLocale: 'ja',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader'
      })
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-svg-inline-loader',
        options: {
          svgo: false
        }
      })
    }
  }
}
