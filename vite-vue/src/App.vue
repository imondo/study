<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
    <JsxTemp site="imondo.cn" @onGet="onGet"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import JsxTemp from './components/JsxTemp.jsx'

export default {
  name: 'App',
  components: {
    HelloWorld,
    JsxTemp
  },
  methods: {
    onGet(e) {
      console.log('emit:', e)
    }
  }
}
</script>
