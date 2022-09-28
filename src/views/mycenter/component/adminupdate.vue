<template>
  <div class="content">
    <p class="toptitle">更新信息</p>
    <div class="adminstate">
      <div class="bothtitle">
        <div class="block"></div>
        <p class="subtitle">基本信息</p>
      </div>
      <div class="adminform">
        <el-form :model="adminForm" class="demo-dynamic">
          <el-form-item label="昵称">
            <el-input v-model="adminForm.nickname" placeholder="请输入昵称" maxlength="8" clearable />
          </el-form-item>
          <el-form-item label="性别">
            <!-- <el-select v-model="sexvalue" placeholder="Select">
            <el-option label="男" :value="sexvalue"/>
            <el-option label="女" :value="sexvalue"/>
          </el-select> -->
            <el-select v-model="adminForm.sex" placeholder="请选择性别">
              <el-option value="1" label="男" />
              <el-option value="0" label="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="adminForm.phone" placeholder="请输入手机号" maxlength="11" clearable />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="adminForm.email" placeholder="请输入邮箱" maxlength="30" clearable />
          </el-form-item>
          <el-form-item label="简介" style="float: none;">
            <el-input v-model="adminForm.introduction" placeholder="请输入简介" maxlength="30" clearable />
          </el-form-item>
          <el-form-item style="float: none;">
            <el-button type="primary" :icon="EditPen" @click="submitAdminForm">更新信息</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bothtitle">
        <div class="block"></div>
        <p class="subtitle">账号安全</p>
      </div>
      <div class="safe">
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">账户密码</p>
            <p class="twop">当前密码强度： 中</p>
          </div>
          <div class="rights">
            <el-button @click="dialogFormVisiblePass = true">立即修改</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">密保手机</p>
            <p class="twop">{{ phoneShow }}</p>
          </div>
          <div class="rights">
            <el-button @click="dialogFormVisiblePhone = true">立即绑定</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">密保问题</p>
            <p class="twop">{{ questionShow }}</p>
          </div>
          <div class="rights">
            <el-button @click="dialogFormVisibleQuestion = true">立即设置</el-button>
          </div>
        </div>
        <div class="safeitem">
          <div class="lefts">
            <p class="onep">绑定QQ</p>
            <p class="twop">{{ qqShow }}</p>
          </div>
          <div class="rights">
            <el-button @click="dialogFormVisibleQq = true">立即绑定</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog v-model="dialogFormVisiblePass" title="密码修改">
      <el-form :model="passForm">
        <el-form-item label="新密码">
          <el-input maxlength="15" v-model="passForm.newpassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input maxlength="15" v-model="passForm.oldpassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button @click="changecode" class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisiblePass = false">取消</el-button>
          <el-button type="primary" @click="submitPass">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密保手机 -->
    <el-dialog v-model="dialogFormVisiblePhone" title="密码修改">
      <el-form>
        <el-form-item label="手机号">
          <el-input maxlength="11" v-model="phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button @click="changecode" class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisiblePhone = false">取消</el-button>
          <el-button type="primary" @click="submitPhone">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密保问题 -->
    <el-dialog v-model="dialogFormVisibleQuestion" title="密码修改">
      <el-form>
        <el-form-item label-width="54px" label="问题">
          <el-input maxlength="30" v-model="questionForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="54px" label="答案">
          <el-input maxlength="30" v-model="questionForm.answer" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="54px" label="验证码">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button @click="changecode" class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleQuestion = false">取消</el-button>
          <el-button type="primary" @click="submitQuestion">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改qq -->
    <el-dialog v-model="dialogFormVisibleQq" title="密码修改">
      <el-form>
        <el-form-item label-width="70px" label="QQ号码">
          <el-input maxlength="13" v-model="qq" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="70px" label="验证码">
          <el-input maxlength="4" class="inputcode" v-model="code" autocomplete="off" />
          <el-button @click="changecode" class="codebtn">{{ subcode }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleQq = false">取消</el-button>
          <el-button type="primary" @click="submitQq">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, toRefs } from 'vue';
import { EditPen } from '@element-plus/icons-vue';
import { updateAdmin, selectSafe, updatepassword, addsafe, updatePhone, updateQuestion, updateQq } from '@/api/mycenter';
import { ElMessage } from 'element-plus';


export default defineComponent({
  name: 'AdminUpdate',
  components: {
  },
  setup() {
    const dialogFormVisiblePass = ref(false);
    const dialogFormVisiblePhone = ref(false);
    const dialogFormVisibleQuestion = ref(false);
    const dialogFormVisibleQq = ref(false);
    const phoneShow = ref('暂无绑定手机');
    const questionShow = ref('暂无设置密保问题');
    const qqShow = ref('暂无设置QQ绑定');
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
    const isaddsafe = ref<boolean>(false);
    onMounted(() => {
      adminForm.nickname = JSON.parse(localStorage.getItem('admindata') || '').nickname
      adminForm.sex = JSON.parse(localStorage.getItem('admindata') || '').sex
      adminForm.phone = JSON.parse(localStorage.getItem('admindata') || '').phone
      adminForm.email = JSON.parse(localStorage.getItem('admindata') || '').email
      adminForm.introduction = JSON.parse(localStorage.getItem('admindata') || '').introduction
      selectSafe().then(res => {
        // console.log(res, '333')
        if (res.data.code === 201) {
          isaddsafe.value = false
          phoneShow.value = '暂无绑定手机'
          console.log(isaddsafe.value, '1')
        } else {
          safeData.phone = res.data.data[0].phone;
          safeData.question = res.data.data[0].question;
          safeData.answer = res.data.data[0].answer;
          safeData.qq = res.data.data[0].qq;
          isaddsafe.value = true
          console.log(isaddsafe.value, '2')
          if (res.data.data[0].phone !== '') {
            phoneShow.value = res.data.data[0].phone.substring(0, 3) + '****' + res.data.data[0].phone.substring(7, 11);
          }
          if (res.data.data[0].question !== '') {
            questionShow.value = '已设置密保问题，账号安全大幅度提升';
          }
          if (res.data.data[0].qq !== '') {
            qqShow.value = '已绑定QQ：' + res.data.data[0].qq.substring(0, 4) + '*****';
          }
        }
      })
    });
    // 更新表单数据
    const submitAdminForm = () => {
      updateAdmin(adminForm).then(res => {
        console.log("更新结果：",res)
        if (res.code === 200) {
          localStorage.setItem('admindata', JSON.stringify(adminForm));
          ElMessage({
            message: '更新信息成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '更新信息失败,请重试',
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
          console.log(res)
          if (res.data.code === 200) {
            passForm.newpassword = '';
            passForm.oldpassword = '';
            code.value = '';
            dialogFormVisiblePass.value = false;
            ElMessage({
              message: '修改密码成功',
              type: 'success',
            })
          } else {
            subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
            ElMessage.error('旧密码错误，请重新输入');
          }
        });
      } else {
        subcode.value = (Math.floor(Math.random() * 4000 + 1000)).toString()
        ElMessage.error('输入错误，请重新输入');
      }
    };
    // 修改绑定手机号
    const submitPhone = () => {
      if (phone.value.length !== 11) { ElMessage.error('请输入正确的手机号'); } else {
        if (isaddsafe.value) {
          updatePhone({ phone: phone.value }).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                message: '修改密保手机成功',
                type: 'success',
              });
              safeData.phone = phone.value
              phoneShow.value = phone.value.substring(0, 3) + '****' + phone.value.substring(7, 11);
              phone.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisiblePhone.value = false
            } else {
              ElMessage.error('绑定失败，请重试');
            }
          })
        } else {
          allForm.phone = phone.value;
          allForm.question = safeData.question;
          allForm.answer = safeData.answer;
          allForm.qq = safeData.qq;
          addsafe(allForm).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                message: '绑定密保手机成功',
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
      if (questionForm.question.length === 0 || questionForm.answer.length === 0) { ElMessage.error('请输入正确格式的问题和答案'); }
      if (isaddsafe.value && questionForm.question.length !== 0 && questionForm.answer.length !== 0) {
        updateQuestion(questionForm).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            ElMessage({
              message: '修改密保问题成功',
              type: 'success',
            });
            safeData.question = questionForm.question;
            safeData.answer = questionForm.answer;
            questionShow.value = '已设置密保问题，账号安全大幅度提升';
            questionForm.question = '';
            questionForm.answer = '';
            code.value = '';
            isaddsafe.value = true;
            dialogFormVisibleQuestion.value = false;
          } else {
            ElMessage.error('修改密保问题失败，请重试');
          }
        })
      } else {
        allForm.question = questionForm.question;
        allForm.answer = questionForm.answer;
        allForm.phone = safeData.phone;
        allForm.qq = safeData.qq;
        addsafe(allForm).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            ElMessage({
              message: '设置密保问题成功',
              type: 'success',
            });
            questionShow.value = '已设置密保问题，账号安全大幅度提升';
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
      if (qq.value.length === 0) { ElMessage.error('请输入正确的QQ号码'); } else {
        if (isaddsafe.value) {
          updateQq({ qq: qq.value }).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                message: '修改QQ号码绑定成功',
                type: 'success',
              });
              safeData.qq = qq.value
              qqShow.value = '已绑定QQ：' + qq.value.substring(0, 4) + '*****';
              qq.value = ''
              code.value = ''
              isaddsafe.value = true;
              dialogFormVisibleQq.value = false
            } else {
              ElMessage.error('绑定QQ号码失败，请重试');
            }
          })
        } else {
          allForm.phone = phone.value;
          allForm.question = safeData.question;
          allForm.answer = safeData.answer;
          allForm.qq = qq.value;
          addsafe(allForm).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                message: '绑定QQ号码成功',
                type: 'success',
              });
              safeData.phone = phone.value
              qqShow.value = '已绑定QQ：' + qq.value.substring(0, 4) + '*****';
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
      qqShow
    }
  }
});
</script>
<style scoped lang="scss">
.content {
  width: 98%;
  margin: 0 auto;
  margin-top: 15px;
  background-color: #ffffff;
  border: 1px solid #f1f2f3;
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
  border-bottom: 1px solid #e4e7ed;
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
  border-bottom: 1px solid #e4e7ed;
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
  border-bottom: 1px solid #ffffff;
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
