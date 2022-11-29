<template>
  <div class="content">
    <p class="toptitle">{{ $t("mycenter.personaldata") }}</p>
    <div class="bottomcontent">
      <img class="imgphoto" :src="adminphoto" alt="">
      <div class="userdata">
        <p>{{dataname}}，admin，{{ $t("mycenter.hint") }}</p>
        <div class="both">
          <div class="left">
            <div>{{ $t("mycenter.username") }}<span>{{ username }}</span></div>
            <div>{{ $t("mycenter.endip") }}<span>{{ ip }}</span></div>
          </div>
          <div class="right">
            <div>{{ $t("mycenter.identity") }}<span>{{ $t("mycenter.usernickname") }}</span></div>
            <div>{{ $t("mycenter.endlogindatetime") }}<span>{{ createtime }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, computed, watch } from 'vue';
import { dataLogin } from '@/api/mycenter';
import useDate from '@/hooks/useDate';
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DataShow',
  setup() {
    const logindata = reactive({
      username: '',
      createtime: '',
      ip: '',
      id: 0
    });
    const { t } = useI18n()
    const dataname = ref<string>('')
    const { hours } = useDate();
    const nowhour = ref(hours);
    // 获取头像地址
    const adminphoto = ref('')
    adminphoto.value = JSON.parse(localStorage.getItem('admindata') || '').photo
    onMounted(() => {
      dataLogin().then(res => {
        // console.log("登录基础信息", res.data)
        if (nowhour.value >= 6 && nowhour.value < 12) {
          dataname.value = t('mycenter.am');
        } else if (nowhour.value >= 12 && nowhour.value < 18) {
          dataname.value = t('mycenter.pm');
        } else if (nowhour.value >= 18 && nowhour.value < 24) {
          dataname.value = t('mycenter.pm1');
        } else {
          dataname.value = t('mycenter.am1');
        }
        if (res.code === 200) {
          logindata.username = res.data[res.data.length - 1].username
          logindata.createtime = res.data[res.data.length - 1].createtime
          logindata.ip = res.data[res.data.length - 1].ip
        }
      })
    });

    // 获取vuex对象
    const store = useStore()

    // 监听是否切换语言，重新渲染dataname数据
    const getchangelang = computed(() => store.state.language)
    watch(getchangelang, () => {
      if (nowhour.value >= 6 && nowhour.value < 12) {
        dataname.value = t('mycenter.am');
      } else if (nowhour.value >= 12 && nowhour.value < 18) {
        dataname.value = t('mycenter.pm');
      } else if (nowhour.value >= 18 && nowhour.value < 24) {
        dataname.value = t('mycenter.pm1');
      } else {
        dataname.value = t('mycenter.am1');
      }
    })
    return {
      ...toRefs(logindata),
      dataname,
      adminphoto
    }
  }
});
</script>
<style scoped lang="scss">
.content {
  width: 98%;
  margin: 0 auto;
  background-color: var(--themeColor);
  border: 1px solid var(--tabborder);
}

.content:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

.toptitle {
  padding: 15px 20px;
  color: #303133;
  border-bottom: 1px solid var(--tabborder);
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
      color: var(--title);
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
            color: var(--title);
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
            color: var(--title);
          }
        }
      }
    }
  }
}
</style>
