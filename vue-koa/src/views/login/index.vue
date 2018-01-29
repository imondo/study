<style lang="less" rel="stylesheet/less" scope>
  .login {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
</style>
<template>
  <div class="login">
    <el-form :model="formData" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户" size="mini">
        <el-input size="mini" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" size="mini">
        <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="login('formData')">登录</el-button>
        <el-button @click="createForm('formData')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    data: () => ({
      formData: {}
    }),
    methdos: {
      login() {
        this.$axios.post('/api/login', this.fromData);
      },
      createForm() {

      }
    }
  }
</script>

