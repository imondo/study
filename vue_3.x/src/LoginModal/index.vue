<template>
  <div v-show="show">
    <Sigin v-if="type === 'sigin'" @sigin="loginCallback" />
    <Register v-if="type === 'register'" @register="loginCallback" />
  </div>
</template>

<script>
import Sigin from "./sigin.vue";
import Register from "./register.vue";
import { ref } from 'vue';
export default {
  components: {
    Register,
    Sigin
  },
  props: {
    visible: Boolean,
    type: String,
    close: [Function, Boolean]
  },
  emits: ['destroy'],
  setup(props, { emit }) {
    const show = ref(props.visible);
    const doClose = () => {
      show.value = false;
      emit('destroy');
    }

    const loginCallback = () => {
      if (!props.close) return;
      props.close().then(valid => {
        if (valid) {
          doClose();
        }
      });
    }

    return {
      show,
      doClose,
      loginCallback
    }
  }
};
</script>
