<template>
  <el-card>
    <!-- 面包屑导航 -->
    <Bread one="商品管理" two="商品分类"></Bread>
    <!-- 按钮 -->
    <el-button plain size="mini" :span="6" class="btn" type="success">添加用户</el-button>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column label="级别" width="180">
        <template
          slot-scope="scope"
        >{{scope.row.cat_level==0?'一级':scope.row.cat_level==1?'二级':'三级'}}</template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">{{scope.row.deleted?'有效':'无效'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
  </el-card>
</template>

<script>
import Bread from "../layout/bread";
export default {
  components: {
    Bread
  },
  data() {
    return {
      //表格数据源
      tableData: []
    };
  },
  methods: {
    getdata() {
      this.$http({
        method: "get",
        url: "categories"
      }).then(res => {
        let { meta, data } = res.data;
        console.log(data);
        console.log(meta);

        if (meta.status == 200) {
          this.tableData = data;
          console.log(this.tableData);
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style>
.btn {
  margin-top: 20px;
}
</style>
