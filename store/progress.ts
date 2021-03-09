import { lunches } from '../assets/lunches'

const factors = Object.entries(lunches)
  .reduce(
    (lunchEntries, [lunch, lunchData]) => {
      lunchEntries[lunch] = 0.5
      const perBubble = 21 / lunchData.bubbles.length
      for (const bubble of lunchData.bubbles) {
        lunchEntries[`bubble.${bubble.id}`] = perBubble
      }
      return lunchEntries
    },
    {} as { [key: string]: number }
  )

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
