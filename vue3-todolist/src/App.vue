<template>
  <header>
    <h3>Vue 3.0 TodoList</h3>
    <ul>
      <li><router-link to="/">列表</router-link></li>
      <li><router-link to="/completed">已完成</router-link></li>
      <li><router-link to="/undone">未完成</router-link></li>
    </ul>
  </header>
  <section>
    <router-view/>
  </section>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style scoped>
  header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  }
  header h3 {
    position: absolute;
    left: 20px;
    top: 0;
    font-size: 20px;
  }
  ul {
    display: flex;
    justify-content: center;
  }
  ul li a {
    padding: 0 20px;
    color: #333;
    font-size: 18px;
    text-decoration: none;
  }
  .link-active {
    color: #007fff;
  }

  section {
    width: 500px;
    margin: 20px auto;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .15);
  }
</style>
