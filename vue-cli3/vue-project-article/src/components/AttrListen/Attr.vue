<template>
  <div class="child">
    <p>Attr</p>
    <p>这是$attrs：{{ placeholder }}</p>
    <p>这是$listeners：{{ test }}</p>
    <button @click="$listeners.click">监听了$listeners</button>
  </div>
</template>

<script>
export default {
  name: "AttrListen",
  inheritAttrs: true,
  props: {
    test: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      placeholder: this.$attrs.placeholder
    };
  },
  mounted() {
    console.log(this.$attrs, this.$listeners);
  }
};
</script>

<style scoped lang="scss"></style>
