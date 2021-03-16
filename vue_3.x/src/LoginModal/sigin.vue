<template>
  <div>
    <button @click="onClick">登录确认</button>
  </div>
</template>

<script>
export default {
  name: "Sigin",
  emits: ['sigin'],
  setup(props, { emit }) {
    const onClick = () => {
      emit("sigin")
    }
    return {
      onClick
    }
  }
};
</script>
