<template>
  <el-card>
    <!-- 面包屑导航 -->
    <Bread one="商品管理" two="商品列表"></Bread>
    <!-- 搜索框 -->
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
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="180"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作 ">
        <template></template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="sizeC"
      @current-change="crrC"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
//导入面包屑导航
import Bread from "../layout/bread";
export default {
  components: {
    Bread
  },
  data() {
    return {
      //查询的关键字
      qurey: "",
      //表格的数据源
      tableData: [],
      //控制分页
      pagesizes: [10, 15, 20],
      //总条数
      total: 0,
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 5
    };
  },
  methods: {
    //获取商品列表数据
    getdata() {
      this.$http({
        //请求方式是get 可以省略
        url: `goods?query=${this.qurey}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.tableData = data.goods;
          this.total = data.total;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    //也容量变化时候
    sizeC(pagesize) {
      this.pagesize = pagesize;
      this.getdata();
    },
    //当前页变化时
    crrC(pagenum) {
      this.pagenum = pagenum;
      this.getdata();
    },
    //搜索功能
    search() {
      this.getdata();
    },
    openAdd() {}
  },
  mounted() {
    //开启页面则获取数据
    this.getdata();
  }
};
</script>

<style>
.addusers {
  margin-top: 15px;
  margin-left: 3px;
}
</style>
