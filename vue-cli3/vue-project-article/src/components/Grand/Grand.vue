<template>
  <div class="grand">
    <p>我是祖父</p>
    <input type="text" v-model="msg" placeholder="输入祖父的消息" />
    <input type="text" v-model="read.msg" placeholder="输入read" />
    <Parent />
  </div>
</template>

<script>
import Parent from "./Parent";
import Vue from "vue";
export default {
  name: "Grand",
  provide() {
    this.read = Vue.observable({
      msg: ""
    });
    return {
      grandMsg: "都来吃饭",
      grandVm: this,
      read: this.read
    };
  },
  components: {
    Parent
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>
