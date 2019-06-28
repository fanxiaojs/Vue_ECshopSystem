<template>
  <el-card>
    <!-- 面包屑 -->
    <Braed one="商品管理" two="商品列表"></Braed>
    <!-- 警告 -->
    <el-alert title="添加商品信息" type="info" center show-icon class="al"></el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      finish-status="success"
      space="150px"
      class="bz"
      :align-center="true"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="tabC" tabPosition="left">
      <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="fiveth">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Braed from "../layout/bread";
export default {
  components: {
    Braed
  },
  data() {
    return {
      //设置步骤条的默认选中项
      active: 0,
      //设置tba默认选中项
      activeName: "first"
    };
  },
  methods: {
    //tab选项中的tab被点击的时候触发
    tabC(tag) {
      //让步骤条与tab同步
      this.active = +tag.index;
    }
  }
};
</script>

<style>
.al {
  margin-top: 20px;
  margin-bottom: 15px;
}
.el-step__title.is-wait {
  font-size: 14px;
}
</style>
