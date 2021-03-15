import { toPx } from '~/assets/helpers'

export type Ingredient =
  'milk' |
  'chicken' |
  'chicken_veggies' |
  'coffee_jelly' |
  'fish_soup' |
  'fish_soup_tofu' |
  'fish_soup_onion' |
  'rice' |
  'glaberrima_rice' |
  'autonoma_soup' |
  'soylent' |
  'banana' |
  'fruit_dumplings' |
  'cricket_tofu' |
  'burdock_chips' |
  'sprouts' |
  'instant_soup' |
  'fish_sausage' |
  'pudding' |
  'nutrition_noodle' |
  'supplements' |
  'milk_cube' |
  'gu_gu_bread' |
  'potato_porridge' |
  'chestnut' |
  'milk_bubble' |
  'satoyama_soup' |
  'proteins_fish' |
  'proteins_meat' |
  'proteins' |
  'fresh_salad'

interface BaseData {
  x: number
  y: number
  r: number
  rx?: number
  ry?: number
}

const baseData: Record<Ingredient, BaseData> = {
  milk: {
    x: 828,
    y: 111,
    r: 245,
    rx: 20,
    ry: 155
  },
  chicken: {
    x: 1336,
    y: 627,
    r: 180,
    ry: -10
  },
  chicken_veggies: {
    x: 1259,
    y: 468,
    r: 150
  },
  coffee_jelly: {
    x: 1740,
    y: 305,
    r: 160
  },
  fish_soup: {
    x: 813,
    y: 712,
    r: 220
  },
  fish_soup_tofu: {
    x: 813,
    y: 723,
    r: 80
  },
  fish_soup_onion: {
    x: 869,
    y: 660,
    r: 80
  },
  rice: {
    x: 1843,
    y: 596,
    r: 275,
    ry: 110,
    rx: -45
  },
  glaberrima_rice: {
    x: 911,
    y: 182,
    r: 240,
    ry: 2
  },
  autonoma_soup: {
    x: 1341,
    y: 186,
    r: 200
  },
  soylent: {
    x: 1714,
    y: 127,
    r: 185,
    rx: -25,
    ry: 11
  },
  banana: {
    x: 908,
    y: 700,
    r: 190,
    rx: 100,
    ry: 180
  },
  fruit_dumplings: {
    x: 1130,
    y: 590,
    r: 130
  },
  cricket_tofu: {
    x: 1523,
    y: 497,
    r: 180,
    rx: -60,
    ry: 50
  },
  burdock_chips: {
    x: 1320,
    y: 857,
    r: 160
  },
  sprouts: {
    x: 1625,
    y: 861,
    r: 170,
    ry: -45,
    rx: -10
  },
  instant_soup: {
    x: 913,
    y: 265,
    r: 230
  },
  fish_sausage: {
    x: 873,
    y: 491,
    r: 220
  },
  pudding: {
    x: 1305,
    y: 300,
    r: 175,
    ry: 10
  },
  nutrition_noodle: {
    x: 1762,
    y: 258,
    r: 250,
    ry: 20,
    rx: -10
  },
  supplements: {
    x: 759,
    y: 749,
    r: 200
  },
  milk_cube: {
    x: 790,
    y: 885,
    r: 70
  },
  gu_gu_bread: {
    x: 1341,
    y: 707,
    r: 340,
    rx: 20,
    ry: 20
  },
  potato_porridge: {
    x: 782,
    y: 264,
    r: 235
  },
  chestnut: {
    x: 1144,
    y: 271,
    r: 140
  },
  milk_bubble: {
    x: 1396,
    y: 293,
    r: 100
  },
  satoyama_soup: {
    x: 1745,
    y: 248,
    r: 220
  },
  proteins_fish: {
    x: 1192,
    y: 467,
    r: 200
  },
  proteins_meat: {
    x: 1253,
    y: 763,
    r: 200
  },
  proteins: {
    x: 732,
    y: 743,
    r: 280
  },
  fresh_salad: {
    x: 1764,
    y: 685,
    r: 270
  }
}

export interface IngredientData extends BaseData {
  key: Ingredient
  iconStyle: string // Css style for when to show this ingredient as an icon in the bubble-info
  markerStyle: string // Css style for the marker to be shown when being near a lunch item
}

function prepareForHTML (ingredientKey: string, baseData: BaseData): IngredientData {
  const place = {
    rx: 0,
    ry: 0,
    ...baseData
  }
  const webpSize = {
    width: 2636, /* found in the stylesheet for the lunch display, used for placing the lunch items */
    height: (2636 / 3874 * 1926)
  }
  const imageSize = 90 /* found in the stylesheet for the ingredient-icon! */
  const scale = imageSize / (place.r * 2)
  const markerStyle =
    `left: ${toPx(place.x)};` +
    `top: ${toPx(place.y)}`
  const iconStyle =
    `background-position: ${-(place.x + place.rx - place.r) * scale}em ${-(place.y + place.ry - place.r) * scale}em; ` +
    `background-size: ${webpSize.width * scale}em ${webpSize.height * scale}em`

  return {
    ...baseData,
    key: ingredientKey as Ingredient,
    iconStyle,
    markerStyle
  }
}

export const ingredients = Object
  .entries(baseData)
  .reduce((mapped, [ingredientKey, baseData]) => {
    mapped[ingredientKey as Ingredient] = prepareForHTML(ingredientKey, baseData)
    return mapped
  }, {} as Record<Ingredient, IngredientData>)
