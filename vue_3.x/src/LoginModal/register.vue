<template>
  <button @click="onClick">注册确认</button>
</template>

<script>
export default {
  name: "Register",
  emits: ['register'],
  setup(props, { emit }) {
    const onClick = () => {
      emit("register")
    }
    return {
      onClick
    }
  }
};
</script>
