<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <main-menu prev="/main" active selected="desperate">
      <img class="illustration--image" width="3157" height="2500" src="/img/illustration/desperate.webp">
      <text-box key="weblate.pages.desperate.full" class="illustration--title font--tex" x="550" y="40" width="1900" height="200" font-size="100" align="center" vertical-align="center" />
      <bubble-text
        key="desperate.mass_vegetables"
        bubble="2376 349 2376 523 2042.521 523 2049.28125 589 1951.913 523 1482 523 1482 349"
        :view-rect="{ x: 1430, y: 297, width: 1727, height: 857 }"
        :rect="{ x: 1482, y: 347, width: 893, height: 177 }"
        :font-size="{ en: 30, ja: 27, 'ja-simple': 31 }"
        padding="20px 43px"
      />
      <bubble-text
        key="desperate.insect_pollination"
        bubble="2976 1163 2977 1403 2276 1403 2276 1386.371 2106.472656 1448 2275.999656 1287.191 2276 1163"
        :view-rect="{ x: 1471, y: 864, width: 1612, height: 1026 }"
        :rect="{ x: 2277, y: 1161.5, width: 702, height: 243 }"
        :font-size="{ en: 26, ja: 23 }"
        padding="41px"
      />
      <bubble-text
        key="desperate.pesticide_resistant"
        bubble="715 1578 715 1739 771.970703 1761 715 1788.35 715 1927 37 1927 37 1578"
        :view-rect="{ x: 0, y: 1391, width: 1579, height: 584 }"
        :rect="{ x: 36, y: 1574, width: 680, height: 354 }"
        :font-size="{ en: 55, ja: 29, 'ja-simple': 42 }"
        padding="40px 30px"
      />
      <bubble-text
        key="desperate.weather_patterns"
        bubble="541.712891 2180.425781 578.387 2298.999781 1332 2299 1332 2472 476 2472 476 2299 505.037 2298.999781"
        :view-rect="{ x: 0, y: 1926.99999975, width: 1402, height: 573 }"
        :rect="{ x: 476.429688, y: 2299.3125, width: 855, height: 173 }"
        :font-size="{ en: 36, ja: 39, 'ja-simple': 32 }"
      />
      <bubble-text
        key="desperate.printed_product"
        bubble="3020 1563 3020 1918 2571.076 1918 2550.917969 1983.160156 2504.889 1918 2383 1918 2383 1563"
        :view-rect="{ x: 2324, y: 1487, width: 833, height: 725 }"
        :rect="{ x: 2383.4296875, y: 1563.3125, width: 637, height: 356 }"
        :font-size="{ en: 42, ja: 40, 'ja-simple': 32 }"
      />
      <bubble-text
        key="desperate.climate_change"
        bubble="1366.5 322.5 1366.5 577 834.975 577 793.081055 633.991211 793.081 577 696 577 696 322.5"
        :view-rect="{ x: 0, y: 236, width: 1438, height: 747 }"
        :rect="{ x: 696, y: 322.3125, width: 671, height: 254 }"
        font-size="32"
      />
      <bubble-text
        key="desperate.home_sprouts"
        bubble="1349.4 2120.3750005 1349.4 2333.3 1880.839844 2333.3 1960.351563 2326.212891 1960.351563 2310.792969 2030.2 2292.710938 1965.480469 2260.3 1965.480469 2114.5"
        :view-rect="{ x: 1308, y: 2079, width: 1849, height: 421 }"
        :rect="{ x: 1349.429688, y: 2114.3125005, width: 617, height: 219 }"
        font-size="37px"
        padding="25px"
      />
    </main-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageDesperate',
  key: route => route.fullPath
})
</script>
<style lang="css" scoped>
.illustration--title {
  color: white;
}
</style>
