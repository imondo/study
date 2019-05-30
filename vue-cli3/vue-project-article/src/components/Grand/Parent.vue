<template>
  <div class="parent">
    我是父组件
    <p>祖父的信息：{{ grandMsg }}</p>
    <Child />
  </div>
</template>

<script>
import Child from "./Child";
export default {
  name: "Parent",
  components: {
    Child
  },
  inject: {
    grandMsg: {
      default: ""
    }
  },
  data() {
    return {
      msg: "叫你吃饭了",
      childMsg: ""
    };
  },
  methods: {
    handleClick(val) {
      this.childMsg = val;
    }
  }
};
</script>

<style scoped lang="scss"></style>
