<template>
  <div class="cb-option">
    <text-box :key="title" class="cb-option--title font--tex" />
    <img :src="image" class="cb-option--image">
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
})
</script>
