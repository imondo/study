<template>
  <div class="child">
    <p>我是子组件</p>
    <p>来自父组件的msg: {{ msg }}</p>
    <input type="text" v-model="value" />
  </div>
</template>

<script>
export default {
  name: "ChildParent",
  data() {
    return {
      value: ""
    };
  },
  computed: {
    msg() {
      return this.$parent.value;
    }
  },
  created() {
    console.log(this.$parent);
  }
};
</script>

<style scoped lang="scss"></style>
