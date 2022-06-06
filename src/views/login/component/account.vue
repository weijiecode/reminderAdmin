<template>
  <div class="login-content">
    <div class="content-box">
      <h4 class="login-title">reminder后台管理系统</h4>
      <el-tabs v-model="activeName" class="demo-tabs">
        <transition name="mytrans">
          <el-tab-pane label="用户名登录" name="first">
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="demo-dynamic">
              <el-form-item prop="username">
                <el-input placeholder="请输入用户名" size="large" maxlength="8" clearable :prefix-icon="User"
                  v-model="loginForm.username" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" size="large" maxlength="15" show-password :prefix-icon="Lock"
                  v-model="loginForm.password" />
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入验证码" class="inputcode" size="large" maxlength="4" clearable
                  :prefix-icon="Position" v-model="code" />
                <el-button @click="changecode" size="large" class="codebtn">{{ subcode }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button v-loading.fullscreen.lock="fullscreenLoading" size="large" class="loginbtn" round
                  type="primary" @click="submitForm(loginFormRef)">登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="tip">* 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式</div>
          </el-tab-pane>
        </transition>
        <transition name="mytrans">
          <el-tab-pane label="手机号登录" name="second">
            <el-form :rules="loginRules" :model="loginForm" class="demo-dynamic">
              <el-form-item>
                <el-input placeholder="请输入手机号" size="large" maxlength="8" clearable :prefix-icon="Iphone" />
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入手机验证码" class="inputcode" size="large" maxlength="4" clearable
                  :prefix-icon="Position" />
                <el-button size="large" class="codebtn1">获取验证码</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="large" class="loginbtn" round type="primary">登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="tip">* 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式</div>
          </el-tab-pane>
        </transition>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { signIn, adminLoginData } from "@/api/login";
import { loginData } from "@/types/login";
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus'
// 输入框图标
import { User, Lock, Position, Iphone } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginBox",
  setup() {
    const activeName = ref('first');
    const router = useRouter();
    const loginFormRef = ref<FormInstance>();
    const loginForm = reactive({
      username: '',
      password: ''
    });
    const admininfo = reactive<loginData>({
      username: '',
      ip: ''
    });
    // 验证码
    let code = ref<string>();
    let subcode = ref<string>();
    subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
    // 更改验证码
    const changecode = () => {
      subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
    };

    // code.value = '123'
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
    const fullscreenLoading = ref(false)
    // 登录提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          // console.log('submit!')
          // console.log(code.value)
          // console.log(subcode.value)
          if (code.value === subcode.value) {
            signIn(loginForm).then((res) => {
              console.log(res)
              if (res.data.code == 200) {

                // 获取ip和username赋值给userinfo
                if (localStorage.getItem('adminIP') !== null) {
                  admininfo.username = loginForm.username
                  admininfo.ip = JSON.parse(localStorage.getItem('adminIP') || '')
                  adminLoginData(admininfo).then(res => {
                    console.log(res, '1212')
                  })
                }

                fullscreenLoading.value = true
                setTimeout(() => {
                  fullscreenLoading.value = false
                  router.push('/main');
                }, 1000);
                loginForm.username = '';
                loginForm.password = '';
                localStorage.setItem('admindata', JSON.stringify(res.data.data));
                localStorage.setItem('token', res.data.token);
              } else {
                subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
                ElMessage.error('用户名或密码输入有误，请重新输入');
              }
            })
          } else {
            subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
            ElMessage.error('验证码输入错误，请重新输入');
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    };
    // 用户登录信息添加
    // const addLoginData = () => {

    // };
    return {
      User,
      Lock,
      Position,
      Iphone,
      activeName,
      loginForm,
      code,
      subcode,
      loginFormRef,
      loginRules,
      fullscreenLoading,
      changecode,
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
  margin-top: 5px;
}

.inputcode {
  width: 225px;
}

.codebtn {
  width: 115px;
  margin-top: 5px;
  margin-left: 20px;
  font-weight: bold;
  letter-spacing: 5px;
}

.codebtn1 {
  width: 115px;
  margin-top: 5px;
  margin-left: 20px;
}

.loginbtn {
  width: 360px;
}

.tip {
  font-size: 12px;
  color: #a8abb2;
}

.mytrans-enter-active,
.mytrans-leave-active {
  transition: all .5s;
  opacity: 1;
}

.mytrans-enter {
  transition: all .5s;
  opacity: 0;
}

.mytrans-leave-to {
  transition: all .5s;
  opacity: 0;
}
</style>