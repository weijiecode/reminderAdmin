<template>
    <div class="echarts">
        <div id="echarttwo">
            <p class="newonline">{{ $t("main.loginuser") }}</p>
            <div class="userlist">
                <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;">
                    <el-table-column show-overflow-tooltip width="80" prop="username" :label="$t('main.username')" />
                    <el-table-column show-overflow-tooltip width="100" prop="devinfo" :label="$t('main.dev')" />
                    <el-table-column prop="createtime" :label="$t('main.time')" />
                </el-table>
            </div>
        </div>
        <div id="echarttwo1">
            <div class="newonline">{{ $t("main.adduser") }}</div>
            <div class="showphoto">
                <div class="oneuser" v-for="item in userData" :key="item.username">
                    <el-tooltip class="box-item" effect="dark" :content="item.nickname" placement="top">
                        <img v-if="item.photo" class="newimg" :src="item.photo"/>
                        <img v-if="!item.photo" class="newimg" src="https://api.weijiebaby.cloud:5002/public/image/sharelogo.png"/>
                    </el-tooltip>
                </div>
                <div class="newimg zhanwei">...</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
interface newint {
            photo: string,
            username: string
        }
export default defineComponent({
    name: 'PieEcharts',
    // props: ['tableData','userData'],
    props: {
        tableData: Array,
        userData: Object
    },
    components: {
    },
    setup() {
        // console.log('#', props)
        // console.log('@', props.userData)
        // const userNew = ref([{
        //     photo: '',
        //     username: ''
        // }])
        // interface newint {
        //     photo: string,
        //     username: string
        // }
        // userNew.value = props.userData as newint[]
        // return {
        //     userNew
        // }
    }
});
</script>
<style scoped lang="scss">
#echarttwo {
    border-radius: 10px;
    margin-top: 10px;
    width: 360px;
    height: 270px;
    background-color: var(--echartbg);
    border: 1px solid var(--tabborder);
    padding: 20px 20px 0 20px;
    margin-bottom: 20px;

    .newonline {
        font-size: 15px;
        font-weight: bold;
        color: #464646;
    }
}

#echarttwo:hover {
    box-shadow: 0 2px 12px #0000001a;
    transition: all ease 0.3s;
}

@media screen and (max-width: 1060px) {
    .echarts {
        float: left;
        width: 100%;
    }

    #echarttwo {
        width: 100%;
    }
}



#echarttwo1 {
    border-radius: 10px;
    margin-top: 10px;
    width: 360px;
    height: 110px;
    background-color: var(--echartbg);
    border: 1px solid var(--tabborder);
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;

    .newonline {
        font-size: 15px;
        font-weight: bold;
        color: #464646;
    }
}

#echarttwo1:hover {
    box-shadow: 0 2px 12px #0000001a;
    transition: all ease 0.3s;
}

@media screen and (max-width: 1060px) {
    .echarts {
        float: left;
        width: 100%;
    }

    #echarttwo1 {
        width: 100%;
    }
}

.showphoto {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.newimg {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255);
    cursor: pointer;
    margin-left: -10px;
}

.zhanwei {
    font-weight: 900;
    display: flex;
    justify-content: center;
    z-index: 2;
    background-color: rgb(255, 218, 169);
    color: #fff;
    line-height: 28px;
}
</style>
