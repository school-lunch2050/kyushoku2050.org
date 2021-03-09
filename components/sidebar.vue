<template>
  <nav class="font--nav sidebar">
    <button class="sidebar--toggle sidebar--toggle--open" tabindex="-1" aria-hidden="true" @click="toggleMenu">
      <img src="~/static/img/icon_menu.svg" :alt="$t('weblate.menu.open')">
    </button>
    <div ref="sidebar" class="sidebar--content">
      <button class="sidebar--toggle sidebar--toggle--close" tabindex="-1" aria-hidden="true" @click="toggleMenu">
        <img src="~/static/img/icon_close.svg" :alt="$t('weblate.menu.close')">
      </button>
      <section class="sidebar--lang">
        <language-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :locale="locale"
        />
      </section>
      <section class="sidebar--entries">
        <sidebar-link key="index" />
        <sidebar-link key="main" />
        <div class="sidebar--entries--indent">
          <sidebar-link key="garden" />
          <sidebar-link key="cosmopolitan" />
          <sidebar-link key="gamble" />
          <sidebar-link key="desperate" />
        </div>
        <sidebar-link key="about" />
        <a href="mailto:feast@chikyu.ac.jp" target="_blank">
          <text-box key="weblate.menu.footer.contact" />
        </a>
        <sidebar-link key="privacy-policy" />
        <a :href="$t('weblate.links.feedback')" target="_blank">
          <text-box key="weblate.menu.footer.feedback" />
        </a>
      </section>
      <section class="sidebar--partner">
        <a :href="$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'https://feastproject.org' : 'https://www.feastproject.org/en/'" target="_blank">
          <kyushoku-img :src="`logo_feast_${$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'ja' : 'en'}`" :alt="$t('weblate.menu.footer.feast')" />
        </a>
        <a :href="$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'https://www.chikyu.ac.jp/' : 'https://www.chikyu.ac.jp/rihn_e/'" target="_blank">
          <kyushoku-img :src="`logo_rihn_${$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'ja' : 'en'}`" :alt="$t('weblate.menu.footer.rihn')" />
        </a>
      </section>
    </div>
  </nav>
</template>
<script type="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    availableLocales () {
      return (this.$i18n?.locales ?? []).map(entry => (typeof entry === 'string') ? { code: entry } : entry)
    }
  },
  methods: {
    toggleMenu () {
      this.$refs.sidebar.classList.toggle('sidebar--content--active')
      document.querySelector(':focus')?.blur()
    }
  }
})
</script>
