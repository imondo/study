import { defineComponent, ref, reactive } from 'vue'

// export default function JsxTemp() {
//   const state = ref(0)
//   const onClick = () => {
//     state.value++;
//     console.log(state.value)
//   }
//   return <div>
//     <h3>state: {state.value}</h3>
//     <button onClick={onClick}>点击</button>
//   </div>
// }

export default defineComponent({
  props: {
    site: String
  },
  setup({ site }, context) {
    const state = ref(0)
    const onClick = () => {
      state.value++;
      console.log(state.value)
      context.emit('onGet', 'Mondo');
    }


    return () => (
      <div>
        <h1>props: {site}</h1>
        <h3>state: {state.value}</h3>
        <button onClick={onClick}>点击</button>
      </div>
    )
  }
})