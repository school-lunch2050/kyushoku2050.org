<template>
  <header>
    <LanguageLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :locale="locale"
    />
  </header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    availableLocales (): any {
      return (this.$i18n?.locales ?? []).map(entry => (typeof entry === 'string') ? { code: entry } : entry)
    }
  }
})
</script>
