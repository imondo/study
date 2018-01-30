<template>
  <div class="index-wrapper">
    <div class="add">
      <div>当前用户:{{name}}</div>
      <div>
        <h3>添加用户</h3>
        <el-form :inline="true" :model="add" class="demo-form-inline">
          <el-form-item label="用户名" size="mini">
            <el-input v-model="add.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" size="mini">
            <el-input v-model="add.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="addUser">添加用户</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="table">
      <div>
        <el-table
                :data="tableData"
                border
                style="width: 362px">
          <el-table-column
                  prop="name"
                  label="用户"
                  width="180">
            <template slot-scope="scope">
              <el-input v-show="scope.row.isEdit" v-model="scope.row.name"></el-input>
              <span v-show="!scope.row.isEdit" >{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  width="180"
                  label="操作">
            <template slot-scope="scope">
              <el-button v-show="!scope.row.isEdit" type="primary" size="mini" @click="scope.row.isEdit=true">编辑</el-button>
              <el-button v-show="scope.row.isEdit"  type="primary" size="mini" @click="updateUser(scope.row)">保存</el-button>
              <el-button type="danger" size="mini" @click="delUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

  .add, .table {
    display: flex;
    justify-content: center;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    data: () => ({
      tableData: [],
      name: '',
      add: {},
      update: {}
    }),
    created() {
      this.getUser();
      this.$store.dispatch('getUser').then(res => {
        ({name: this.name} = res);
      })
    },
    methods: {
      getUser() {
        this.$axios.get('/api/user').then(res => {
          this.tableData = res.data.map(v => {
            v.isEdit = false;
            return v;
          });
        })
      },
      getName(item) {
        this.$axios.get('/api/user/detail/' + item.id).then(res => {
          this.name = res;
          this.update = res;
        })
      },
      addUser() {
        this.$axios.post('/api/user/add', this.add).then(res => {
          if (res.code === 200) {
            this.$message.success(res.data.msg);
            this.getUser();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      updateUser(row) {
        let user_name = row.name;
        let id = row.id;
        this.$axios.put('/api/user/put',{user_name, id}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.data.msg);
            this.getUser();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      delUser(id) {
        this.$axios.delete('/api/user/del/' + id).then(res => {
          if (res.code === 200) {
            this.$message.success(res.data.msg);
            this.getUser();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    }
  };
</script>