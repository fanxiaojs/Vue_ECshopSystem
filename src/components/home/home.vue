<template>
  <!-- 页面容器 -->
  <el-container>
    <!-- 头部区域 -->
    <el-header>
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
          <a href="#" class="exit">登出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <el-menu :unique-opened="true" :router="true" class="el-menu-vertical-demo myside">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>商品分类
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
