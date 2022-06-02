<template>
  <div class="login-content">
    <div class="content-box">
      <h4 class="login-title">reminder后台管理系统</h4>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="用户名登录" name="first">

          <el-form hide-required-asterisk="false" ref="loginFormRef" :rules="loginRules" :model="loginForm" class="demo-dynamic">
            <el-form-item prop="username">
              <el-input size="large" maxlength="8" clearable :prefix-icon="User" v-model="loginForm.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input size="large" maxlength="15" show-password :prefix-icon="Lock" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
              <el-input class="inputcode" size="large" maxlength="4" clearable :prefix-icon="Position" v-model="loginForm.code" />
              <el-button size="large" class="codebtn">Default</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="large" class="loginbtn" round type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>


        <el-tab-pane label="手机号登录" name="second">手机号登录</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { loginFormState } from "@/types/login";
import type { FormInstance, FormRules } from 'element-plus';
// 输入框图标
import { User, Lock, Position } from '@element-plus/icons-vue'
export default defineComponent({
  name: "LoginBox",
  setup() {
    const activeName = ref('first');
    const loginFormRef = ref<FormInstance>();
    const loginForm = reactive<loginFormState>({
      username: '',
      password: '',
      code: ''
    });
    const loginRules = reactive<FormRules>({
      username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 4, max: 8, message: "账号长度需要在4-8位", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 15, message: "密码长度需要在6-15位", trigger: "blur" },
      ]
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    };
    return {
      User,
      Lock,
      Position,
      activeName,
      loginForm,
      loginFormRef,
      loginRules,
      ...toRefs(loginRules),
      submitForm
    };
  },
});
</script>
<style lang="scss" scoped>
.login-content {
  width: 500px;
  padding: 20px;
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%) translate3d(0, 0, 0);
  background-color: #ffffff;
  border: 5px solid #d8ebff;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  height: 460px;
}

@media screen and (max-width: 992px) {
  .login-content {
    right: unset !important;
    left: 50% !important;
    transform: translate(-50%, -50%) translate3d(0, 0, 0) !important;
  }
}

.content-box {
  margin: 0 auto;
  width: 80%;

  h4 {
    color: #303133;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    letter-spacing: 4px;
    margin: 15px 0 30px;
    white-space: nowrap;
    z-index: 5;
    position: relative;
    transition: all 0.3s ease;
    text-align: center;
    font-size: 25px;
  }
}

.el-input {
  margin-top: 10px;
}

.inputcode{
  width: 225px;
}
.codebtn {
  width: 115px;
  margin-top: 10px;
  margin-left: 20px;
}

.loginbtn {
  width: 360px;
}

</style>