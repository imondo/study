<template>
  <div class="child">
    <p>我是子组件</p>
    <p>爷爷的信息： {{ grandMsg }}</p>
    <p>爷爷的实例信息： {{ grandVmMsg }}</p>
    <p>爷爷的observable： {{ read.msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Child",
  inject: {
    grandMsg: {
      default: ""
    },
    grandVm: {
      default: () => {}
    },
    read: {
      default: () => {}
    }
  },
  props: {
    msg: String
  },
  computed: {
    grandVmMsg() {
      return this.grandVm.msg;
    }
  },
  methods: {
    handleClick() {
      this.$emit("click", "我知道了");
    }
  }
};
</script>

<style scoped lang="scss"></style>
