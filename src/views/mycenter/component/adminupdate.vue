<template>
  <div class="content">
    <p class="toptitle">{{ $t("mycenter.updateinformation") }}</p>
    <div class="adminstate">
      <div class="bothtitle">
        <div class="block"></div>
        <p class="subtitle">{{ $t("mycenter.essentialinformation") }}</p>
      </div>
      <div class="adminform">
        <el-form :model="adminForm" class="demo-dynamic">
          <el-form-item :label="$t('mycenter.nickname')">
            <el-input v-model="adminForm.nickname" :placeholder="$t('mycenter.inputnickname')" maxlength="8" clearable />
          </el-form-item>
          <el-form-item :label="$t('mycenter.sex')">
            <!-- <el-select v-model="sexvalue" placeholder="Select">
            <el-option label="男" :value="sexvalue"/>
            <el-option label="女" :value="sexvalue"/>
          </el-select> -->
            <el-select v-model="adminForm.sex" :placeholder="$t('mycenter.inputsex')">
              <el-option value="1" :label="$t('mycenter.male')" />
              <el-option value="0" :label="$t('mycenter.female')" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('mycenter.phone')">
            <el-input v-model="adminForm.phone" :placeholder="$t('mycenter.inputphone')" maxlength="11" clearable />
          </el-form-item>
          <el-form-item :label="$t('mycenter.email')">
            <el-input v-model="adminForm.email" :placeholder="$t('mycenter.inputemail')" maxlength="30" clearable />
          </el-form-item>
          <el-form-item :label="$t('mycenter.introduction')" style="float: none;">
            <el-input v-model="adminForm.introduction" :placeholder="$t('mycenter.inputintroduction')" maxlength="30" clearable />
          </el-form-item>
          <el-form-item style="float: none;">
            <el-button type="primary" :icon="EditPen" @click="submitAdminForm">{{ $t("mycenter.updateinformation") }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bothtitle">
        <div class="block"></div>
        <p class="subtitle">{{ $t("mycenter.accountsecurity") }}</p>
      </div>
      <div class="safe">
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">{{ $t("mycenter.accountpassword") }}</p>
            <p class="twop">{{ $t("mycenter.passwordstrength") }}</p>
          </div>
          <div class="rights">
            <el-button type="primary" @click="dialogFormVisiblePass = true">{{ $t("mycenter.modifynow") }}</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">{{ $t("mycenter.accountphone") }}</p>
            <p class="twop">{{ phoneShow }}</p>
          </div>
          <div class="rights">
            <el-button type="primary" @click="dialogFormVisiblePhone = true">{{ $t("mycenter.bindnow") }}</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">{{ $t("mycenter.accountquestion") }}</p>
            <p class="twop">{{ questionShow }}</p>
          </div>
          <div class="rights">
            <el-button type="primary" @click="dialogFormVisibleQuestion = true">{{ $t("mycenter.settingnow") }}</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">{{ $t("mycenter.accountqq") }}</p>
            <p class="twop">{{ qqShow }}</p>
          </div>
          <div class="rights">
            <el-button type="primary" @click="dialogFormVisibleQq = true">{{ $t("mycenter.bindnow") }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog v-model="dialogFormVisiblePass" :title="$t('mycenter.passwordupdate')">
      <el-form :model="passForm">
        <el-form-item :label="$t('mycenter.newpassword')">
          <el-input maxlength="15" v-model="passForm.newpassword" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('mycenter.oldpassword')">
          <el-input maxlength="15" v-model="passForm.oldpassword" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('mycenter.code')">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button style="backgroundColor:var(--themeColor);border: 2px solid var(--tabborder);" @click="changecode"
            class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisiblePass = false">{{ $t("mycenter.cancel") }}</el-button>
          <el-button type="primary" @click="submitPass">{{ $t("mycenter.confirmupdate") }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密保手机 -->
    <el-dialog v-model="dialogFormVisiblePhone" :title="$t('mycenter.passwordupdate')">
      <el-form>
        <el-form-item :label="$t('mycenter.phone')">
          <el-input maxlength="11" v-model="phone" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('mycenter.code')">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button style="backgroundColor:var(--themeColor);border: 2px solid var(--tabborder);" @click="changecode"
            class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisiblePhone = false">{{ $t("mycenter.cancel") }}</el-button>
          <el-button type="primary" @click="submitPhone">{{ $t("mycenter.confirmupdate") }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密保问题 -->
    <el-dialog v-model="dialogFormVisibleQuestion" :title="$t('mycenter.questionupdate')">
      <el-form>
        <el-form-item :label="$t('mycenter.question')">
          <el-input maxlength="30" v-model="questionForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('mycenter.answer')">
          <el-input maxlength="30" v-model="questionForm.answer" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('mycenter.code')">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button style="backgroundColor:var(--themeColor);border: 2px solid var(--tabborder);" @click="changecode"
            class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleQuestion = false">{{ $t("mycenter.cancel") }}</el-button>
          <el-button type="primary" @click="submitQuestion">{{ $t("mycenter.confirmupdate") }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改qq -->
    <el-dialog v-model="dialogFormVisibleQq" :title="$t('mycenter.passwordupdate')">
      <el-form>
        <el-form-item label-width="70px" :label="$t('mycenter.qqnumber')">
          <el-input maxlength="13" v-model="qq" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="70px" :label="$t('mycenter.code')">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button style="backgroundColor:var(--themeColor);border: 2px solid var(--tabborder);" @click="changecode"
            class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleQq = false">{{ $t("mycenter.cancel") }}</el-button>
          <el-button type="primary" @click="submitQq">{{ $t("mycenter.confirmupdate") }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { EditPen } from '@element-plus/icons-vue';
import { updateAdmin, selectSafe, updatepassword, addsafe, updatePhone, updateQuestion, updateQq } from '@/api/mycenter';
import { ElMessage } from 'element-plus';
import { useI18n } from "vue-i18n"
// import { useStore } from 'vuex'


export default defineComponent({
  name: 'AdminUpdate',
  components: {
  },
  setup() {
    const { t } = useI18n()
    const dialogFormVisiblePass = ref(false);
    const dialogFormVisiblePhone = ref(false);
    const dialogFormVisibleQuestion = ref(false);
    const dialogFormVisibleQq = ref(false);
    const phoneShow = ref(t('mycenter.nophone'));
    const questionShow = ref(t('mycenter.noquestion'));
    const qqShow = ref(t('mycenter.noqq'));
    // 获取主题类型
    // const getTheme = computed(() => {
    //   return store.state.themetype
    // })
    // let store = useStore()
    // // 监听主题参数是否变化
    // const themetype = ref('')
    // const btntype = ref<any>('primary')
    // watch(getTheme, (newValue) => {
    //   // console.log('change', newValue)
    //   if (newValue === 'light') {
    //     btntype.value = 'primary'
    //   } else if (newValue === 'dark') {
    //     btntype.value = 'info'
    //   }
    // }, { immediate: true, deep: true })
    // themetype.value = localStorage.getItem('theme') || ''
    // // themetype.value = store.state.themetype
    // if (themetype.value === 'light') {
    //   btntype.value = 'primary'
    // } else if (themetype.value === 'dark') {
    //   btntype.value = 'info'
    // }

    // 管理员表单信息
    const adminForm = reactive({
      nickname: '',
      sex: '0',
      phone: '',
      email: '',
      introduction: ''
    });
    // 密码
    const passForm = reactive({
      newpassword: '',
      oldpassword: ''
    });
    // 所有信息
    const allForm = reactive({
      phone: '',
      question: '',
      answer: '',
      qq: ''
    });
    // 手机密保
    const phone = ref('');
    // 密保问题
    const questionForm = reactive({
      question: '',
      answer: ''
    });
    // QQ
    const qq = ref('');
    // 保存账号安全的信息
    const safeData = reactive({
      phone: '',
      question: '',
      answer: '',
      qq: ''
    });
    const isaddsafe = ref(false);
    onMounted(() => {
      adminForm.nickname = JSON.parse(localStorage.getItem('admindata') || '').nickname
      adminForm.sex = JSON.parse(localStorage.getItem('admindata') || '').sex
      adminForm.phone = JSON.parse(localStorage.getItem('admindata') || '').phone
      adminForm.email = JSON.parse(localStorage.getItem('admindata') || '').email
      adminForm.introduction = JSON.parse(localStorage.getItem('admindata') || '').introduction
      selectSafe().then(res => {
        // console.log("安全信息：", res)
        if (res.code === 201) {
          isaddsafe.value = false
          phoneShow.value = t('mycenter.nophone')
          console.log(isaddsafe.value, '1')
        } else {
          safeData.phone = res.data.phone || '';
          safeData.question = res.data.question || '';
          safeData.answer = res.data.answer || '';
          safeData.qq = res.data.qq || '';
          isaddsafe.value = true
          // console.log(isaddsafe.value, '2')
          if (res.data.phone === null || res.data.phone === '') {
            phoneShow.value = t('mycenter.nophone');
          } else {
            phoneShow.value = res.data.phone.substring(0, 3) + '****' + res.data.phone.substring(7, 11);
          }
          if (res.data.question === null || res.data.question === '') {
            questionShow.value = t('mycenter.noquestion');
          } else {
            questionShow.value = t('mycenter.questionhint');
          }
          if (res.data.qq === null || res.data.qq === '') {
            qqShow.value = t('mycenter.noqq');
          } else {
            qqShow.value = t('mycenter.qqed') + res.data.qq.substring(0, 4) + '*****';
          }
        }
      })
    });
    // 更新表单数据
    const submitAdminForm = () => {
      updateAdmin(adminForm).then(res => {
        // console.log("更新结果：", res)
        if (res.code === 200) {
          ElMessage({
            message: t('mycenter.updatesuccess'),
            type: 'success',
          })
          localStorage.setItem('admindata', JSON.stringify(adminForm));
        } else {
          ElMessage({
            message: t('mycenter.updateerror'),
            type: 'error'
          })
        }
      });
    };
    // 验证码
    let code = ref();
    let subcode = ref();
    subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
    // 更改验证码
    const changecode = () => {
      subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
    };
    // 修改密码
    const submitPass = () => {
      if (code.value === subcode.value && passForm.newpassword !== '' && passForm.oldpassword !== '') {
        updatepassword(passForm).then(res => {
          // console.log(res)
          if (res.code === 200) {
            passForm.newpassword = '';
            passForm.oldpassword = '';
            code.value = '';
            dialogFormVisiblePass.value = false;
            ElMessage({
              message: t('mycenter.passwordsuccess'),
              type: 'success',
            })
          } else {
            subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
            ElMessage.error(t('mycenter.olderror'));
          }
        });
      } else {
        subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
        ElMessage.error(t('mycenter.passworderror'));
      }
    };
    // 修改绑定手机号
    const submitPhone = () => {
      if (phone.value.length !== 11) { ElMessage.error(t('mycenter.inputcheckphone')); } else {
        if (isaddsafe.value) {
          updatePhone({ phone: phone.value }).then(res => {
            console.log(res);
            if (res.code === 200) {
              ElMessage({
                message: t('mycenter.phonesuccess'),
                type: 'success',
              });
              safeData.phone = phone.value
              phoneShow.value = phone.value.substring(0, 3) + '****' + phone.value.substring(7, 11);
              phone.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisiblePhone.value = false
            } else {
              ElMessage.error(t('mycenter.binderror'));
            }
          })
        } else {
          allForm.phone = phone.value;
          allForm.question = safeData.question;
          allForm.answer = safeData.answer;
          allForm.qq = safeData.qq;
          addsafe(allForm).then(res => {
            // console.log("添加返回信息：", res);
            if (res.code === 200) {
              ElMessage({
                message: t('mycenter.bindsuccess'),
                type: 'success',
              });
              safeData.phone = phone.value
              phoneShow.value = phone.value.substring(0, 3) + '****' + phone.value.substring(7, 11);
              phone.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisiblePhone.value = false
            }
          });
        }
      }

    };
    // 修改密保问题
    const submitQuestion = () => {
      if (questionForm.question.length === 0 || questionForm.answer.length === 0) { ElMessage.error(t('mycenter.inputcheckquestion')); }
      if (isaddsafe.value && questionForm.question.length !== 0 && questionForm.answer.length !== 0) {
        updateQuestion(questionForm).then(res => {
          console.log(res);
          if (res.code === 200) {
            ElMessage({
              message: t('mycenter.questionsuccess'),
              type: 'success',
            });
            safeData.question = questionForm.question;
            safeData.answer = questionForm.answer;
            questionShow.value = t('mycenter.questionhint');
            questionForm.question = '';
            questionForm.answer = '';
            code.value = '';
            isaddsafe.value = true;
            dialogFormVisibleQuestion.value = false;
          } else {
            ElMessage.error(t('mycenter.questionerror'));
          }
        })
      } else {
        allForm.question = questionForm.question;
        allForm.answer = questionForm.answer;
        allForm.phone = safeData.phone;
        allForm.qq = safeData.qq;
        addsafe(allForm).then(res => {
          console.log(res);
          if (res.code === 200) {
            ElMessage({
              message: t('mycenter.settingquestion'),
              type: 'success',
            });
            questionShow.value = t('mycenter.questionhint');
            questionForm.question = '';
            questionForm.answer = '';
            code.value = ''
            isaddsafe.value = true;
            dialogFormVisibleQuestion.value = false
          }
        });
      }
    };
    // 修改qq
    const submitQq = () => {
      if (qq.value.length === 0) { ElMessage.error(t('mycenter.checkqq')); } else {
        if (isaddsafe.value) {
          updateQq({ qq: qq.value }).then(res => {
            console.log(res);
            if (res.code === 200) {
              ElMessage({
                message: t('mycenter.updateqqsuccess'),
                type: 'success',
              });
              safeData.qq = qq.value
              qqShow.value = t('mycenter.qqed')+ ':' + qq.value.substring(0, 4) + '*****';
              qq.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisibleQq.value = false
            } else {
              ElMessage.error(t('mycenter.updateqqerror'));
            }
          })
        } else {
          allForm.phone = phone.value;
          allForm.question = safeData.question;
          allForm.answer = safeData.answer;
          allForm.qq = qq.value;
          addsafe(allForm).then(res => {
            console.log(res);
            if (res.code === 200) {
              ElMessage({
                message: t('mycenter.updateqqsuccess'),
                type: 'success',
              });
              safeData.phone = phone.value
              qqShow.value = t('mycenter.qqed') + qq.value.substring(0, 4) + '*****';
              qq.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisibleQq.value = false
            }
          });
        }
      }

    };
    return {
      EditPen,
      adminForm,
      submitAdminForm,
      passForm,
      dialogFormVisiblePass,
      dialogFormVisiblePhone,
      dialogFormVisibleQuestion,
      dialogFormVisibleQq,
      submitPass,
      submitPhone,
      submitQuestion,
      submitQq,
      changecode,
      code,
      subcode,
      phone,
      questionForm,
      qq,
      phoneShow,
      questionShow,
      qqShow,
      // btntype
    }
  }
});
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  background-color: var(--themeColor) !important;
}


.content {
  width: 98%;
  margin: 0 auto;
  margin-top: 15px;
  background-color: var(--themeColor);
  border: 1px solid var(--tabborder);
  margin-bottom: 10px;
}

.content:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

.toptitle {
  padding: 15px 20px;
  margin-bottom: 10px;
  color: #303133;
  border-bottom: 1px solid var(--tabborder);
}

::v-deep .el-input__wrapper {
  background-color: var(--themeColor);
  border: 1px solid var(--tabborder) !important;
  box-shadow: none;
}

.adminstate {
  padding: 5px 20px;

  .bothtitle {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .block {
      width: 3px;
      height: 10px;
      background-color: #518BF1;
    }

    .subtitle {
      margin-left: 10px;
      color: #303133;
    }
  }
}

.adminform {
  .el-button {
    margin-left: 40px;
  }
}

@media screen and (min-width: 760px) {
  .adminform {
    .el-form-item {
      width: 20%;
      float: left;
      margin-right: 20px;
    }
  }
}

@media screen and (max-width: 760px) {
  .adminform {
    .el-form-item {
      width: 40%;
      float: left;
      margin-right: 15px;
    }
  }
}

@media screen and (max-width: 700px) {
  .adminform {
    .el-form-item {
      width: 100%;
      float: left;
      margin-right: 15px;
    }
  }
}

.adminform {
  padding-top: 15px;
  padding-bottom: 15px;
}

.safe {
  display: flex;
  flex-direction: column;
}

.safeitem {
  height: 74px;
  border-bottom: 1px solid var(--tabborder);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lefts {
    display: flex;
    flex-direction: column;

    .onep {
      color: #606266;
      font-size: 14px;
    }

    .twop {
      color: #909399;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}

.safeitem:nth-of-type(4) {
  height: 74px;
  border-bottom: 1px solid var(--tabborder);
}

.codebtn {
  width: 115px;
  margin-left: 20px;
  font-weight: bold;
  letter-spacing: 5px;
}

.inputcode {
  width: 225px;
}
</style>
