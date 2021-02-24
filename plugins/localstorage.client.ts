import { Store } from 'vuex'

const key = 'progress'

export default ({ store }: { store: Store<any> }) => {
  store.subscribe((mutation, state) => {
    if (!mutation.type.startsWith(`${key}/`)) {
      return
    }
    window.localStorage.setItem(key, JSON.stringify(state[key]))
  })
  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return
  }
  try {
    store.replaceState({
      ...store.state,
      [key]: JSON.parse(raw)
    })
  } catch (err) {}
}
