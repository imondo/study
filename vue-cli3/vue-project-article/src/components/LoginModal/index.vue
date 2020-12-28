<template>
  <div v-if="show">
    <Sigin v-if="type === 'sigin'" @sigin="loginCallback" />
    <Register v-if="type === 'register'" @register="loginCallback" />
  </div>
</template>

<script>
import Sigin from "./sigin";
import Register from "./register";
export default {
  components: {
    Register,
    Sigin
  },
  data() {
    return {
      show: false,
      type: "sigin"
    };
  },
  methods: {
    loginCallback() {
      if (!this.ok) return;
      this.ok().then(valid => {
        if (valid) {
          this.doClose();
        }
      });
    },
    doClose() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
