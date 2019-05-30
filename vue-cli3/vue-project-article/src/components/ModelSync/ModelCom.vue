<template>
  <div class="child">
    <input type="text" @input="handleInput" placeholder="v-model" />
    <input type="text" @input="handleChange" placeholder="sync" />
  </div>
</template>

<script>
export default {
  name: "ModelSync",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.$emit("input", value);
    },
    handleChange(e) {
      const value = e.target.value;
      this.$emit("update:value", value);
    }
  }
};
</script>

<style scoped lang="scss"></style>
