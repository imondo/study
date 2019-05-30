<template>
  <div class="child">
    <p>我是子组件二</p>
    <p>兄弟叫我：{{ msg }}</p>
  </div>
</template>

<script>
import Bus from "./Bus";
export default {
  name: "ChildOne",
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    Bus.$on("click", msg => {
      this.msg = msg;
    });
  }
};
</script>

<style scoped lang="scss"></style>
