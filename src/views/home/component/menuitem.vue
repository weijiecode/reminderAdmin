<template>
    <div class="menubox">
        <el-menu :collapse-transition="false" active-text-color="#409eff" background-color="var(--leftmenubg)"
            class="el-menu-vertical-demo" :default-active="route.path" text-color="#fff" :collapse="isCollapse" router>
            <div class="titlebox">
                <div v-if="!isCollapse" class="name"><span class="dot"></span>reminderAdmin</div>
            </div>
            <el-menu-item index="/main">
                <el-icon>
                    <House />
                </el-icon>
                <template #title>{{ $t("menu.home") }}</template>
            </el-menu-item>
            <el-menu-item index="/mycenter">
                <el-icon><User /></el-icon>
                <template #title>{{ $t("menu.personalcenter") }}</template>
            </el-menu-item>
            <el-menu-item index="/usermanage">
                <el-icon><Operation /></el-icon>
                <template #title>{{ $t("menu.usermanagement") }}</template>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon><Unlock /></el-icon>
                    <span>{{ $t("menu.authoritymanagement") }}</span>
                </template>
                <el-menu-item index="/jurmangement">{{ $t("menu.authorityconfiguration") }}</el-menu-item>
                <el-menu-item index="/jurisdiction">{{ $t("menu.authoritylist") }}</el-menu-item>
            </el-sub-menu>
            <!-- <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>{{ $t("menu.statisticalview") }}</span>
                </template>
                <el-menu-item index="1-1">统计视图1</el-menu-item>
                <el-menu-item index="1-2">统计视图2</el-menu-item>
            </el-sub-menu> -->
            <!-- <el-menu-item index="">
                    <el-icon><Guide /></el-icon>
                    <template #title>{{ $t("menu.routingparameters") }}</template>
            </el-menu-item> -->
            <el-sub-menu index="">
                <template #title>
                    <el-icon><Link /></el-icon>
                    <span>{{ $t("menu.externallink") }}</span>
                </template>
                <el-menu-item index="" @click="togitee()">gitee</el-menu-item>
                <el-menu-item index="" @click="togithub()">github</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/message">
                <el-icon><Bell /></el-icon>
                <template #title>{{ $t("menu.informmanagement") }}</template>
            </el-menu-item>
            <el-menu-item index="/iframe">
                <el-icon><SetUp /></el-icon>
                <template #title>{{ $t("menu.embeddediframe") }}</template>
            </el-menu-item>
            <el-menu-item index="" @click="tofront">
                <el-icon><Guide /></el-icon>
                <template #title>{{ $t("menu.frontpage") }}</template>
            </el-menu-item>
            <!-- <el-menu-item index="/setting">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>{{ $t("menu.setting") }}</template>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
    Document,
    Setting,
    House,
    Unlock,
    User,
    SetUp,
    Link,
    Operation,
    Guide,
    Bell
} from '@element-plus/icons-vue'

export default defineComponent({
    name: 'MenuItem',
    // Document,Setting,Guide,
    components: {
        House,
        Unlock,
        Guide,
        User,
        SetUp,
        Link,
        Operation,
        Bell
    },
    props: {
        isCollapse: Boolean
    },
    setup() {
        // const handleOpen = (key: string, keyPath: string[]) => {
        //     // console.log(key, keyPath)
        // };
        // const handleClose = (key: string, keyPath: string[]) => {
        //     // console.log(key, keyPath)
        // };
        const route = useRoute();
        onMounted(() => {
            console.log(route.path)
        });
        const togitee = () => {
            // window.location.href = "https://gitee.com/weijiebaby"
            window.open("https://gitee.com/weijiebaby","_blank")
        }
        const togithub = () => {
            // window.location.href = "https://github.com/weijiecode"
            window.open("https://github.com/weijiecode","_blank")
        }
        // 跳转前台页面
        const tofront = () => {
            window.open("https://weijiebaby.cloud","_blank")
        }
        return {
            route,
            togitee,
            togithub,
            tofront
        }
    }
});
</script>
<style scoped lang="scss">

::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
.menubox {
    height: 100%;
}

.el-menu {
    height: 100%;
    overflow-x: hidden;

}

.titlebox {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

::v-deep .el-menu-item:hover {
    background-color: var(--menuhover) !important;
}

.name {
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #409eff;
    text-align: center;
    height: 40px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    position: relative;

    .dot {
        left: 5px;
        top: 6px;
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: greenyellow;
    }
}
</style>
