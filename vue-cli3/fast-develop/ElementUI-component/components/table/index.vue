<template>
  <div class="pages-table">
    <el-table
      row-key="date"
      ref="table"
      v-bind="headerConfig"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column v-if="hasSelection" type="selection" align="center" width="50" :selectable="selectable"></el-table-column>
      <el-table-column v-if="hasRownum" :label="rownumName" type="index" align="center" width="50"></el-table-column>
      <template v-for="(item, index) in colModel">
        <slot v-if="item.solt" :name="item.solt" v-bind="item"></slot>
        <component v-else-if="item.isEadit" :is="CusInput" :cell="item" :key="index"></component>
        <component v-else-if="item.component" :is="item.component" :cell="item" :key="index"></component>      
        <el-table-column v-else v-bind="item" :header-align="`${item.headerAlign || 'center'}`" :key="index"></el-table-column>
      </template>
    </el-table>
    <PagesPagination v-if="paginatonConfig.total" :paginatonConfig="paginatonConfig" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import CusInput from "./input.vue";
import PagesPagination from "../pagination/index.vue";

export default {
  components: {
    PagesPagination
  },
  props: {
    headerConfig: {
      type: Object,
      default: () => {
        return { data: [] };
      }
    },
    colModel: {
      require: true,
      type: Array,
      default: () => {
        return [];
      }
    },
    selectable: {
      type: Function,
      default: () => {
        return true;
      }
    },
    paginatonConfig: {
      type: Object,
      default: () => {
        const congfig = {
          pageSizes: [10, 20, 30, 40],
          pageSize: 10,
          currentPage: 1,
          total: 100
        }
        return {...congfig};
      }
    }
  },
  computed: {
    hasSelection() {
      const isTrue = this.headerConfig.selection || false;
      return isTrue;
    },
    hasRownum() {
      const isTrue = this.headerConfig.rownum || false;
      return isTrue;
    },
    rownumName() {
      const name = this.headerConfig.rownumName || "序号";
      return name;
    }
  },
  data() {
    return {
      CusInput,
      pageSize: this.paginatonConfig.pageSize,
      currentPage: this.paginatonConfig.currentPage,
    };
  },
  methods: {
    handleSelectionChange(val) {
      if (this.hasSelection) {
        this.$emit("selection-change", val);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('paging', {pageSize: this.pageSize, pageNo: this.currentPage});
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('paging', {pageSize: this.pageSize, pageNo: this.currentPage});
    }
  }
};
</script>

<style scoped>
</style>