<template>
  <article>
    <nuxt-content :document="page[$i18n.locale]" />
  </article>
</template>
<script lang="ts">
import Vue from 'vue'
import { i18nContent } from '../lib'

export default Vue.extend({
  name: 'PrivacyPolicy',
  key: route => route.fullPath,
  asyncData: i18nContent.bind(null, {
    name: 'privacy-policy',
    map: { 'ja-simple': 'ja' }
  })
})
</script>
