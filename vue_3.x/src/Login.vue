<template>
  <div class="login">
    <!-- <button @click="onClick">模态框Modal</button>
    <button @click="onClickAlert">模态框Modal alert</button> -->

    <div>
      <a href="javascript:;" @click="onLogin('sigin')">登录</a>
      /
      <a href="javascript:;" @click="onLogin('register')">注册</a>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
export default {
  setup(props) {
    const { proxy } = getCurrentInstance();

    const isOk = ref(true);

    const onLogin = (type) => {
      const funcs = {
        sigin: () => {
          console.log("登录请求");
        },
        register: () => {
          console.log("注册请求");
        },
      };
      proxy.$loginer({
        type,
        ok: () => {
          return new Promise((resolve, reject) => {
            if (isOk.value) {
              funcs[type]();
              resolve();
            } else {
              reject();
            }
          });
        },
      });
    };

    return {
      isOk,
      onLogin,
    };
  },
};
</script>
