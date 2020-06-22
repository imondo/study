import { customRef } from 'vue'

export function cusTheme(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value + 1
      },
      set(newValue) {
        value = newValue
        trigger()
      }
    }
  })
}