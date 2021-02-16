<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main>
      <lunch :type="type" />
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
