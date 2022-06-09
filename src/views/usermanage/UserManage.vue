<template>
    <div class="content">
        <div class="tabheader">
            <el-input placeholder="请输入搜索内容" clearable />
            <el-button type="primary" :icon="Search">查询</el-button>
            <el-button type="success" :icon="CirclePlus">新增用户</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" :cell-style="{ height: '70px' }">
            <el-table-column prop="id" label="序号" width="60" />
            <el-table-column prop="id" label="用户ID" width="80" />
            <el-table-column prop="address" label="用户名" width="100" />
            <el-table-column prop="address" label="昵称" width="100" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="phone" label="手机号码" width="120" />
            <el-table-column prop="phone" label="邮箱" width="120" />
            <el-table-column prop="date" label="创建时间" width="160" />
            <el-table-column prop="address" label="简介" width="100" />
            <el-table-column prop="sex" label="状态" width="60" />
            <el-table-column prop="address" label="操作" />
        </el-table>
        <div class="pagination-block">
            <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20, 30]" :small="small" :disabled="disabled" background
                layout="total, sizes, prev, pager, next, jumper" :total="100" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
export default defineComponent({
    setup() {
        const tableData = [
            {
                id: '1',
                date: '2022-01-31 02:28:22',
                name: 'Tom',
                sex: '男',
                phone: '19970591880',
                address: 'Angeles',
            },
            {
                id: '2',
                date: '2022-01-31 02:28:22',
                name: 'Tom',
                sex: '男',
                phone: '19970591880',
                address: 'Angeles',
            },
            {
                id: '3',
                date: '2022-01-31 02:28:22',
                name: 'Tom',
                sex: '男',
                phone: '19970591880',
                address: 'Angeles',
            },
            {
                id: '4',
                date: '2022-01-31 02:28:22',
                name: 'Tom',
                sex: '男',
                phone: '19970591880',
                address: 'Angeles',
            },
            {
                id: '5',
                date: '2022-01-31 02:28:22',
                name: 'Tom',
                phone: '19970591880',
                sex: '男',
                address: 'Angeles',
            },
        ]
        return {
            tableData,
            Search,
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

.tabheader {
    margin-bottom: 25px;

    .el-input {
        width: 240px;
        margin-right: 20px;
    }
}
.pagination-block {
    margin-top: 20px;
}
</style>