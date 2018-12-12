<template>
  <div class="app">
    <CusTable :headerConfig="headerConfig" :colModel="colModel">
      <el-table-column slot="opt" label="操作">
        <el-button size="mini" slot-scope="{ row }" @click="getRow(row)">查看</el-button>
      </el-table-column>
    </CusTable>
    <pre>{{headerConfig}}</pre>
  </div>
</template>

<script>
  /* eslint-disable */
import CusTable from "./table.vue";
export default {
  components: {
    CusTable
  },
  data() {
    const timeRanges = (row, col, cell, index) => {
      return cell;
    };
    return {
      colModel: [
        {
          label: "姓名",
          prop: "name",
          align: "center",
          "header-align": "left"
        },
        { label: "日期", prop: "date", formatter: timeRanges },
        { label: "地址", prop: "address", isEadit: true, regx: /^\d+$/ },
        { label: "门牌号", prop: "num", isEadit: true, regx: /^\d+$/ },
        { label: "操作", solt: 'opt'}
      ],
      headerConfig: {
        data: [
          {
            date: "2016-05-02",
            name: "张三",
            address: "上海市普陀区金沙江路弄",
            num: 155555
          },
          {
            date: "2016-05-04",
            name: "李四",
            address: "1519"
          },
          {
            date: "2016-05-01",
            name: "王五",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "赵六",
            address: "1516"
          }
        ],
        border: true
      }
    };
  },
  methods: {
    getRow(row) {
      console.log(row);
    }
  }
};
</script>

<style scoped>
</style>