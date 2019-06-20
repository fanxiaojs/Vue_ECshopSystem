<template>
  <div class="login">
    <div class="content">
      <!-- el-form:表单的管理容器 label-width:显示文本宽度 -->
      <el-form
        label-position="top"
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h2>用户登录</h2>
        <el-form-item label="帐号">
          <el-input type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
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
