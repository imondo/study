<template>
  <el-table-column :header-align="`${cusCell.headerAlign || 'center'}`" class-name="cus-table__input" v-bind="cusCell">
    <template slot-scope="{row}">
      <el-select size="mini" v-model="row[cusCell.prop]" :class="[ hasError(row, cusCell) ? errClassName: '' ]" :placeholder="cusCell.placeholder || '请选择'">
        <el-option
          v-for="item in cusCell.options"
          :key="item[valueKey.value]"
          :label="item[valueKey.label]"
          :value="item[valueKey.value]">
        </el-option>
      </el-select>
    </template>
  </el-table-column>
</template>

<script>
/* eslint-disable */
export default {
  name: "CusSelect",
  props: {
    cell: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputChage: {
      type: Function,
      defalut: () => {}
    }
  },
  data() {
    return {
    };
  },
  computed: {
    cusCell() {
      return this.cell;
    },
    valueKey() {
      const { value = 'value', label = 'label' } = this.cell.valKey || {};
      return { value, label };
    },
    errClassName() {
      const className = this.cell.errClassName || 'cus-table__input-error';
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
