<template>
  <el-row class="app">
    <CusTable
      :headerConfig="headerConfig"
      :colModel="colModel"
      :selectable="selectable"
      @selection-change="handleSelectionChange"
      @paging="getPaging"
    >
      <el-table-column slot="multi" label="区域">
         <el-table-column label="省份" prop="province"></el-table-column>
         <el-table-column label="城市" prop="city"></el-table-column>
      </el-table-column>
      <el-table-column slot="opt" label="操作">
        <el-button size="mini" slot-scope="{ row }" @click="getRow(row)">查看</el-button>
      </el-table-column>
    </CusTable>
    <el-col :span="6">
      <h3>数据</h3>
      <pre>{{headerConfig}}</pre>
    </el-col>
    <el-col :span="6">
      <h3>查看</h3>
      <pre>{{seeData}}</pre>
    </el-col>
    <el-col :span="6">
      <h3>选中数据</h3>
      <pre>{{multipleSelection}}</pre>
    </el-col>
    <el-col :span="6">
      <h3>当前页</h3>
      <pre>{{currentPage}}</pre>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable */
import CusTable from "./components/table/index.vue";
import TextComponent from "./components/component";
export default {
  components: {
    CusTable
  },
  data() {
    const timeRanges = (row, col, cell, index) => {
      return cell;
    };

    const checkSelect = row => {
      console.log(row);
      return false;
    };
    return {
      colModel: [
        {
          label: "姓名",
          prop: "name",
          align: "center",
          headerAlign: "left"
        },
        { label: "组件", component: TextComponent },
        { label: "操作", solt: "multi" },
        { label: "日期", prop: "date", formatter: timeRanges, sortable: true },
        { label: "地址", prop: "address", isEadit: true, regx: /^\d+$/ },
        {
          label: "门牌号",
          prop: "num",
          isEadit: true,
          regx: /^\d+$/,
          errClassName: "input-error"
        },
        { label: "操作", solt: "opt" }
      ],
      headerConfig: {
        data: [
          {
            date: "2016-05-02",
            name: "张三",
            address: "上海市普陀区金沙江路弄",
            num: 155555,
            province: '上海',
            city: '普陀区'            
          },
          {
            date: "2016-05-04",
            name: "李四",
            address: "1519",
            num: "错误的regx",
            province: '上海',
            city: '普陀区'
          },
          {
            date: "2016-05-01",
            name: "王五",
            address: "上海市普陀区金沙江路 1519 弄",
            province: '上海',
            city: '普陀区'
          },
          {
            date: "2016-05-03",
            name: "赵六",
            address: "1516",
            province: '上海',
            city: '普陀区'            
          }
        ],
        border: true,
        selection: true,
        rownum: true,
        rownumName: "行号"
      },
      seeData: {},
      multipleSelection: [],
      currentPage: {}
    };
  },
  methods: {
    getRow(row) {
      this.seeData = { ...row };
    },
    handleSelectionChange(val) {
      this.multipleSelection = [...val];
    },
    selectable(row, index) {
      return row.address === "1519";
    },
    getPaging(paging) {
      console.log(paging);
      this.currentPage = {...paging};
    }
  }
};
</script>

<style scoped>
.pull-left {
  float: left;
}
</style>