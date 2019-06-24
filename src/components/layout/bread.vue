<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{one}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  //给当前组件设置一个爱称
  name: "bread",
  props: ["one", "two"]
};
</script>

<style>
</style>
