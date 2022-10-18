<template>
    <div class="content">
        <el-alert :title="$t('jurisdiction.warning')" type="warning" show-icon />
        <div class="boxbtn">
            <div class="leftbox">
                <el-input class="addbtn" v-model="jurinput" placeholder="请输入管理员名称" />
                <el-button type="primary" :icon="Search" @click="searchData">
                    搜索
                </el-button>
                <el-button type="success" :icon="CirclePlus">
                    添加管理员
                </el-button>
            </div>
            <div class="top">纵向边框：
                <el-switch v-model="parentBorder" />
            </div>
        </div>

        <el-table :data="tableData" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <p m="t-0 b-2">State: {{ props.row.state }}</p>
                        <p m="t-0 b-2">City: {{ props.row.city }}</p>
                        <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                        <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="管理员账户" prop="date" />
            <el-table-column label="管理员类型" />
            <el-table-column label="描述" prop="name" />
            <el-table-column width="265" label="操作">
                <template #default="scope">
                    <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button :icon="Setting" size="small" type="warning" @click="handleUpdate(scope.row)">分配角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Edit, Delete, Setting, CirclePlus, Search } from '@element-plus/icons-vue';

export default defineComponent({
    setup() {
        const parentBorder = ref(true)
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
                family: [
                    {
                        name: 'Jerry',
                        state: 'California',
                        city: 'San Francisco',
                        address: '3650 21st St, San Francisco',
                        zip: 'CA 94114',
                    },
                    {
                        name: 'Spike',
                        state: 'California',
                        city: 'San Francisco',
                        address: '3650 21st St, San Francisco',
                        zip: 'CA 94114',
                    },
                    {
                        name: 'Tyke',
                        state: 'California',
                        city: 'San Francisco',
                        address: '3650 21st St, San Francisco',
                        zip: 'CA 94114',
                    },
                ],
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114'
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                date: '2016-05-08',
                name: 'Tom',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            }
        ]
        // 编辑
        const handleEdit = (item: any) => {
            console.log('@')
        }
        // 删除
        const handleDelete = (item: any) => {
            console.log('@')
        }
        // 分配角色
        const handleUpdate = (item: any) => {
            console.log('@')
        }
        const jurinput = ref('')
        // 搜索过滤数据
        const searchData = () => {
            // messData.value = oldmessData.value.filter(item => {
            //     return item.content.indexOf(mesinput.value) >= 0
            // })
            console.log('@')
        }
        return {
            Edit,
            Delete,
            Setting,
            Search,
            CirclePlus,
            parentBorder,
            tableData,
            jurinput,
            searchData,
            handleEdit,
            handleDelete,
            handleUpdate
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    background-color: var(--themeColor);
    padding: 20px;
    margin: 0 10px;
    border: 1px solid var(--tabborder);
}

.top {
    margin-top: 5px;
    margin-bottom: 15px;
}

.addbtn {
    width: 180px;
    margin-right: 10px;
}

.boxbtn {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
}
</style>