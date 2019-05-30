<template>
  <div class="parent">
    我是父组件
    <p>来自子级的回答：{{ childMsg }}</p>
    <Child :msg="msg" @click="handleClick" />
  </div>
</template>

<script>
import Child from "./Child";
export default {
  name: "Parent",
  components: {
    Child
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
