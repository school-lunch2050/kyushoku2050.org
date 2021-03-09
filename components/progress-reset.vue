<template>
  <img
    class="progress--reset"
    src="/img/icon_close.svg"
    :alt="$t('weblate.scenario.progress.clear')"
    tabindex="0"
    @click="askReset"
    @keypress="askReset"
  >
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    askReset (e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent) {
        if (e.code !== 'Enter') {
          return
        }
      }
      if (confirm(this.$i18n.t('weblate.scenario.progress.ask_clear').toString())) {
        this.$store.commit('progress/clear')
        this.$forceUpdate()
      }
    }
  }
})
</script>
