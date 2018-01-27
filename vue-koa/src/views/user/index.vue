<template>
  <div class="index-wrapper">
    <ul>
      <li v-for="item in list" @click="getName(item)">{{item.name}}</li>
    </ul>
    <div>{{name}}</div>
  </div>
</template>

<style lang="less" scoped>

</style>

<script type="text/ecmascript-6">
  export default {
    data: () => ({
      list: '',
      name: ''
    }),
    created() {
      this.$axios.get('/api/user').then(res => {
        this.list = res;
      })
    },
    methods: {
      getName(item) {
        this.$axios.get('/api/user/' + item.name).then(res => {
          this.name = res;
        })
      }
    }
  };
</script>