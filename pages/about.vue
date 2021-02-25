<template>
  <kyushoku-content :document="page[$i18n.locale]" />
</template>
<script lang="ts">
import Vue from 'vue'
import { i18nContent } from '../lib'

export default Vue.extend({
  name: 'About',
  key: route => route.fullPath,
  asyncData: i18nContent.bind(null, 'about')
})
</script>
