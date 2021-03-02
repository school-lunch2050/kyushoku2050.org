export default {
  server: {
    host: '0' // default: localhost
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    // eslint-disable-next-line object-shorthand
    titleTemplate: function (chunk) {
      if (!this) {
        return ''
      }
      if (!chunk) {
        const parts = /^(.*?)__/.exec((this.$route && this.$route.name) || '')
        if (parts) {
          const base = `weblate.pages.${parts[1]}`
          const fullKey = `${base}.full`
          const shortKey = `${base}.short`
          if (this.$i18n.te(shortKey)) {
            chunk = this.$i18n.t(shortKey)
          } else if (this.$i18n.te(fullKey)) {
            chunk = this.$i18n.t(fullKey)
          }
        }
      }

      const removeRuby = text => text.replace(/<rt>(.*?)<\/rt>|<\/?ruby>/g, '')
      const base = removeRuby(this.$i18n.t('weblate.title'))
      return chunk ? `${removeRuby(chunk)} | ${base}` : base
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon/favicon.ico' },
      { rel: 'preload', as: 'font', href: '/font/caveat/CaveatBrush-Regular.woff2' },
      { rel: 'preload', as: 'font', href: '/font/honya/HonyaJi-Re.woff2' },
      ...['cosmopolitan', 'desperate', 'gamble', 'garden'].reduce((list, entry) => {
        list.push({ rel: 'prefetch', as: 'image', href: `/img/illustration/${entry}.webp` })
        list.push({ rel: 'prefetch', as: 'image', href: `/img/lunch/${entry}.webp` })
        return list
      }, []),
      { rel: 'prefetch', as: 'image', href: '/img/lunch/empty.webp' }
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
      fallbackLocale: {
        'ja-simple': ['ja']
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icons: false,
    manifest: {
      name: '給食 2050 - School Lunch 2050',
      short_name: 'Lunch 2050',
      lang: 'en',
      background_color: '#2b2f36',
      icons: [
        { prefix: 'android-chrome', sizes: [36, 48, 72, 96, 144, 192, 256, 384, 512] },
        { prefix: 'apple-touch-icon', sizes: [57, 60, 72, 76, 114, 152, 167, 180, 1024] }
      ].reduce((all, { prefix, sizes }) => {
        const type = 'image/png'
        for (const size of sizes) {
          const sizes = `${size}x${size}`
          all.push({
            src: `/img/favicon/${prefix}-${sizes}.png`,
            sizes,
            type
          })
        }
        return all
      }, [])
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
