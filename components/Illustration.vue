<template>
  <div class="illustration">
    <img v-if="isCosmopolitan" ref="main" svg-inline src="../assets/cosmopolitan.svg">
    <img v-if="isDesperate" ref="main" svg-inline src="../assets/desperate.svg">
    <img v-if="isGamble" ref="main" svg-inline src="../assets/gamble.svg">
    <img v-if="isGarden" ref="main" svg-inline src="../assets/garden.svg">
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

const types = ['gamble', 'cosmopolitan', 'desperate', 'garden'] as const

function isElement (elem: Vue | Element | Vue[] | Element[]): elem is Element {
  if (Array.isArray(elem)) {
    return false
  }
  return elem instanceof Node
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value as any)
    }
  },
  data () {
    return {
      isCosmopolitan: this.$props.type === 'cosmopolitan',
      isDesperate: this.$props.type === 'desperate',
      isGamble: this.$props.type === 'gamble',
      isGarden: this.$props.type === 'garden'
    }
  },
  mounted () {
    const { main } = this.$refs
    if (!isElement(main)) {
      return
    }
    console.log(main.querySelectorAll('svg > g > g'))
  }
})
</script>
