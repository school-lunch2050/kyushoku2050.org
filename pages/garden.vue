<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <lunch-detail type="garden">
      <svg width="100%" height="100%" viewBox="0 0 3157 2500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <image class="illustration--image" width="3157" height="2500" href="/img/illustration/garden.webp" />
        <bubble-text
          id="garden.public_food"
          bubble="1474 829 1474 1024 1174.914062 1024 1174.914062 1099.5 1121.164062 1024 820 1024 820 829"
          :view-rect="{ x: 700, y: 794, width: 879, height: 611 }"
          :rect="{ x: 820, y: 829, width: 654, height: 195 }"
        />
        <bubble-text
          id="garden.food_literacy"
          bubble="698 1200 698 997 115.367188 997 115.367188 913.429688 78.0546875 997 41 997 41 1200"
          :view-rect="{ x: 0, y: 344, width: 797, height: 1229 }"
          :rect="{ x: 41, y: 997, width: 657, height: 203 }"
        />
        <bubble-text
          id="garden.seed_banks"
          bubble="3044 248 3044 593 2339 593 2339 248"
          :view-rect="{ x: 2313, y: 223, width: 844, height: 755 }"
          :rect="{ x: 2339, y: 248, width: 705, height: 345 }"
        />
        <bubble-text
          id="garden.domestic_soveirnty"
          bubble="2393.64218 800.933775 2393.64218 1087.933775 1734.64218 1087.933775 1734.64218 800.933775"
          :view-rect="{ x: 1578, y: 600, width: 1579, height: 904 }"
          :rect="{ x: 1735, y: 801, width: 659, height: 287 }"
        />
        <bubble-text
          id="garden.permaculture"
          bubble="3147 1659.5 3147 1975.5 2510 1975.5 2510 1659.5"
          :view-rect="{ x: 1442, y: 1319, width: 1715, height: 679 }"
          :rect="{ x: 2510, y: 1660, width: 637, height: 315 }"
        />
        <bubble-text
          id="garden.vegan_diet"
          bubble="1353.886171 1844.5 1353.886171 1552.5 959.6484379999999 1552.5 975.5703120000001 1500.507812 911.0234370000001 1552.5 712.8861712 1552.5 712.8861712 1844.5"
          :view-rect="{ x: 653, y: 1273, width: 824, height: 592 }"
          :rect="{ x: 713, y: 1552.5, width: 641, height: 292 }"
        />
        <bubble-text
          id="garden.wasting_food"
          bubble="1659.4921880000002 1856.9181721 1659.4921880000002 1933.621094 1684.90625 1981.1875 1635.953125 1939.235368 1059.4921875 1939.235368 1059.4921875 1856.4882812"
          :view-rect="{ x: 1037, y: 1757, width: 954, height: 313 }"
          :rect="{ x: 1059.5, y: 1856, width: 601, height: 85 }"
        />
        <bubble-text
          id="garden.regionally_diverse"
          bubble="49 2063.488281 707.882813 2063.488281 707.882813 2207.992188 756.1875 2247.5 707.882812 2280.117188 707.882813 2445.296875 49 2445.488281"
          :view-rect="{ x: 23, y: 1852, width: 1245, height: 618 }"
          :rect="{ x: 49.5, y: 2063.488281, width: 658, height: 382 }"
        />
        <bubble-text
          id="garden.preserving"
          bubble="1918.49219 2247.5 1918.49219 2071.5 1410.9140630000002 2071.5 1349.320313 2008.78125 1368.085938 2071.5 1259.492187 2071.5 1259.492187 2247.5"
          :view-rect="{ x: 869, y: 1924, width: 1071, height: 339 }"
          :rect="{ x: 1259.5, y: 2071.5, width: 659, height: 176 }"
        />
        <bubble-text
          id="garden.no_pesticides"
          bubble="2025.010622 2290.6079959 2025.010622 2423.607996 1386.010622 2423.607996 1386.010622 2290.6079959"
          :view-rect="{ x: 1218, y: 2228, width: 838, height: 272 }"
          :rect="{ x: 1386, y: 2290.6079959, width: 639, height: 133 }"
        />
        <bubble-text
          id="garden.algae_package"
          bubble="2732 2250 2732 2389 2074 2389 2074 2250"
          :view-rect="{ x: 1921, y: 1921, width: 1236, height: 579 }"
          :rect="{ x: 2074, y: 2250, width: 658, height: 139 }"
        />
      </svg>
    </lunch-detail>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageGarden',
  layout: 'detail'
})
</script>
