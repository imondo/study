<template>
  <div>
    <button class="loginer" @click="onLogin">Modal 框</button>
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" />
    <JsxTemp site="imondo.cn" @onGet="onGet"/> -->
    <TeleportTest v-model:visible="visible"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import JsxTemp from './components/JsxTemp.jsx'
import TeleportTest from './components/TeleportTest.vue'
import { useLogin } from './hooks'

export default {
  name: 'App',
  components: {
    HelloWorld,
    JsxTemp,
    TeleportTest
  },
  setup() {
    const { onLogin, visible } = useLogin();
    return {
      visible,
      onLogin
    }
  },
  methods: {
    onGet(e) {
      console.log('emit:', e)
    }
  }
}
</script>
