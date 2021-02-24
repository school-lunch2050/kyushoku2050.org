const fItems = 21
const f7Items = fItems / 7
const f9Items = fItems / 9
const f11Items = fItems / 11
const fMenu = 0.5

const factors = {
  menu: 1,
  'menu.cosmopolitan': 0.25,
  'menu.desperate': 0.25,
  'menu.gamble': 0.25,
  'menu.garden': 0.25,
  cosmopolitan: fMenu,
  'cosmopolitan.fruit': f7Items,
  'cosmopolitan.rice': f7Items,
  'cosmopolitan.influencers': f7Items,
  'cosmopolitan.agreements': f7Items,
  'cosmopolitan.fisheries': f7Items,
  'cosmopolitan.ethical_consumption': f7Items,
  'cosmopolitan.social_businesses': f7Items,
  desperate: fMenu,
  'desperate.mass_vegetables': f7Items,
  'desperate.insect_pollination': f7Items,
  'desperate.pesticide_resistant': f7Items,
  'desperate.weather_patterns': f7Items,
  'desperate.printed_product': f7Items,
  'desperate.climate_change': f7Items,
  'desperate.home_sprouts': f7Items,
  gamble: fMenu,
  'gamble.plantation_farms': f9Items,
  'gamble.daily_supplements': f9Items,
  'gamble.controlled_market': f9Items,
  'gamble.pesticide_regulations': f9Items,
  'gamble.daily_medication': f9Items,
  'gamble.lab_meat': f9Items,
  'gamble.food_marketers': f9Items,
  'gamble.stressed_conditions': f9Items,
  'gamble.rare_fresh_fruit': f9Items,
  garden: fMenu,
  'garden.public_food': f11Items,
  'garden.food_literacy': f11Items,
  'garden.seed_banks': f11Items,
  'garden.domestic_soveirnty': f11Items,
  'garden.permaculture': f11Items,
  'garden.vegan_diets': f11Items,
  'garden.wasting_food': f11Items,
  'garden.regionally_diverse': f11Items,
  'garden.preserving': f11Items,
  'garden.limited_trade': f11Items,
  'garden.no_pesticides': f11Items
}
export const max = Object.values(factors).reduce((sum, current) => sum + current)

type Keys = keyof typeof factors
const keys = Object.keys(factors) as Keys[]
export type Progress = Partial<Record<Keys, null | undefined | 0 | 1>>

export function total (state: Progress): number {
  let result = 0
  for (const entry of keys) {
    if (state[entry] === 1) {
      result += factors[entry]
    }
  }
  return result
}

export function percentage (state: Progress): number {
  return total(state) / max
}

export const state = (): Progress => ({})

export const mutations = {
  clear (state: Progress) {
    for (const key of keys) {
      delete state[key]
    }
  },
  mark (state: Progress, key: Keys) {
    if (state[key] === 1) {
      return
    }
    state[key] = 1
  }
}
