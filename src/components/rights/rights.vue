<template>
  <el-card>
    <!-- 面包屑导航 -->
    <!-- 使用自己封装好的面包屑导航 -->
    <Bread one="权限管理" two="权限列表"></Bread>
    <!-- 表格区域 -->
    <el-table :data="rights" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="anthName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">{{scope.row.level=="0"?'一级':scope.row.level=="1"?'二级':'三级'}}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>


<script>
// 引入面包屑
import Bread from "../layout/bread";
export default {
  components: {
    Bread
  },
  data() {
    return {
      rights: []
    };
  },
  methods: {
    getRights() {
      this.$http({
        methods: "get",
        url: "rights/list"
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.rights = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  mounted() {
    this.getRights();
  }
};
</script>

<style>
</style>
