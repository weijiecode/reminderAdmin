<template>
    <div class="menubox">
        <el-menu :collapse-transition="false" active-text-color="#409eff" background-color="#545c64"
            class="el-menu-vertical-demo" :default-active="route.path" text-color="#fff" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose" router>
            <div class="titlebox">
                <div v-if="!isCollapse" class="name"><span class="dot"></span>reminderAdmin</div>
            </div>
            <el-menu-item index="/main">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="/mycenter">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <template #title>个人中心</template>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="1-1">权限管理1</el-menu-item>
                <el-menu-item index="1-2">权限管理2</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>统计视图</span>
                </template>
                <el-menu-item index="1-1">统计视图1</el-menu-item>
                <el-menu-item index="1-2">统计视图2</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/setting">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>设置</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'

export default defineComponent({
    name: 'MenuItem',
    components: {
        Document,
        IconMenu,
        Setting
    },
    props: {
        isCollapse: Boolean
    },
    setup() {
        const handleOpen = (key: string, keyPath: string[]) => {
            // console.log(key, keyPath)
        };
        const handleClose = (key: string, keyPath: string[]) => {
            // console.log(key, keyPath)
        };
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            console.log(route.path)
        });
        return {
            handleOpen,
            handleClose,
            route
        }
    }
});
</script>
<style scoped lang="scss">
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
