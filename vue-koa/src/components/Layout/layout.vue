<template>
  <div class="layout-wrapper">
    <header>Header</header>
    <nav>
      <router-link :to="{name: 'index'}">首页</router-link>
      <router-link :to="{name: 'demo'}">DEMO</router-link>
      <router-link :to="{name: 'login'}">登录</router-link>
      <router-link :to="{name: 'users'}">Koa-用户</router-link>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .layout-wrapper {
    header, nav {
      padding: 6px;
      border: 1px solid #cccccc;
      text-align: center;
    }
    nav a {
      margin-right: 10px;
    }
  }
</style>

<script type="text/ecmascript-6">
  export default {

  }
</script>