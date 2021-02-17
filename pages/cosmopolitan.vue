<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <lunch-detail type="cosmopolitan">
      <img class="illustration--image" width="3157" height="2500" src="/img/illustration/cosmopolitan.webp">
      <text-box key="weblate.cosmopolitan.title" x="550" y="70" width="2000" height="180" font-size="100" class="font--tex" align="center" vertical-align="center" />
      <bubble-text
        key="cosmopolitan.fruit"
        bubble="91 824 91 452 981 452 981 757.5 1087.39844 905.0859379999999 926.640625 809"
        :view-rect="{ x: 0, y: 428, width: 2073, height: 1138 }"
        :rect="{ x: 91, y: 452, width: 890, height: 357 }"
      />
      <bubble-text
        key="cosmopolitan.rice"
        bubble="2076 343 2775 343 2775 597 2076 597 2076 577.6992190000001 2017.6933589999999 526.675781 2076 539.521484"
        :view-rect="{ x: 1424, y: 312, width: 1381, height: 396 }"
        :rect="{ x: 2076, y: 343, width: 699, height: 254 }"
      />
      <bubble-text
        key="cosmopolitan.influencers"
        :bubble="{ x: 240, y: 1604, width: 775, height: 197 }"
        :view-rect="{ x: 0, y: 1576, width: 1042, height: 924 }"
        :rect="{ x: 240, y: 1604, width: 775, height: 197 }"
      />
      <bubble-text
        key="cosmopolitan.agreements"
        :bubble="{ x: 962, y: 2081, width: 713, height: 311}"
        :view-rect="{ x: 889, y: 1955, width: 1870, height: 545 }"
        :rect="{ x: 962, y: 2081, width: 713, height: 311 }"
      />
      <bubble-text
        key="cosmopolitan.fisheries"
        :bubble="{ x: 2343, y: 1387, width: 738, height: 255 }"
        :view-rect="{ x: 1856, y: 1300, width: 1301, height: 623 }"
        :rect="{ x: 2343, y: 1387, width: 738, height: 255 }"
      />
      <bubble-text
        key="cosmopolitan.ethical_consumption"
        :bubble="{ x: 1204, y: 1714, width: 715, height: 262 }"
        :view-rect="{ x: 970, y: 1537, width: 988, height: 508 }"
        :rect="{ x: 1204, y: 1714, width: 715, height: 262 }"
      />
      <bubble-text
        key="cosmopolitan.social_businesses"
        bubble="2283 620 3002 620 3002 780 2630.484375 780 2630.484375 856 2581.671875 780 2283 780"
        :view-rect="{ x: 2107, y: 593, width: 1050, height: 762 }"
        :rect="{ x: 2283, y: 620, width: 719, height: 160 }"
      />
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
