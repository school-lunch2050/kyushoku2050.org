<template>
  <div class="lunch-item--marker font--tex" :style="markerStyle" tabindex="0">
    <svg class="lunch-item--line" viewBox="0 0 20 110" version="1.1">
      <circle fill="#00000088" cx="10" cy="100" r="9.5" />
      <line
        stroke-width="5"
        stroke="#00000088"
        x1="10"
        y1="0"
        x2="10"
        y2="100"
      />
      <circle fill="#fff" cx="10" cy="100" r="7.5" />
      <line
        stroke-width="3"
        stroke="#fff"
        x1="10"
        y1="0"
        x2="10"
        y2="100"
      />
    </svg>
    <div class="lunch-item--marker--info">
      <div class="lunch-item--marker--box">
        <text-box :key="`weblate.ingredients.${$vnode.key}.name`" class="lunch-item--marker--name" />
        <text-box :key="`weblate.ingredients.${$vnode.key}.source`" class="lunch-item--marker--source" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Ingredient, ingredients } from '../assets/ingredients'

export default Vue.extend({
  data () {
    return ingredients[this.$vnode.key as Ingredient]
  }
})
</script>
