<template>
  <el-row>
    <el-col :span="6">
      <img src="../../assets/logo.jpg" alt>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col :span="6">
      <a href="#" class="exit" @click.prevent="logout">登出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("是否确定登出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push({ name: "login" });
          localStorage.removeItem("token");
          this.$message({
            type: "success",
            message: "登出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    }
  }
};
</script>

<style>
</style>
