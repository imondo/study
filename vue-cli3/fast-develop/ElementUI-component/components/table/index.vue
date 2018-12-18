<template>
  <div class="pages-table">
    <el-table
      ref="table"
      v-bind="headerConfig"
      row-key="name"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="hasSelection"
        :selectable="selectable"
        type="selection"
        align="center"
        width="50"
      />
      <el-table-column v-if="hasRownum" :label="rownumName" type="index" align="center" width="50"/>
      <template v-for="(item, index) in colModel">
        <slot v-if="item.solt" :name="item.solt" v-bind="item"/>
        <component
          v-else-if="item.isEdit"
          :is="isComponent(item.editType)"
          :cell="item"
          :key="index"
          :edit-chage="editChage"
        />
        <component v-else-if="item.component" :is="item.component" :cell="item" :key="index"/>
        <template v-else>
          <el-table-column
            v-if="isHidden(item)"
            v-bind="item"
            :header-align="`${item.headerAlign || 'center'}`"
            :key="index"
          />
        </template>
      </template>
    </el-table>
    <PagesPagination
      v-if="isPaginaton"
      :paginaton-config="paginatonConfig"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
/* eslint-disable */
import CusInput from './input.vue';
import CusSelect from './select.vue';
import PagesPagination from './../page-pagination/index.vue';

export default {
  name: 'PageTable',
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
    editChage: {
      type: Function,
      defalut: () => {}
    },
    hasPaginaton: {
      type: Boolean,
      defalut: () => true
    },
    paginatonConfig: {
      type: Object,
      default: () => {
        const congfig = {
          pageSizes: [10, 20, 30, 40],
          pageSize: 10,
          currentPage: 1,
          total: 100
        };
        return { ...congfig };
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
      const name = this.headerConfig.rownumName || '序号';
      return name;
    },
    isPaginaton() {
      return this.hasSelection;
    }
  },
  data() {
    return {
      CusInput,
      CusSelect,
      pageSize: this.paginatonConfig.pageSize,
      currentPage: this.paginatonConfig.currentPage
    };
  },
  methods: {
    isComponent(key = 'input') {
      const cp = { input: this.CusInput, select: this.CusSelect };
      return cp[key];
    },
    isHidden(item) {
      const isTrue = item.hidden ? false : true;
      return isTrue;
    },
    handleSelectionChange(val) {
      if (this.hasSelection) {
        this.$emit('selection-change', val);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('paging', {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('paging', {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      });
    }
  }
};
</script>

<style scoped>
</style>