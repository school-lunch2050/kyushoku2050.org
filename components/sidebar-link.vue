<template>
  <nuxt-link :to="localePath($vnode.key === 'index' ? '/' : `/${$vnode.key}`)">
    <text-box :key="i18nkey" />
  </nuxt-link>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    const base = `weblate.pages.${String(this.$vnode.key)}`
    const shortKey = `${base}.short`
    const fullKey = `${base}.full`
    return {
      i18nkey: this.$i18n.te(shortKey) ? shortKey : fullKey
    }
  }
})
</script>
