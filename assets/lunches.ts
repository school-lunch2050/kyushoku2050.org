import { Ingredient, IngredientData, ingredients } from './ingredients'
import { Bubble, BubbleData, bubbles } from './bubbles'

export type Lunch =
  'cosmopolitan' |
  'desperate' |
  'gamble' |
  'garden'

interface Style {
  fontSize?: number
  align?: string
  verticalAlign?: string
  x?: number
  y?: number
  width?: number
  height?: number
}
type Weather = 'warm' | 'hot'
type Location = 'near' | 'far'

interface BaseData {
  ingredients: Array<Ingredient>
  bubbles: Array<Bubble>
  title: Style
  weather: {
    type: Weather,
    style?: Style
  },
  location: {
    type: Location,
    style?: Style
  }
}

const baseData: Record<Lunch, BaseData> = {
  cosmopolitan: {
    title: { x: 550, y: 70, width: 2000, height: 180 },
    weather: { type: 'warm', style: { x: 120, y: 20, width: 200 } },
    location: { type: 'far' },
    ingredients: ['milk', 'chicken', 'chicken_veggies', 'coffee_jelly', 'fish_soup', 'fish_soup_tofu', 'fish_soup_onion', 'rice'],
    bubbles: ['fruit', 'rice', 'influencers', 'agreements', 'fisheries', 'ethical_consumption', 'social_businesses']
  },
  desperate: {
    title: { x: 550, y: 40, width: 1900, height: 200 },
    weather: { type: 'hot' },
    location: { type: 'near', style: { x: 2760, y: 45, width: 355 } },
    ingredients: ['glaberrima_rice', 'autonoma_soup', 'soylent', 'banana', 'fruit_dumplings', 'cricket_tofu', 'burdock_chips', 'sprouts'],
    bubbles: ['mass_vegetables', 'insect_pollination', 'pesticide_resistant', 'weather_patterns', 'printed_product', 'climate_change', 'home_sprouts']
  },
  gamble: {
    title: { x: 680, y: 20, width: 1915, height: 180 },
    weather: { type: 'hot' },
    location: { type: 'far' },
    ingredients: ['instant_soup', 'fish_sausage', 'pudding', 'nutrition_noodle', 'supplements', 'milk_cube', 'gu_gu_bread'],
    bubbles: ['plantation_farms', 'daily_supplements', 'controlled_market', 'pesticide_regulations', 'daily_medication', 'lab_meat', 'food_marketers', 'stressed_conditions', 'rare_fresh_fruit']
  },
  garden: {
    title: { x: 680, y: 20, width: 1915, height: 180 },
    weather: { type: 'warm' },
    location: { type: 'near', style: { x: 2900, y: 6, fontSize: 40 } },
    ingredients: ['potato_porridge', 'chestnut', 'milk_bubble', 'satoyama_soup', 'proteins', 'fresh_salad'],
    bubbles: ['public_food', 'food_literacy', 'seed_banks', 'domestic_soveirnty', 'permaculture', 'vegan_diets', 'wasting_food', 'regionally_diverse', 'preserving', 'limited_trade', 'no_pesticides']
  }
}

export interface LunchData extends Omit<BaseData, 'ingredients' | 'bubbles'> {
  id: Lunch
  // Ingredients get looked up
  ingredients: Array<IngredientData>
  // Bubbles get looked up
  bubbles: Array<BubbleData>
}

function prepareForHTML (lunchKey: string, baseData: BaseData): LunchData {
  return {
    ...baseData,
    id: lunchKey as Lunch,
    ingredients: baseData.ingredients.map(ingredient => ingredients[ingredient]),
    bubbles: baseData.bubbles.map(bubble => bubbles[bubble])
  }
}

export const lunches = Object
  .entries(baseData)
  .reduce((mapped, [lunchKey, baseData]) => {
    mapped[lunchKey as Lunch] = prepareForHTML(lunchKey, baseData)
    return mapped
  }, {} as Record<Lunch, LunchData>)

export function lunchForBubble (bubble: Bubble): LunchData | null {
  const bubbleData = bubbles[bubble]
  for (const lunch of Object.values(lunches)) {
    if (lunch.bubbles.includes(bubbleData)) {
      return lunch
    }
  }
  return null
}

export function lunchForIngredient (ingredient: Ingredient): LunchData | null {
  const ingredientData = ingredients[ingredient]
  for (const lunch of Object.values(lunches)) {
    if (lunch.ingredients.includes(ingredientData)) {
      return lunch
    }
  }
  return null
}
