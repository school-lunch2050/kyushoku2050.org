<template>
  <MainMenu
    prev="/scenarios"
    :title="$t('weblate.main.title')"
    :a="$t('weblate.garden.short')"
    :b="$t('weblate.cosmopolitan.short')"
    :c="$t('weblate.gamble.short')"
    :d="$t('weblate.desperate.short')"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
