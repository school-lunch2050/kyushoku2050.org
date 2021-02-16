<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <lunch-detail type="cosmopolitan">
      <svg width="100%" height="100%" viewBox="0 0 3157 2500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <image class="illustration--image" width="3157" height="2500" href="/img/illustration/cosmopolitan.webp" />
        <bubble-text
          id="cosmopolitan.rice"
          bubble="2076 343 2775 343 2775 597 2076 597 2076 577.6992190000001 2017.6933589999999 526.675781 2076 539.521484"
          :view-rect="{ x: 1424, y: 312, width: 1381, height: 396 }"
          :rect="{ x: 2076, y: 343, width: 699, height: 254 }"
        />
        <bubble-text
          id="cosmopolitan.fruit"
          bubble="91 824 91 452 981 452 981 757.5 1087.39844 905.0859379999999 926.640625 809"
          :view-rect="{ x: 0, y: 428, width: 2073, height: 1138 }"
          :rect="{ x: 91, y: 452, width: 890, height: 357 }"
        />
        <bubble-text
          id="cosmopolitan.influencers"
          :bubble="{ x: 234, y: 1604, width: 775, height: 197 }"
          :view-rect="{ x: 0, y: 1576, width: 1042, height: 924 }"
          :rect="{ x: 234, y: 1604, width: 775, height: 197 }"
        />
        <bubble-text
          id="cosmopolitan.agreements"
          :bubble="{ x: 962, y: 2081, width: 713, height: 311}"
          :view-rect="{ x: 889, y: 1955, width: 1870, height: 545 }"
          :rect="{ x: 962, y: 2081, width: 713, height: 311 }"
        />
        <bubble-text
          id="cosmopolitan.fisheries"
          :bubble="{ x: 2343, y: 1387, width: 738, height: 255 }"
          :view-rect="{ x: 1856, y: 1300, width: 1301, height: 623 }"
          :rect="{ x: 2343, y: 1387, width: 738, height: 255 }"
        />
        <bubble-text
          id="cosmopolitan.ethical_consumption"
          :view-rect="{ x: 970, y: 1537, width: 988, height: 508 }"
          :bubble="{ x: 1204, y: 1714, width: 715, height: 262 }"
          :rect="{ x: 1204, y: 1714, width: 715, height: 262 }"
        />
        <bubble-text
          id="cosmopolitan.social_businesses"
          bubble="2283 620 3002 620 3002 780 2630.484375 780 2630.484375 856 2581.671875 780 2283 780"
          :view-rect="{ x: 2107, y: 593, width: 1050, height: 762 }"
          :rect="{ x: 2283, y: 620, width: 719, height: 160 }"
        />
      </svg>
    </lunch-detail>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageCosmopolitan',
  layout: 'detail'
})
</script>
