<template>
  <div>
    <button @click="onClick">登录确认</button>
  </div>
</template>

<script>
export default {
  name: "Sigin",
  methods: {
    onClick() {
      this.$emit("sigin");
    }
  }
};
</script>

<style lang="scss" scoped></style>
