<template>
  <div class="child">
    <p>我是子组件一</p>
    <button @click="handleClick">组件一事件</button>
  </div>
</template>

<script>
import Bus from "./Bus";
export default {
  name: "Child",
  methods: {
    handleClick() {
      Bus.$emit("click", "嘿，老铁");
    }
  }
};
</script>

<style scoped lang="scss"></style>
