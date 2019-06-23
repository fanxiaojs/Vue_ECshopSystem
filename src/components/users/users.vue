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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="state(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.prevent="openEdit(scope.row.id)"
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click.prevent="del(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="openRoles(scope.row.id)"
          ></el-button>
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
    <!-- 添加对话框 -->
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
    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialog" v-model="editUsers">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editUsers.username" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editUsers.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editUsers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      {{editUsers}}
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click.13="editUsersFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配对话框 -->
    <el-dialog title="角色分配" :visible.sync="rolesDialog">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="roles.username" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 下拉框 -->
        <el-form-item label="选择角色" :label-width="formLabelWidth">
          <el-select v-model="roles.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in selectArr"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- btn -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="rolesAllot">确 定</el-button>
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
      pagesize: 5,
      //page容量选择
      pagesizes: [5, 10, 15],
      //总条数
      total: 0,
      qurey: "",
      //控制添加对话框的显示与隐藏
      addDialog: false,
      formLabelWidth: "80px",
      addUsers: { username: "", password: "", email: "", mobile: "" },
      //控制编辑对话框的显示隐藏
      editDialog: false,
      //编辑用户的数据源
      editUsers: {},
      //角色分配的数据源
      roles: {},
      //角色分配对话框的显示隐藏
      rolesDialog: false,
      //下拉框中的数据源
      selectArr: []
    };
  },
  methods: {
    //获取数据
    getData() {
      this.$http({
        //请求后台的接口每个接口都需要在请求头中添加token
        method: "get",
        url: `users?query=${this.qurey}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        //解构
        let { data, meta } = res.data;
        //判断
        if (meta.status == 200) {
          //修复删除小BUG代码
          if (data.users.length == 0 && this.pagenum != 1) {
            this.pagenum--;
            this.getData();
            return;
          }
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
    //用户新增提交数据
    addUsersFn() {
      this.$http({
        method: "post",
        url: "users",
        data: this.addUsers
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
      this.getData();
    },
    del(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: `users/${id}`,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          let { meta } = res.data;
          if (meta.status == 200) {
            this.$message({
              showClose: true,
              message: meta.msg,
              type: "success"
            });
          }
          this.getData();
        });
      });
    },
    openEdit(id) {
      this.$http({
        method: "get",
        url: `users/${id}`
      }).then(res => {
        let { data } = res.data;
        this.editUsers = data;
        this.editDialog = true;
      });
    },
    editUsersFn() {
      this.$http({
        method: "put",
        url: `users/${this.editUsers.id}`,
        data: {
          mobile: this.editUsers.mobile,
          email: this.editUsers.email
        }
      }).then(res => {
        let { meta } = res.data;
        //判断
        if (meta.status == 200) {
          this.editDialog = false;
          this.$message({
            showClose: true,
            message: meta.msg,
            type: "success"
          });
          this.getData();
        }
      });
    },
    openRoles(id) {
      this.rolesDialog = true;
      this.$http({
        method: "get",
        url: `users/${id}`
      }).then(res => {
        //获取数据
        let { data } = res.data;
        this.roles = data;
        //获取下拉框中的数据
        this.$http({
          method: "get",
          url: "roles",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          let { meta, data } = res.data;
          if (meta.status == 200) {
            this.selectArr = data;
          }
        });
      });
    },
    rolesAllot() {
      this.$http({
        method: "put",
        url: `users/${this.roles.id}/role`,
        data: {
          rid: this.roles.rid
        }
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.$message({
            showClose: true,
            message: meta.msg,
            type: "success"
          });
          this.rolesDialog = false;
          this.getData;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    state(uid, type) {
      this.$http({
        method: "put",
        url: `users/${uid}/state/${type}`
      }).then(res => {
        let { meta } = res.data;
        if (meta.status == 200) {
          this.$message({
            showClose: true,
            message: meta.msg,
            type: "success"
          });
          this.getData;
        } else {
          this.$message.error(meta.msg);
        }
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
