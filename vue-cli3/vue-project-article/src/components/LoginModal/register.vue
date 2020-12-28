<template>
  <button @click="onClick">注册确认</button>
</template>

<script>
export default {
  name: "Register",
  methods: {
    onClick() {
      this.$emit("register");
    }
  }
};
</script>

<style lang="scss" scoped></style>
