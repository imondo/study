<template>
  <div class="child">
    <p>我是子组件</p>
    <p>父级来的信息： {{ msg }}</p>
    <button @click="handleClick">回答父级</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    msg: String
  },
  methods: {
    handleClick() {
      this.$emit("click", "我知道了");
    }
  }
};
</script>

<style scoped lang="scss"></style>
