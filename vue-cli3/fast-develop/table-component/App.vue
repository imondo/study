<template>
  <div class="app">
    <CusTable :colModel="tableData"/>
  </div>
</template>

<script>
  import CusTable from './table.vue';
  export default {
    components: {
      CusTable
    },
    data() {
      return {
        tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          address: "上海市普陀区金沙江路弄"
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王五",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "赵六",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
      }
    }
  }
</script>

<style scoped>

</style>