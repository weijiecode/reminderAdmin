<template>
  <div class="content">
    <p class="toptitle">个人信息</p>
    <div class="bottomcontent">
      <img class="imgphoto" src="../../../assets/t.jpeg" alt="">
      <div class="userdata">
        <p>夜里好，admin，生活变的再糟糕，也不妨碍我变得更好！</p>
        <div class="both">
          <div class="left">
            <div>用户名：<span>{{username}}</span></div>
            <div>上次登录IP: <span>{{ip}}</span></div>
          </div>
          <div class="right">
            <div>身份：<span>超级管理员</span></div>
            <div>上次登录时间: <span>{{createtime}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { dataLogin } from '@/api/mycenter'

export default defineComponent({
  name: 'DataShow',
  setup() {
    const logindata = reactive({
      username: '',
      createtime: '',
      ip: '',
    });
    onMounted(() => {
      dataLogin().then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          logindata.username = res.data.data.pop().username
          logindata.createtime = res.data.data.pop().createtime
          logindata.ip = res.data.data.pop().ip
        }
      })
    });
    return {
      ...toRefs(logindata)
    }
  }
});
</script>
<style scoped lang="scss">
.content {
  width: 98%;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #f1f2f3;
}

.content:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

.toptitle {
  padding: 15px 20px;
  color: #303133;
  border-bottom: 1px solid #e4e7ed;
}

.bottomcontent {
  display: flex;
  align-items: center;
  padding: 15px 20px;

  .imgphoto {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .userdata {
    margin-left: 30px;
    display: flex;
    flex-direction: column;

    p {
      color: #303133;
      font-size: 18px;
    }

    .both {
      margin-top: 15px;
      display: flex;

      .left {
        div {
          margin-top: 10px;
          color: #909399;
          font-size: 13px;

          span {
            color: #303133;
          }
        }
      }

      .right {
        margin-left: 50px;

        div {
          margin-top: 10px;
          color: #909399;
          font-size: 13px;

          span {
            color: #303133;
          }
        }
      }
    }
  }
}
</style>
