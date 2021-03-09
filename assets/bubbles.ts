import { Ingredient, IngredientData, ingredients } from './ingredients'

export type Bubble =
  'fruit' |
  'rice' |
  'influencers' |
  'agreements' |
  'fisheries' |
  'ethical_consumption' |
  'social_businesses' |
  'mass_vegetables' |
  'insect_pollination' |
  'pesticide_resistant' |
  'weather_patterns' |
  'printed_product' |
  'climate_change' |
  'home_sprouts' |
  'plantation_farms' |
  'daily_supplements' |
  'controlled_market' |
  'pesticide_regulations' |
  'daily_medication' |
  'lab_meat' |
  'food_marketers' |
  'stressed_conditions' |
  'rare_fresh_fruit' |
  'public_food' |
  'food_literacy' |
  'seed_banks' |
  'domestic_soveirnty' |
  'permaculture' |
  'vegan_diets' |
  'wasting_food' |
  'regionally_diverse' |
  'preserving' |
  'limited_trade' |
  'no_pesticides'

export type Language = 'en' | 'ja' | 'ja-simple'
export interface Rect {
  x: number,
  y: number,
  width: number,
  height: number
}

interface BaseData {
  bubble: string | Rect,
  viewRect: Rect & { padding?: { left?: number, top?: number, bottom?: number, right?: number }},
  rect: Rect,
  fontSize: number | Record<Language, number>,
  padding?: number | string,
  ingredients: Ingredient[]
}

export interface BubbleData extends Omit<BaseData, 'ingredients'> {
  id: Bubble,
  fontSize: Record<Language, number>
  ingredients: IngredientData[]
}

export const bubbles = Object.entries({
  fruit: {
    bubble: '91 824 91 452 981 452 981 757.5 1087.39844 905.0859379999999 926.640625 809',
    viewRect: { x: 0, y: 428, width: 2073, height: 1138 },
    rect: { x: 91, y: 452, width: 890, height: 357 },
    fontSize: { en: 40, ja: 39, 'ja-simple': 40 },
    ingredients: []
  },
  rice: {
    bubble: '2076 343 2775 343 2775 597 2076 597 2076 577.6992190000001 2017.6933589999999 526.675781 2076 539.521484',
    viewRect: { x: 1424, y: 312, width: 1381, height: 396 },
    rect: { x: 2076, y: 343, width: 699, height: 254 },
    fontSize: { en: 51, ja: 52, 'ja-simple': 31 },
    ingredients: ['rice']
  },
  influencers: {
    bubble: { x: 240, y: 1604, width: 775, height: 197 },
    viewRect: { x: 0, y: 1576, width: 1042, height: 924 },
    rect: { x: 240, y: 1604, width: 775, height: 197 },
    fontSize: { en: 36, ja: 34, 'ja-simple': 40 },
    ingredients: ['chicken_veggies', 'fish_soup']
  },
  agreements: {
    bubble: { x: 963, y: 2081, width: 710, height: 311 },
    viewRect: { x: 889, y: 1955, width: 1870, height: 545 },
    rect: { x: 963, y: 2081, width: 710, height: 311 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 35 },
    padding: '25px 14px 8px 37px',
    ingredients: ['milk', 'chicken']
  },
  fisheries: {
    bubble: { x: 2343, y: 1387, width: 738, height: 255 },
    viewRect: { x: 1856, y: 1300, width: 1301, height: 623 },
    rect: { x: 2343, y: 1387, width: 738, height: 255 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 33 },
    padding: '10px 20px 10px 57px',
    ingredients: ['fish_soup_tofu']
  },
  ethical_consumption: {
    bubble: { x: 1204, y: 1714, width: 715, height: 262 },
    viewRect: { x: 970, y: 1537, width: 988, height: 508 },
    rect: { x: 1204, y: 1714, width: 715, height: 262 },
    fontSize: { en: 36, ja: 27, 'ja-simple': 27 },
    padding: '18px 27px 0px 45px',
    ingredients: ['coffee_jelly']
  },
  social_businesses: {
    bubble: '2283 620 3002 620 3002 780 2630.484375 780 2630.484375 856 2581.671875 780 2283 780',
    viewRect: { x: 2107, y: 593, width: 1050, height: 762 },
    rect: { x: 2283, y: 627, width: 719, height: 150 },
    fontSize: { en: 29, ja: 24, 'ja-simple': 24 },
    padding: '12px 15px 10px 27px',
    ingredients: ['fish_soup_onion']
  },
  mass_vegetables: {
    bubble: '2376 349 2376 523 2042.521 523 2049.28125 589 1951.913 523 1482 523 1482 349',
    viewRect: { x: 1430, y: 297, width: 1727, height: 857 },
    rect: { x: 1482, y: 347, width: 893, height: 177 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 31 },
    padding: '20px 43px',
    ingredients: ['autonoma_soup']
  },
  insect_pollination: {
    bubble: '2976 1163 2977 1403 2276 1403 2276 1386.371 2106.472656 1448 2275.999656 1287.191 2276 1163',
    viewRect: { x: 1471, y: 864, width: 1612, height: 1026 },
    rect: { x: 2277, y: 1161.5, width: 702, height: 243 },
    fontSize: { en: 26, ja: 23, 'ja-simple': 23 },
    padding: 41,
    ingredients: ['fruit_dumplings']
  },
  pesticide_resistant: {
    bubble: '715 1578 715 1739 771.970703 1761 715 1788.35 715 1927 37 1927 37 1578',
    viewRect: { x: 0, y: 1391, width: 1579, height: 584 },
    rect: { x: 36, y: 1574, width: 680, height: 354 },
    fontSize: { en: 55, ja: 29, 'ja-simple': 42 },
    padding: '40px 30px',
    ingredients: ['cricket_tofu']
  },
  weather_patterns: {
    bubble: '541.712891 2180.425781 578.387 2298.999781 1332 2299 1332 2472 476 2472 476 2299 505.037 2298.999781',
    viewRect: { x: 0, y: 1926.99999975, width: 1402, height: 573 },
    rect: { x: 476.429688, y: 2299.3125, width: 855, height: 173 },
    fontSize: { en: 36, ja: 39, 'ja-simple': 32 },
    ingredients: ['glaberrima_rice']
  },
  printed_product: {
    bubble: '3020 1563 3020 1918 2571.076 1918 2550.917969 1983.160156 2504.889 1918 2383 1918 2383 1563',
    viewRect: { x: 2324, y: 1487, width: 833, height: 725 },
    rect: { x: 2383.4296875, y: 1563.3125, width: 637, height: 356 },
    fontSize: { en: 42, ja: 40, 'ja-simple': 32 },
    ingredients: ['burdock_chips']
  },
  climate_change: {
    bubble: '1366.5 322.5 1366.5 577 834.975 577 793.081055 633.991211 793.081 577 696 577 696 322.5',
    viewRect: { x: 0, y: 236, width: 1438, height: 747 },
    rect: { x: 696, y: 322.3125, width: 671, height: 254 },
    fontSize: 32,
    ingredients: ['banana']
  },
  home_sprouts: {
    bubble: '1349.4 2120.3750005 1349.4 2333.3 1880.839844 2333.3 1960.351563 2326.212891 1960.351563 2310.792969 2030.2 2292.710938 1965.480469 2260.3 1965.480469 2114.5',
    viewRect: { x: 1308, y: 2079, width: 1849, height: 421 },
    rect: { x: 1349.429688, y: 2114.3125005, width: 617, height: 219 },
    fontSize: 37,
    padding: 25,
    ingredients: ['soylent']
  },
  plantation_farms: {
    bubble: '1957 306 : 957 580 1349 580 1363.78125 654 1262.49219 580 1037 580 1037 306',
    viewRect: { x: 0, y: 265, width: 2020, height: 759 },
    rect: { x: 1037, y: 306, width: 920, height: 274 },
    fontSize: { en: 47, ja: 44, 'ja-simple': 44 },
    ingredients: []
  },
  daily_supplements: {
    bubble: '3024 441 3024 709 2687.8 709 2687.804687 774.4 2643.5625 709 2176 709 2176 441',
    viewRect: { x: 2021, y: 400, width: 1136, height: 565 },
    rect: { x: 2176, y: 441, width: 848, height: 268 },
    fontSize: { en: 38, ja: 35, 'ja-simple': 38 },
    ingredients: ['supplements']
  },
  controlled_market: {
    bubble: '771.53125 1019.5 771.53125 1507.5 608.976562 1507.5 510.867187 1645.65625 525.5625 1507.5 58 1507.5 58 1019.5',
    viewRect: { x: 0, y: 996, width: 883, height: 1504 },
    rect: { x: 58, y: 1019, width: 714, height: 489 },
    fontSize: { en: 43, ja: 43, 'ja-simple': 34 },
    padding: '25px 42px 10px 32px',
    ingredients: ['nutrition_noodle']
  },
  pesticide_regulations: {
    bubble: '1603.5 1024 1603.5 1408.5 1507.515625 1408.5 1446.4 1492 1422.875 1408.5 945 1408.5 945 1023.5',
    viewRect: { x: 840, y: 996, width: 1063, height: 807 },
    rect: { x: 945, y: 1023, width: 658, height: 385 },
    fontSize: { en: 45, ja: 39, 'ja-simple': 34 },
    padding: '20px 30px',
    ingredients: []
  },
  daily_medication: {
    bubble: '2471 1024 2470.492188 1215.5 2003.578125 1215.5 2013.261719 1297.5 1943.832031 1215.5 1773.5 1215.5 1773.5 1023',
    viewRect: { x: 1710, y: 963, width: 1269, height: 549 },
    rect: { x: 1773, y: 1023, width: 697, height: 193 },
    fontSize: 34,
    ingredients: ['milk_cube']
  },
  lab_meat: {
    bubble: '3090.492188 1328 3090.492188 1484.5 2780.367188 1484.5 2751.367188 1547 2721.898438 1484.5 2605.5 1484.5 2605.5 1328.5',
    viewRect: { x: 2516, y: 1303, width: 641, height: 605 },
    rect: { x: 2605, y: 1328, width: 485, height: 156 },
    fontSize: 32,
    padding: 24,
    ingredients: ['fish_sausage']
  },
  food_marketers: {
    bubble: '2475.492187 1456.5 2475.492187 1730.5 2378.742188 1730.5 2260.039062 1829 2303.609375 1730.5 1903 1730.5 1903 1456.5',
    viewRect: { x: 1603, y: 1435, width: 1054, height: 1065 },
    rect: { x: 1899, y: 1456, width: 576, height: 274 },
    fontSize: { en: 33, ja: 29, 'ja-simple': 30 },
    padding: 33,
    ingredients: ['gu_gu_bread']
  },
  stressed_conditions: {
    bubble: '1588 1803.6079959 1588.010622 2026.6 969.589844 2026.6 945 2068.644531 930.6445313 2026.6 883 2026.6 883 1803.6',
    viewRect: { x: 840, y: 1776, width: 807, height: 724 },
    rect: { x: 885, y: 1803, width: 703, height: 223 },
    fontSize: { en: 23, ja: 26, 'ja-simple': 28 },
    ingredients: ['instant_soup']
  },
  rare_fresh_fruit: {
    bubble: { x: 2473, y: 2198, width: 670, height: 141 },
    viewRect: { x: 2434, y: 1855, width: 723, height: 645 },
    rect: { x: 2473, y: 2198, width: 670, height: 141 },
    fontSize: 35,
    ingredients: ['pudding']
  },
  public_food: {
    bubble: '1474 829 1474 1024 1175 1024 1175 1099.5 1121.164062 1024 820 1024 820 829',
    viewRect: { x: 700, y: 794, width: 879, height: 611 },
    rect: { x: 820, y: 829, width: 654, height: 195 },
    fontSize: { en: 32, ja: 28, 'ja-simple': 30 },
    ingredients: ['fresh_salad']
  },
  food_literacy: {
    bubble: '698 1200 698 997 115.367188 997 115.367188 913.429688 78 997 41 997 41 1200',
    viewRect: { x: 0, y: 344, width: 797, height: 1229 },
    rect: { x: 41, y: 997, width: 657, height: 203 },
    fontSize: { en: 39, ja: 33, 'ja-simple': 33 },
    ingredients: ['satoyama_soup']
  },
  seed_banks: {
    bubble: '3044 248 3044 593 2339 593 2339 248',
    viewRect: { x: 1580, y: 223, width: 1550, height: 755 },
    rect: { x: 2339, y: 248, width: 705, height: 345 },
    fontSize: { en: 36, ja: 28, 'ja-simple': 29 },
    padding: 37,
    ingredients: ['proteins', 'proteins_meat', 'proteins_fish']
  },
  domestic_soveirnty: {
    bubble: '2394 801 2394 1088 1735 1088 1735 801',
    viewRect: { x: 1578, y: 600, width: 1579, height: 904 },
    rect: { x: 1735, y: 801, width: 659, height: 287 },
    fontSize: 30,
    padding: 40,
    ingredients: ['potato_porridge']
  },
  permaculture: {
    bubble: '3147 1659.5 3147 1975.5 2510 1975.5 2510 1659.5',
    viewRect: { x: 1442, y: 1319, width: 1715, height: 679 },
    rect: { x: 2510, y: 1660, width: 637, height: 315 },
    fontSize: { en: 32, ja: 29, 'ja-simple': 29 },
    padding: 40,
    ingredients: ['chestnut']
  },
  vegan_diets: {
    bubble: '1354 1844.5 1354 1552.5 959.6 1552.5 975.5 1500.5 911 1552.5 713 1552.5 713 1844.5',
    viewRect: { x: 653, y: 1273, width: 824, height: 592 },
    rect: { x: 713, y: 1552.5, width: 641, height: 292 },
    fontSize: { en: 44, ja: 45, 'ja-simple': 29 },
    ingredients: ['proteins']
  },
  wasting_food: {
    bubble: '1659.5 1856.9181721 1659.5 1933.621094 1684.90625 1981.1875 1635.953125 1939.235368 1059.4921875 1939.235368 1059.4921875 1856.4882812',
    viewRect: { x: 1037, y: 1757, width: 954, height: 313 },
    rect: { x: 1059.5, y: 1856, width: 601, height: 85 },
    fontSize: { en: 23, ja: 18, 'ja-simple': 21 },
    padding: '20px 31px',
    ingredients: ['fresh_salad']
  },
  regionally_diverse: {
    bubble: '49 2063.488281 707.882813 2063.488281 707.882813 2207.992188 756.1875 2247.5 707.882812 2280.117188 707.882813 2445.296875 49 2445.488281',
    viewRect: { x: 23, y: 1852, width: 1245, height: 618 },
    rect: { x: 49.5, y: 2063.488281, width: 658, height: 382 },
    fontSize: { en: 45, ja: 39, 'ja-simple': 41 },
    ingredients: ['potato_porridge']
  },
  preserving: {
    bubble: '1918.49219 2247.5 1918.49219 2071.5 1410.9140630000002 2071.5 1349.320313 2008.78125 1368.085938 2071.5 1259.492187 2071.5 1259.492187 2247.5',
    viewRect: { x: 869, y: 1924, width: 1071, height: 339 },
    rect: { x: 1259.5, y: 2071.5, width: 659, height: 176 },
    fontSize: { en: 33, ja: 31, 'ja-simple': 32 },
    ingredients: ['fresh_salad']
  },
  limited_trade: {
    bubble: '2732 2250 2732 2389 2074 2389 2074 2250',
    viewRect: { x: 1921, y: 1921, width: 1236, height: 579 },
    rect: { x: 2074, y: 2250, width: 658, height: 139 },
    fontSize: { en: 21, ja: 21, 'ja-simple': 28 },
    padding: 20,
    ingredients: ['milk_bubble']
  },
  no_pesticides: {
    bubble: '2025.010622 2290.6079959 2025.010622 2423.607996 1386.010622 2423.607996 1386.010622 2290.6079959',
    viewRect: { x: 1218, y: 2228, width: 838, height: 272 },
    rect: { x: 1386, y: 2290.6079959, width: 639, height: 133 },
    fontSize: { en: 33, ja: 23, 'ja-simple': 29 },
    padding: '20px 46px',
    ingredients: []
  }
} as Record<Bubble, BaseData>).reduce((mapped, [bubbleKey, baseData]) => {
  let { fontSize } = baseData
  if (typeof fontSize === 'number') {
    fontSize = {
      en: fontSize,
      ja: fontSize,
      'ja-simple': fontSize
    }
  }
  const bubbleIngredients = baseData.ingredients.map(ingredient => ingredients[ingredient])
  let padding = {} // { bottom: 100 /* height of css class .bubble-info */ }
  mapped[bubbleKey as Bubble] = {
    ...baseData,
    viewRect: {
      ...baseData.viewRect,
      padding
    },
    id: bubbleKey as Bubble,
    fontSize,
    ingredients: bubbleIngredients
  }
  return mapped
}, {} as Record<Bubble, BubbleData>)
