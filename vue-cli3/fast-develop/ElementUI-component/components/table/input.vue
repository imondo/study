<template>
  <el-table-column
    :header-align="`${cusCell.headerAlign || 'center'}`"
    v-bind="cusCell"
    class-name="cus-table__input"
  >
    <template slot-scope="{row}">
      <el-input
        v-model="row[cusCell.prop]"
        :class="[ hasError(row, cusCell) ? errClassName: '' ]"
        :placeholder="cusCell.placeholder || '请输入内容'"
        size="mini"
        @input.native="editChage(row[cusCell.prop], cusCell, row, $event);"
      />
    </template>
  </el-table-column>
</template>

<script>
/* eslint-disable */
export default {
  name: "CusInput",
  props: {
    cell: {
      type: Object,
      default: () => {
        return {};
      }
    },
    editChage: {
      type: Function,
      defalut: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    cusCell() {
      return this.cell;
    },
    errClassName() {
      const className = this.cell.errClassName || "cus-table__input-error";
      return className;
    },
    isVerify() {
      return this.cell.regx;
    }
  },
  methods: {
    hasError(row, cell) {
      if (!this.isVerify) return;
      if (!cell.regx.test(row[cell.prop])) {
        return true;
      } else {
        return false;
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
        e = e.replace(`${className}`, "");
      }
    }
  }
};
</script>

<style>
.cus-table__input .cus-table__input-error .el-input__inner {
  border-color: #f56c6c;
  color: #f56c6c;
}
.cus-table__input .input-error .el-input__inner {
  border-color: #9f9e57;
  color: #333;
}
</style>
