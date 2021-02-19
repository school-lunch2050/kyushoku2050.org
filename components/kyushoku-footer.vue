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
      <nuxt-link v-t="'weblate.menu.footer.about'" :to="localePath('/about')" />
      <a v-t="'weblate.menu.footer.contact'" href="mailto:feast@chikyu.ac.jp" target="_blank" />
      <nuxt-link v-t="'weblate.menu.footer.pp'" :to="localePath('/privacy-policy')" />
      <nuxt-link v-t="'weblate.menu.footer.feedback'" :to="localePath('/feedback')" />
    </section>
  </footer>
</template>
