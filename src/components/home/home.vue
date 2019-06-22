<template>
  <!-- 页面容器 -->
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <hHeader></hHeader>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <hAside/>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import hHeader from "../layout/h_header";
import hAside from "../layout/h_aside";
export default {
  components: {
    hHeader,
    hAside
  },
  mounted() {
    //获取token
    let token = localStorage.getItem("token");
    //判断是否有token
    if (!token) {
      //提示
      this.$message.error("请先登录");
      //如果没有token那么就跳转到登录压面
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header img {
  width: 207px;
  height: 60px;
}
.el-header h1 {
  margin: 0;
  color: #fff;
  font-weight: 900;
}
.el-header .exit {
  float: right;
  font-size: 16px;
  text-decoration: none;
  color: palevioletred;
  margin-right: 150px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;

  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  height: 100%;
}
.myside {
  height: 100%;
}
</style>
