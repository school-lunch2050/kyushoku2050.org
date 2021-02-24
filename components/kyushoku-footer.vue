<template>
  <footer class="font--nav">
    <section class="footer--partner">
      <a :href="$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'https://feastproject.org' : 'https://www.feastproject.org/en/'" target="_blank">
        <img :src="`/img/logo_feast_${$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'ja' : 'en'}.webp`" :alt="$t('weblate.menu.footer.feast')">
      </a>
      <a :href="$i18n.locale === 'ja' || $i18n.locale === 'ja-simple' ? 'https://www.chikyu.ac.jp/' : 'https://www.chikyu.ac.jp/rihn_e/'" target="_blank">
        <img :src="`/img/logo_rihn.webp`" :alt="$t('weblate.menu.footer.rihn')">
      </a>
    </section>
    <section class="footer--common">
      <nuxt-link :to="localePath('/about')">
        <text-box key="weblate.pages.about.short" />
      </nuxt-link>
      <a href="mailto:feast@chikyu.ac.jp" target="_blank">
        <text-box key="weblate.menu.footer.contact" />
      </a>
      <nuxt-link :to="localePath('/privacy-policy')">
        <text-box key="weblate.pages.privacy-policy.full" />
      </nuxt-link>
      <nuxt-link :to="localePath('/feedback')">
        <text-box key="weblate.menu.footer.feedback" />
      </nuxt-link>
    </section>
    <section class="footer--lang">
      <language-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :locale="locale"
      />
    </section>
  </footer>
</template>
<script type="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    availableLocales () {
      return (this.$i18n?.locales ?? []).map(entry => (typeof entry === 'string') ? { code: entry } : entry)
    }
  }
})
</script>
