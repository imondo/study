<template>
  <teleport to="#login">
    <div v-if="visible">
      <div class="modal">Modal 弹出来了</div>
      <button @click="onClick">关闭</button>
    </div>
  </teleport>
</template>

<script>
  import { ref } from 'vue'
  import { useLogin } from '../hooks'

  export default {
    props: {
      visible: Boolean
    },
    methods: {
      onClick() {
        this.$emit('update:visible', false)
      }
    },
  }
</script>

<style scoped>

</style>