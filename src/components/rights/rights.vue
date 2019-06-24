<template>
  <el-card>
    <!-- 面包屑导航 -->
    <!-- 使用自己封装好的面包屑导航 -->
    <Bread one="权限管理" two="权限列表"></Bread>
    <!-- 表格区域 -->
    <el-table style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="email" label="路径" width="180"></el-table-column>
      <el-table-column prop="mobile" label="层级"></el-table-column>
    </el-table>
  </el-card>
</template>


<script>
// 引入面包屑
import Bread from "../layout/bread";
export default {
  components: {
    Bread
  }
};
</script>

<style>
</style>
