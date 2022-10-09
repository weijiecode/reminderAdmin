<template>
  <div class="login-content">
    <div class="content-box">
      <h4 class="login-title">{{ $t("account.title") }}</h4>
      <el-tabs v-model="activeName" class="demo-tabs">
        <transition name="mytrans">
          <el-tab-pane :label="$t('account.userlogin')" name="first">
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="demo-dynamic">
              <el-form-item prop="username">
                <el-input :placeholder="$t('account.inputusername')" size="large" maxlength="8" clearable :prefix-icon="User"
                  v-model="loginForm.username" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input :placeholder="$t('account.inputpassword')" size="large" maxlength="15" show-password :prefix-icon="Lock"
                  v-model="loginForm.password" />
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('account.inputcode')" class="inputcode" size="large" maxlength="4" clearable
                  :prefix-icon="Position" v-model="code" />
                <el-button @click="changecode" size="large" class="codebtn">{{ subcode }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button v-loading.fullscreen.lock="fullscreenLoading" size="large" class="loginbtn" round
                  type="primary" @click="submitForm(loginFormRef)">{{ $t("account.login") }}
                </el-button>
              </el-form-item>
            </el-form>
            <div class="tip">* {{ $t("account.warning") }}</div>
          </el-tab-pane>
        </transition>
        <transition name="mytrans">
          <el-tab-pane :label="$t('account.phonelogin')" name="second">
            <el-form :rules="loginRules" :model="loginForm" class="demo-dynamic">
              <el-form-item>
                <el-input :placeholder="$t('account.inputphone')" size="large" maxlength="8" clearable :prefix-icon="Iphone" />
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('account.inputcode')" class="inputcode" size="large" maxlength="4" clearable
                  :prefix-icon="Position" />
                <el-button size="large" class="codebtn1">{{ $t("account.getcode") }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="large" class="loginbtn" round type="primary">{{ $t("account.login") }}
                </el-button>
              </el-form-item>
            </el-form>
            <div class="tip">* {{ $t("account.warning") }}</div>
          </el-tab-pane>
        </transition>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Cookies from 'js-cookie';
import { signIn, adminLoginData } from "@/api/login";
import { loginData } from "@/types/login";
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus'
// 输入框图标
import { User, Lock, Position, Iphone } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: "LoginBox",
  setup() {
    
    const activeName = ref('first');
    const router = useRouter();
    const loginFormRef = ref<FormInstance>();
    // 获取vuex对象
    let store = useStore()

    // 刷新页面获取当前语言参数
    const { t } = useI18n();
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
        { required: true, message: t("account.inputusername"), trigger: "blur" },
        { min: 4, max: 8, message: t("account.lengthuser"), trigger: "blur" },
      ],
      password: [
        { required: true, message: t("account.inputpassword"), trigger: "blur" },
        { min: 6, max: 15, message: t("account.lengthpwd"), trigger: "blur" },
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
              if (res.code == 200) {
                // 获取ip和username赋值给userinfo
                if (localStorage.getItem('adminIP') !== null) {
                  admininfo.username = loginForm.username
                  admininfo.ip = JSON.parse(localStorage.getItem('adminIP') || '')
                  // 如果主题色未赋值则默认light
                  if (!store.state.themetype) {
                    store.commit("updatetheme", "light")
                  }
                  // 添加登录信息
                  adminLoginData(admininfo)
                }

                fullscreenLoading.value = true
                setTimeout(() => {
                  // fullscreenLoading.value = false
                  router.push('/main');
                }, 1000);
                loginForm.username = '';
                loginForm.password = '';
                code.value = '';
                //console.log(res.data)
                Cookies.set('token', res.token, { expires: 7 });
                localStorage.setItem('admindata', JSON.stringify(res.data));
                // localStorage.setItem('token', res.data.token);
              } else {
                subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
                ElMessage.error(t("account.warninglogin"));
              }
            })
          } else {
            subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
            ElMessage.error(t("account.warningcode"));
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
  background-color: var(--themeColor);
  border: 5px solid var(--tabborder);
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