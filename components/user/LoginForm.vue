<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item  prop="username">
        <el-input v-model="formData.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="button-primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
          username:"",
          password:""
      },
      rules:{
           username: [
            { required: true, message: '请输入用户名或手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
.demo-ruleForm{
    padding: 25px;
    .button-primary{
        width: 100%;
    }
}
</style>


