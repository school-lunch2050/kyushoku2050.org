const gradient = {
  start: '#29364B',
  end: '#05070A'
}

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
      { hid: 'description', name: 'description', content: '' },
      // https://stackoverflow.com/questions/4117377/how-do-i-hide-the-address-bar-on-iphone/7487346
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ],
    script: [
      // Old browser support
      {
        hid: 'browser-test',
        type: 'text/javascript',
        pbody: true,
        innerHTML: `
var err = false
try {
  if ((new Function ('return {...{ok:1}}'))().ok !== 1) err = true
} catch (e) {
  err = true
}
if (err) {
  var node = document.getElementById('outdated-browser')
  if (!node) {
    node = document.createElement('div')
    node.id = 'outdated-browser'
    node.innerHTML =
      '<p lang="en">This website does not support your browser. Please install a modern browser!</p>' +
      '<p lang="ja">このサイトはご利用中のブラウザに対応していません。Internet Explorerを除く最新版のブラウザをダウンロードしてご利用ください。</p>'
    document.body.appendChild(node)
  }
}`
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'browser-test': ['innerHTML']
    },
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
    ],
    bodyAttrs: {
      // We set the gradient directly to the body. This way the body is defined before anything else gets loaded.
      // Giving the user a more responsive impression.
      style: `background: ${gradient.end} linear-gradient(${gradient.start}, ${gradient.end} 100vh);`
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/site.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/localstorage.client.ts'
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
    // https://go.nuxtjs.dev/pwa - to be able to install the website on a mobile phone nicely
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org/ - for internationalization (en/ja/...)
    ['nuxt-i18n', {
      strategy: 'prefix',
      vueI18nLoader: true,
      defaultLocale: 'ja',
      detectBrowserLanguage: false,
      rootRedirect: 'ja'
    }],
    // https://content.nuxtjs.org/ - for the content/*.md files (more in the ./content folder)
    '@nuxt/content',
    // https://github.com/moritzsternemann/vue-plausible - for the tracking using plausible
    process.env.NODE_ENV === 'production' ? 'vue-plausible' : null,
    // https://github.com/Developmint/nuxt-webfontloader/ - to preload the webfonts, avoiding fouc
    ['nuxt-webfontloader', {
      custom: {
        families: ['CaveatBrush', 'HonyaJi']
      }
    }]
  ].filter(Boolean),

  // https://github.com/moritzsternemann/vue-plausible
  plausible: {
    domain: 'kyushoku2050.org',
    apiHost: '//stats.kyushoku2050.org',
    hashMode: true
  },

  content: {
    // https://content.nuxtjs.org/configuration
    liveEdit: false // We disable live-edit because of problems with the map (and because the computer sweats less.)
  },

  // https://i18n.nuxtjs.org/options-reference
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
    icon: false,
    manifest: {
      name: '給食 2050 - School Lunch 2050',
      short_name: 'Lunch 2050',
      lang: 'en',
      background_color: '#2b2f36',
      // The pwa module has automatic icon generation but we are okay to do that by ourselves using iconify, which gives a broader range of sizes. (generated in scripts/asset_compress.sh)
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
      // The Yaml loader is required for the yaml language files.
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader'
      })
    }
  }
}
