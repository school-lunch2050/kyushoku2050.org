<template>
  <div id="layout">
    <language-header />
    <Nuxt :nuxt-child-key="'default'" />
    <footer />
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
