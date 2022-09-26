<template>
    <div class="content">
        <el-button type="success" :icon="CirclePlus">发布公告</el-button>
        <!-- <el-table :data="messageTableData" style="width: 100%">
            <el-table-column fixed prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" width="600" />
            <el-table-column prop="zip" label="Zip" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { CirclePlus } from '@element-plus/icons-vue';
import { messageData } from '@/api/message';
export default defineComponent({
    setup() {
        // const messageTableData = reactive({
            
        // })
        console.log('123')
        messageData().then( res => {
            console.log(res)
        })
        return {
            CirclePlus
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    background-color: #ffffff;
    padding: 20px;
    margin: 0 10px;
    border: 1px solid #f1f2f3;
}
</style>