<template>
  <li :class="`bubble-link font--nav--${locale}`">
    <a :href="href" target="_blank">{{ text }}</a>
  </li>
</template>
<script lang="ts">
import Vue from 'vue'

function firstKey (obj: Object): string | undefined {
  // eslint-disable-next-line no-unreachable-loop
  for (const key in obj) {
    return key
  }
}

export default Vue.extend({
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  data () {
    const { link } = this.$props
    // Links are not split in complexity!
    const preferred = (this.$i18n.locale).split('-')[0]
    const locale = link[preferred] ? preferred : firstKey(link)
    if (!locale) {
      return {
        href: '#broken-link',
        text: 'broken-link?',
        locale: 'en'
      }
    }
    const href = link[locale]
    const hrefInfos = this.$i18n.t('weblate.links') as { [key: string]: { title: string, source: string }}
    const info = hrefInfos[href]
    let text = info ? `${info.title} (${info.source})` : href
    if (locale !== preferred) {
      text += ` (${this.$i18n.t(`weblate.other_locales.${locale}`)})`
    }
    return {
      href,
      text,
      locale: info ? locale : 'en' // english for urls!
    }
  }
})
</script>
