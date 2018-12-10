<template>
  <div class="table">
    <el-table row-key="date" ref="table" border :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <pre>{{ tableData }}</pre>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄"
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
    };
  },
  mounted() {
    const table = document.querySelector(".el-table__body-wrapper tbody");
    const vm = this;
    Sortable.create(table, {
      onEnd({ newIndex, oldIndex }) {
        const targetRow = vm.tableData.splice(oldIndex, 1)[0];
        vm.tableData.splice(newIndex, 0, targetRow);
      }
    });
  }
};
</script>

<style scoped>
</style>