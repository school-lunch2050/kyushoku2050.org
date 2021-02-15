<template>
  <div id="layout">
    <LanguageHeader />
    <Nuxt :nuxt-child-key="'default'" />
    <Footer />
  </div>
</template>
<script>
export default {
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>
