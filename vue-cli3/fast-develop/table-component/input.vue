<template>
  <el-table-column class-name="cus-table__input" v-bind="cusCell">
    <template slot-scope="scope">
      <el-input
        v-model="scope.row[cusCell.prop]"
        size="mini"
        :class="{'error-input': isErrInputVal(scope, cusCell)}"
        @input.native="handleChange($event, cell, scope)"
        :placeholder="cusCell.placeholder || '请输入内容'"
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
    return {
      cellVal: {}
    };
  },
  computed: {
    cusCell() {
      return this.cell;
    }
  },
  methods: {
    isErrInputVal(scope, cell) {
      if (!cell.regx.test(scope.row[cell.prop])) {
        return true;
      } else {
        return false;
      }
    },
    handleChange(e, cell, row) {
      const { target: { value } } = e;
      const $offsetParent = e.target.offsetParent;
      if (!cell.regx.test(value)) {
        this.addErrClass($offsetParent.className, 'error-input');
      } else {
        this.removeErrClass($offsetParent.className, 'error-input');
      }
    },
    addErrClass(e, className) {
      const hasClass = e.includes(className);
      if (hasClass) return;
      e += ` ${className}`;
    },
    removeErrClass(e, className) {
      const hasClass = e.includes(className);
      if (hasClass) {
        e = e.replace(`${className}`, '');
      }
    }
  }
};
</script>

<style>
.cus-table__input .el-input__inner.error-input {
  border-color: #f56c6c;
  color: #f56c6c;
}
.cus-table__input .error-input .el-input__inner {
  border-color: #f56c6c;
  color: #f56c6c;
}
</style>