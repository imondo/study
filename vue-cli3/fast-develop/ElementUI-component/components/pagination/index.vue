<template>
  <div class="pages-pagination">
    <el-pagination
      :page-sizes="selfPaginatonConfig.pageSizes"
      :page-size="selfPaginatonConfig.pageSize"
      :current-page="selfPaginatonConfig.currentPage"
      :total="selfPaginatonConfig.total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange" />
  </div>
</template>

<script>
export default {
  name: 'PagePagination',
  props: {
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
  data() {
    return {};
  },
  computed: {
    selfPaginatonConfig() {
      return this.paginatonConfig;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    }
  }
};
</script>

<style scoped>
</style>
