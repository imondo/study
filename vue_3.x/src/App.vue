<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" test="测试"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { provide, ref } from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(props, context) {
    const theme = ref('red')
    provide('textColor', theme)
  }
}
</script>
