<template>
  <div class="pages-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="selfPaginatonConfig.currentPage"
      :page-sizes="selfPaginatonConfig.pageSizes"
      :page-size="selfPaginatonConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="selfPaginatonConfig.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
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
    },
    data() {
      return {};
    }
  }
</script>

<style scoped>

</style>