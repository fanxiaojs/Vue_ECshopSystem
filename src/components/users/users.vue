<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="6">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain class="addusers">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      qurey: "",
      pagenum: 1,
      pagesize: 5
    };
  },
  methods: {
    getData() {
      this.$http({
        //请求后台的接口每个接口都需要在请求头中添加token
        method: "get",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.qurey
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        //解构
        let { data, meta } = res.data;
        //判断
        if (meta.status == 200) {
          this.tableData = data.users;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.addusers {
  margin-top: 15px;
  margin-left: 3px;
}
</style>
