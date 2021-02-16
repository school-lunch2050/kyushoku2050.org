<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <lunch :type="type" />
      <illustration :type="type" />
    </main>
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
