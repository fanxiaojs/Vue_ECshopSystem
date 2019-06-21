<template>
  <div class="login">
    <div class="content">
      <!-- el-form:表单的管理容器 label-width:显示文本宽度  rules设置验证规则-->
      <el-form
        label-position="top"
        :model="userObj"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click.prevent.13="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userObj: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          //required: 这个是必填项   message: 如果不填会提示的文本    trigger: 'blur':失去焦点时触发
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      //判断是否发送请求
      this.$refs.ruleForm.validate(valid => {
        //成功
        if (valid) {
          //发送登录请求
          this.$http({
            method: "post",
            url: "http://localhost:8888/api/private/v1/login",
            data: this.userObj
          }).then(res => {
            let { data, meta } = res.data;
            if (meta.status == 200) {
              this.$router.push("/home");
              localStorage.setItem("token", data.token);
              this.$message({
                message: meta.msg,
                type: "success"
              });
            } else {
              this.$message.error(meta.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.content {
  padding: 40px;
  width: 500px;
  height: 440px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  width: 100%;
}
</style>
