<template>
  <div>
    <LanguageHeader />
    <Nuxt />
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
