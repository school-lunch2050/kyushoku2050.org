<template>
  <div class="layout layout--detail">
    <language-header />
    <Nuxt :nuxt-child-key="'detail'" />
  </div>
</template>
<script>
export default {
  name: 'DetailLayout',
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>
