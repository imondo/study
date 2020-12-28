<template>
  <div v-if="show" class="modal">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <div>
      <button @click="onCancel">取消</button>
      <button @click="onConfirm">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false,
      title: "",
      content: ""
    };
  },
  methods: {
    onConfirm() {
      this.doClose("confirm");
    },
    onCancel() {
      this.doClose("cancel");
    },
    doClose(func) {
      this[func] && this[func]();
      this.show = false;
    }
  }
};
</script>

<style scoped></style>
