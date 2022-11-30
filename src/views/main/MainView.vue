<template>
  <div class="main">
    <div class="oneitem">
      <div class="subone">
        <div class="databox">
          <p class="pone">{{countAll.s1}}</p>
          <p class="ptwo">{{'+'+countAll.allc+'%'}}</p>
          <p class="pthree">{{ $t("main.totalflow") }}</p>
        </div>
        <div class="iconbox" style="background-color: var(--iconbox1);">
          <i class="iconfont icon-liuliangtongji" style="color: #409eff;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">{{countAll.s2}}</p>
          <p v-if="(countAll.todayc+'').indexOf('-')!=-1" class="ptwo" style="color: #6690f9;">{{'-'+countAll.todayc+'%'}}</p>
          <p v-if="(countAll.todayc+'').indexOf('-')==-1" class="ptwo">{{'+'+countAll.todayc+'%'}}</p>
          <p class="pthree">{{ $t("main.todayflow") }}</p>
        </div>
        <div class="iconbox" style="background-color: var(--iconbox2);">
          <i class="iconfont icon-liuliang" style="color: #67c23a;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">{{countAll.s3}}</p>
          <p class="ptwo">{{'+'+countAll.regc+'%'}}</p>
          <p class="pthree">{{ $t("main.usernum") }}</p>
        </div>
        <div class="iconbox" style="background-color: var(--iconbox3);">
          <i class="iconfont icon-ren-duoren" style="color: #e6a23c;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">{{countAll.s4}}</p>
          <p class="ptwo">{{'+'+countAll.blockc+'%'}}</p>
          <p class="pthree">{{ $t("main.todonum") }}</p>
        </div>
        <div class="iconbox" style="background-color: var(--iconbox4);">
          <i class="iconfont icon-daibantixing" style="color: #f56c6c;font-size:34px;"></i>
        </div>
      </div>
    </div>
    <div class="oneechartsview">
      <CrossEcharts></CrossEcharts>
      <UserList :tableData="tableData" :userData="userData"></UserList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import CrossEcharts from '@/views/main/component/crossecharts.vue';
import UserList from '@/views/main/component/userlist.vue';
import { countData, loginData, newuserData } from '@/api/main'
import { logininfo, newuser } from "@/types/main";

export default defineComponent({
  name: 'MainView',
  components: {
    CrossEcharts,
    UserList
  },
  setup() {
    const state = reactive({
      countAll: {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
        todayc: 0,
        allc: 0,
        regc: 0,
        blockc: 0
      },
      tableData: [] as logininfo[],
      userData: [] as newuser[]
    })

    const { countAll, tableData, userData } = toRefs(state)
    const getCountData = () => {
      countData().then( res => {
        // console.log(res)
        if(res.code === 200){
          countAll.value = res.data
        }
      })
    }
    // 获取首页统计数据
    getCountData()
    const getLoginInfo = () => {
      loginData().then( res => {
        if(res.code === 200){
          let arruser = [] as string[]
          tableData.value = []
          for(let i in res.data){
            if(arruser.indexOf(res.data[i].username) == -1){
              tableData.value.push(res.data[i])
              arruser.push(res.data[i].username)
            }
          }
          // 截取前4条数据
          tableData.value = tableData.value.slice(0,4)
          // 处理访问时间
          tableData.value.forEach((item, index) => {
            tableData.value[index].createtime = item.createtime.substring(5,item.createtime.length)
          })
          
        }
      })
    }
    // 获取用户登录数据
    getLoginInfo()
    const getNewUser = () => {
      newuserData().then( res => {
        if(res.code === 200){
          userData.value = res.data
          // console.log(res.data)
        }
      })
    }
    // 获取前十条最新注册的用户数据
    getNewUser()
    return {
      countAll,
      tableData,
      userData
    }
  }
});
</script>
<style scoped lang="scss">
.iconbox {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oneitem {
  display: flex;

}

.subone {
  border-radius: 10px;
  width: 25%;
  cursor: default;
  height: 120px;
  background-color: var(--themeColor);
  margin: 0 10px 10px 10px;
  display: flex;
  border: 1px solid var(--tabborder);
  align-items: center;
  justify-content: space-around;
}

@media screen and (max-width: 1110px) {
  .oneitem {
    flex-wrap: wrap;
  }

  .subone {
    border-radius: 10px;
    width: 47%;
    overflow: auto;
  }
}

@media screen and (max-width: 880px) {
  .oneitem {
    flex-wrap: wrap;
  }

  .subone {
    border-radius: 10px;
    width: 97%;
    overflow: auto;
  }
}

.subone:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

.pone {
  color: var(--maintitle);
  font-size: 30px;
}

.ptwo {
  color: #ff7270;
  font-size: 16px;
}

.pthree {
  margin-top: 10px;
  color: var(--maintitle);
  font-size: 14px;
}

@media screen and (min-width: 1060px) {
  .oneechartsview {
    display: flex;
    justify-content: space-around;
  }
}
</style>
