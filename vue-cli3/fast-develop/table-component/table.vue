<template>
  <div class="table">
    <el-table row-key="date" ref="table" border :data="colModel" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    colModel: {
      require: true,
      type: Array,
      default: []
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>