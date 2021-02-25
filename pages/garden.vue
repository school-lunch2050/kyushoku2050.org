<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <main-menu prev="/main" active selected="garden">
      <img class="illustration--image" width="3157" height="2500" src="/img/illustration/garden.webp">
      <text-box key="weblate.pages.garden.full" class="illustration--title font--tex" x="680" y="20" width="1915" height="180" font-size="100" align="center" vertical-align="center" />
      <bubble-text
        key="garden.public_food"
        bubble="1474 829 1474 1024 1175 1024 1175 1099.5 1121.164062 1024 820 1024 820 829"
        :view-rect="{ x: 700, y: 794, width: 879, height: 611 }"
        :rect="{ x: 820, y: 829, width: 654, height: 195 }"
        :font-size="{ en: 32, ja: 28, 'ja-simple': 30 }"
      />
      <bubble-text
        key="garden.food_literacy"
        bubble="698 1200 698 997 115.367188 997 115.367188 913.429688 78 997 41 997 41 1200"
        :view-rect="{ x: 0, y: 344, width: 797, height: 1229 }"
        :rect="{ x: 41, y: 997, width: 657, height: 203 }"
        :font-size="{ en: 39, ja: 33 }"
      />
      <bubble-text
        key="garden.seed_banks"
        bubble="3044 248 3044 593 2339 593 2339 248"
        :view-rect="{ x: 1580, y: 223, width: 1550, height: 755 }"
        :rect="{ x: 2339, y: 248, width: 705, height: 345 }"
        :font-size="{ en: 36, ja: 28, 'ja-simple': 29 }"
        padding="37px"
      />
      <bubble-text
        key="garden.domestic_soveirnty"
        bubble="2394 801 2394 1088 1735 1088 1735 801"
        :view-rect="{ x: 1578, y: 600, width: 1579, height: 904 }"
        :rect="{ x: 1735, y: 801, width: 659, height: 287 }"
        :font-size="30"
        padding="40px"
      />
      <bubble-text
        key="garden.permaculture"
        bubble="3147 1659.5 3147 1975.5 2510 1975.5 2510 1659.5"
        :view-rect="{ x: 1442, y: 1319, width: 1715, height: 679 }"
        :rect="{ x: 2510, y: 1660, width: 637, height: 315 }"
        :font-size="{ en: 32, ja: 29 }"
        padding="40px"
      />
      <bubble-text
        key="garden.vegan_diets"
        bubble="1354 1844.5 1354 1552.5 959.6 1552.5 975.5 1500.5 911 1552.5 713 1552.5 713 1844.5"
        :view-rect="{ x: 653, y: 1273, width: 824, height: 592 }"
        :rect="{ x: 713, y: 1552.5, width: 641, height: 292 }"
        :font-size="{ en: 44, ja: 45, 'ja-simple': 29 }"
      />
      <bubble-text
        key="garden.wasting_food"
        bubble="1659.5 1856.9181721 1659.5 1933.621094 1684.90625 1981.1875 1635.953125 1939.235368 1059.4921875 1939.235368 1059.4921875 1856.4882812"
        :view-rect="{ x: 1037, y: 1757, width: 954, height: 313 }"
        :rect="{ x: 1059.5, y: 1856, width: 601, height: 85 }"
        :font-size="{ en: 23, ja: 18, 'ja-simple': 21 }"
        padding="20px 31px"
      />
      <bubble-text
        key="garden.regionally_diverse"
        bubble="49 2063.488281 707.882813 2063.488281 707.882813 2207.992188 756.1875 2247.5 707.882812 2280.117188 707.882813 2445.296875 49 2445.488281"
        :view-rect="{ x: 23, y: 1852, width: 1245, height: 618 }"
        :rect="{ x: 49.5, y: 2063.488281, width: 658, height: 382 }"
        :font-size="{ en: 45, ja: 39, 'ja-simple': 41 }"
      />
      <bubble-text
        key="garden.preserving"
        bubble="1918.49219 2247.5 1918.49219 2071.5 1410.9140630000002 2071.5 1349.320313 2008.78125 1368.085938 2071.5 1259.492187 2071.5 1259.492187 2247.5"
        :view-rect="{ x: 869, y: 1924, width: 1071, height: 339 }"
        :rect="{ x: 1259.5, y: 2071.5, width: 659, height: 176 }"
        :font-size="{ en: 33, ja: 31, 'ja-simple': 32 }"
      />
      <bubble-text
        key="garden.limited_trade"
        bubble="2732 2250 2732 2389 2074 2389 2074 2250"
        :view-rect="{ x: 1921, y: 1921, width: 1236, height: 579 }"
        :rect="{ x: 2074, y: 2250, width: 658, height: 139 }"
        :font-size="{ en: 21, ja: 21, 'ja-simple': 28 }"
        padding="20px"
      />
      <bubble-text
        key="garden.no_pesticides"
        bubble="2025.010622 2290.6079959 2025.010622 2423.607996 1386.010622 2423.607996 1386.010622 2290.6079959"
        :view-rect="{ x: 1218, y: 2228, width: 838, height: 272 }"
        :rect="{ x: 1386, y: 2290.6079959, width: 639, height: 133 }"
        :font-size="{ en: 33, ja: 23, 'ja-simple': 29 }"
        padding="20px 46px"
      />
    </main-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageGarden',
  key: route => route.fullPath
})
</script>
