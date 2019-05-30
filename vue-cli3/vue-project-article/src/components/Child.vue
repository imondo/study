<template>
  <div class="child">
    我是子组件
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss"></style>
