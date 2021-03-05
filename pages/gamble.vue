<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <main-menu prev="/main" active selected="gamble">
    <template #lunch>
      <lunch-item
        key="gu_gu_bread"
        x="1341"
        y="707"
      />
      <lunch-item
        key="instant_soup"
        x="913"
        y="225"
      />
      <lunch-item
        key="nutrition_noodle"
        x="1762"
        y="258"
      />
      <lunch-item
        key="pudding"
        x="1305"
        y="300"
      />
      <lunch-item
        key="fish_sausage"
        x="873"
        y="491"
      />
      <lunch-item
        key="milk_cube"
        x="799"
        y="867"
      />
      <lunch-item
        key="supplements"
        x="759"
        y="749"
      />
    </template>
    <template #illustration>
      <kyushoku-img class="illustration--image" width="3157" height="2500" src="illustration/gamble" fallback="jpg" />
      <text-box key="weblate.main.grid.hot" align="center center" class="illustration--weather--hot font--tex" />
      <text-box key="weblate.main.grid.far" align="center center" class="illustration--location font--tex" />
      <text-box key="weblate.pages.gamble.full" class="illustration--title font--tex" x="680" y="20" width="1915" height="180" font-size="100" align="center" vertical-align="center" />
      <bubble-text
        key="gamble.plantation_farms"
        bubble="1957 306 1957 580 1349 580 1363.78125 654 1262.49219 580 1037 580 1037 306"
        :view-rect="{ x: 0, y: 265, width: 2020, height: 759 }"
        :rect="{ x: 1037, y: 306, width: 920, height: 274 }"
        :font-size="{ en: 47, ja: 44 }"
      />
      <bubble-text
        key="gamble.daily_supplements"
        bubble="3024 441 3024 709 2687.8 709 2687.804687 774.4 2643.5625 709 2176 709 2176 441"
        :view-rect="{ x: 2021, y: 400, width: 1136, height: 565 }"
        :rect="{ x: 2176, y: 441, width: 848, height: 268 }"
        :font-size="{ en: 38, ja: 35, 'ja-simple': 38 }"
      />
      <bubble-text
        key="gamble.controlled_market"
        bubble="771.53125 1019.5 771.53125 1507.5 608.976562 1507.5 510.867187 1645.65625 525.5625 1507.5 58 1507.5 58 1019.5"
        :view-rect="{ x: 0, y: 996, width: 883, height: 1504 }"
        :rect="{ x: 58, y: 1019, width: 714, height: 489 }"
        :font-size="{ en: 43, ja: 43, 'ja-simple': 34 }"
        padding="25px 42px 10px 32px"
      />
      <bubble-text
        key="gamble.pesticide_regulations"
        bubble="1603.5 1024 1603.5 1408.5 1507.515625 1408.5 1446.4 1492 1422.875 1408.5 945 1408.5 945 1023.5"
        :view-rect="{ x: 840, y: 996, width: 1063, height: 807 }"
        :rect="{ x: 945, y: 1023, width: 658, height: 385 }"
        :font-size="{ en: 45, ja: 39, 'ja-simple': 34 }"
        padding="20px 30px"
      />
      <bubble-text
        key="gamble.daily_medication"
        bubble="2471 1024 2470.492188 1215.5 2003.578125 1215.5 2013.261719 1297.5 1943.832031 1215.5 1773.5 1215.5 1773.5 1023"
        :view-rect="{ x: 1710, y: 963, width: 1269, height: 549 }"
        :rect="{ x: 1773, y: 1023, width: 697, height: 193 }"
        :font-size="34"
      />
      <bubble-text
        key="gamble.lab_meat"
        bubble="3090.492188 1328 3090.492188 1484.5 2780.367188 1484.5 2751.367188 1547 2721.898438 1484.5 2605.5 1484.5 2605.5 1328.5"
        :view-rect="{ x: 2516, y: 1303, width: 641, height: 605 }"
        :rect="{ x: 2605, y: 1328, width: 485, height: 156 }"
        :font-size="32"
        padding="24px"
      />
      <bubble-text
        key="gamble.food_marketers"
        bubble="2475.492187 1456.5 2475.492187 1730.5 2378.742188 1730.5 2260.039062 1829 2303.609375 1730.5 1903 1730.5 1903 1456.5"
        :view-rect="{ x: 1603, y: 1435, width: 1054, height: 1065 }"
        :rect="{ x: 1899, y: 1456, width: 576, height: 274 }"
        :font-size="{ en: 33, ja: 29, 'ja-simple': 30 }"
        padding="33px"
      />
      <bubble-text
        key="gamble.stressed_conditions"
        bubble="1588 1803.6079959 1588.010622 2026.6 969.589844 2026.6 945 2068.644531 930.6445313 2026.6 883 2026.6 883 1803.6"
        :view-rect="{ x: 840, y: 1776, width: 807, height: 724 }"
        :rect="{ x: 885, y: 1803, width: 703, height: 223 }"
        :font-size="{ en: 23, ja: 26, 'ja-simple': 28 }"
      />
      <bubble-text
        key="gamble.rare_fresh_fruit"
        :bubble="{ x: 2473, y: 2198, width: 670, height: 141 }"
        :view-rect="{ x: 2434, y: 1855, width: 723, height: 645 }"
        :rect="{ x: 2473, y: 2198, width: 670, height: 141 }"
        :font-size="35"
      />
    </template>
  </main-menu>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageGamble',
  key: route => route.fullPath
})
</script>
<style lang="css" scoped>
.illustration--title {
  color: white;
}
</style>
