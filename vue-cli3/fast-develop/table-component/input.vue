<template>
  <el-table-column class-name="cus-table__input" v-bind="cell">
    <template slot-scope="scope">
      <el-input
        v-model="scope.row[cell.prop]"
        size="mini"
        :class="{'error-input': cell.isErrInput}"
        @change="handleChange($event, cell, scope)"
        :placeholder="cell.placeholder || '请输入内容'"
      />
    </template>
  </el-table-column>
</template>

<script>
/* eslint-disable */
export default {
  name: "CusInput",
  props: ["cell"],
  data() {
    return {};
  },
  methods: {
    handleChange(val, cell, row) {
      if (!cell.regx.test(val)) {
        console.log("error");
        cell.isErrInput = true;
      console.log(cell)

      }
    }
  }
};
</script>

<style>
.cus-table__input .error-input .el-input__inner {
  border-color: #f56c6c;
  color: #f56c6c;
}
</style>