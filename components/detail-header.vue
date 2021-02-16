<template>
  <div class="detail-header">
    <nuxt-link :to="localePath(`/main-${type}`)" class="detail-header--back font--tex">
      &lt;
    </nuxt-link>
    <h1 class="detail-header--title font--tex">
      {{ $t(`weblate.${type}.short`) }}
    </h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true
    }
  }
})
</script>
