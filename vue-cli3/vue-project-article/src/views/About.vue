<template>
  <div class="about">
    <button @click="onClick">模态框Modal</button>
    <button @click="onClickAlert">模态框Modal alert</button>

    <div>
      <a href="javascript:;" @click="onLogin('sigin')">登录</a>
      /
      <a href="javascript:;" @click="onLogin('register')">注册</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOk: true
    };
  },
  methods: {
    onClick() {
      this.$modal({
        type: "colfim",
        title: "提示",
        content: "这是个模态框",
        confirm: () => {
          console.log("confirm");
        },
        cancel: () => {
          console.log("cancel");
        }
      });
    },
    onClickAlert() {
      this.$modal.alert("这是个 alert 模态框");
    },
    onLogin(type) {
      const funcs = {
        sigin: () => {
          console.log("登录请求");
        },
        register: () => {
          console.log("注册请求");
        }
      };
      this.$loginer({
        type,
        ok: () => {
          return new Promise((resolve, reject) => {
            if (this.isOk) {
              funcs[type]();
              resolve();
            } else {
              reject();
            }
          });
        }
      });
    }
  }
};
</script>
