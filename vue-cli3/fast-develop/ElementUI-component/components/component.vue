<template>
  <el-table-column :label="cell.label">
    <template slot-scope="{row}">
      {{`component${row.name}`}}
    </template>
  </el-table-column>
</template>

<script>
  export default {
    props: {
      cell: {
        type: Object,
        default: () => {
          return {label: ''}
        }
      }
    }
  }
</script>

<style scoped>

</style>