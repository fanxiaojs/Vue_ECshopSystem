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
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
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
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" },
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" },
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" },
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" },
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" },
        { date: 2008 - 8 - 8, name: "邓志伟", address: "深圳" }
      ]
    };
  }
};
</script>

<style>
.addusers {
  margin-top: 15px;
  margin-left: 3px;
}
</style>
