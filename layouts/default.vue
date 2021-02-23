<template>
  <div id="layout">
    <language-header />
    <Nuxt :nuxt-child-key="'default'" />
    <kyushoku-footer />
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>
