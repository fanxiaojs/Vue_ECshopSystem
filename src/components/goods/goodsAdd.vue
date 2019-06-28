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
      <el-tab-pane label="基本信息" name="first">
        <!-- 第一个tab的内容 -->
        <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
          <el-form-item label="商品名称" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="name">
            <!-- 级联选择器 -->
            <el-cascader v-model="catval" :options="catdata" :props="props"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div class="txt" v-for="(item,index) in goodsMany" :key="index">
          <div>{{item.attr_name}}</div>
          <div>
            <el-checkbox
              v-for="(val,index) in item.attr_vals.split(',') "
              :key="index"
              v-model="checked"
              label="备选项1"
              border
            >{{val}}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
          <el-form-item v-for="(item,index) in goodsOnly" :key="index" :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
          :on-remove="remove"
          class="upload-demo"
          :on-success="upsuccess"
          :headers="headers"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          {{upimg}}
        </el-upload>
      </el-tab-pane>
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
      activeName: "first",
      //分类级联选择器的数据源
      catdata: [],
      //级联选择器的配置项
      props: { expandTrigger: "hover", label: "cat_name", value: "cat_id" },
      //级联选择器中的数据
      catval: [],
      //商品参数
      goodsMany: [],
      //商品属性
      goodsOnly: [],
      //控制多选框是否被勾选
      checked: true,
      //设置上传的请求头
      headers: {
        Authorization: localStorage.getItem("token")
      },
      //上传图片的集合
      upimg: []
    };
  },
  methods: {
    //tab选项中的tab被点击的时候触发
    tabC(tag) {
      //让步骤条与tab同步
      this.active = +tag.index;
      //商品参数
      if (tag.index == "1") {
        //判断级联选择器是否选中内容
        if (this.catval.length != 0) {
          //根据分类查询参数
          this.$http({
            url: `categories/${
              this.catval[this.catval.length - 1]
            }/attributes?sel=many`
          }).then(res => {
            let { meta, data } = res.data;
            if (meta.status == 200) {
              //保存商品参数
              this.goodsMany = data;
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$message.error("请选择商品分类");
        }
      }
      if (tag.index == "2") {
        //判断级联选择器是否选中内容
        if (this.catval.length != 0) {
          //根据分类查询参数
          this.$http({
            url: `categories/${
              this.catval[this.catval.length - 1]
            }/attributes?sel=only`
          }).then(res => {
            let { meta, data } = res.data;
            if (meta.status == 200) {
              //保存商品参数
              this.goodsOnly = data;
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$message.error("请选择商品分类");
        }
      }
    },
    //得到级联选择器的数据源
    getcatdata() {
      this.$http({
        url: "categories"
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.catdata = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    //图片上传成执行
    upsuccess(response, file, fileList) {
      console.log(file);
      console.log(response);
      console.log(fileList);
      let { data } = file.response;
      this.upimg.push(data.tmp_path);
    },
    remove(file, fileList) {
      this.fileList.forEach((item, index) => {
        if (item == img) {
          this.fileList.splice(index, 1);
        }
      });
    }
  },
  mounted() {
    this.getcatdata();
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
.el-checkbox.is-bordered.is-checked {
  margin-right: 0;
  margin-top: 5px;
}
.txt {
  margin: 25px 0;
  font-size: 14px;
}
</style>
