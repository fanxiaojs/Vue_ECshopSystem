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
          <el-input v-model="qurey" placeholder="请输入内容" class="input-with-select">
            <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button @click="openAdd" type="success" plain class="addusers">添加用户</el-button>
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
    <!-- :current-page是当前页   page-sizes是设置当前的页容量    page-size当前的页容量 -->
    <el-pagination
      @size-change="sizeC"
      @current-change="crr"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="addDialog" v-model="addUsers">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addUsers.username" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUsers.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUsers.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addUsers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUsersFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      qurey: "",
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 3,
      //page容量选择
      pagesizes: [2, 3, 5],
      //总条数
      total: 0,
      qurey: "",
      //控制添加对话框的显示与隐藏
      addDialog: true,
      formLabelWidth: "80px",
      addUsers: { username: "", password: "", email: "", mobile: "" }
    };
  },
  methods: {
    //获取数据
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
          this.total = data.total;
        }
      });
    },
    // 当页面改变时发生事件    currentPage是当前页
    crr(currentPage) {
      this.pagenum = currentPage;
      //重新获取数据
      this.getData();
    },
    //  页容量改变时候触发
    sizeC(pagesize) {
      this.pagesize = pagesize;
      this.getData();
    },
    //点击搜索按钮是触发
    search() {
      this.getData();
    },
    //打开新增面板
    openAdd() {
      this.addDialog = true;
    },
    addUsersFn() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.addUsers,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            showClose: true,
            message: res.data.meta.msg,
            type: "success"
          });
          this.getData;
        } else {
          this.$message.error(res.data.meta.msg);
        }
        this.addUsers = {};
        this.addDialog = false;
      });
    }
  },
  mounted() {
    //页面一打开获取数据并渲染到页面
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
