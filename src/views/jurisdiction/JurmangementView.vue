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

        <el-table :data="adminList" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <!-- <template #default="props">
                    <div m="4">
                        <p m="t-0 b-2">State: {{ 0 }}</p>
                        <p m="t-0 b-2">City: {{ 0 }}</p>
                        <p m="t-0 b-2">Address: {{ 0 }}</p>
                        <p m="t-0 b-2">Zip: {{ 0 }}</p>
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column label="管理员账户" prop="username" />
            <el-table-column label="管理员类型" prop="type" />
            <el-table-column label="描述" prop="introduction" />
            <el-table-column width="265" label="操作">
                <template #default="scope">
                    <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button :icon="Delete" size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button :icon="Setting" size="small" type="warning" @click="handleUpdate(scope.row)">分配角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分配角色dialog框 -->
        <el-dialog v-model="jurVisible" title="分配角色" width="30%">
            <!-- 树形控件 -->
            <el-tree :data="jurisdictionList" show-checkbox node-key="id" :default-expand-all="true"
                :default-checked-keys="['1']" :props="defaultProps" />


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="jurVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="jurVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { Edit, Delete, Setting, CirclePlus, Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getadmin, getjurisdiction } from '@/api/jurisdiction'

export default defineComponent({
    setup() {
        const jurVisible = ref(false)
        const parentBorder = ref(true)
        const state = reactive({
            adminList: [{
                id: 0,
                introduction: '',
                username: '',
                type: ''
            }],
            jurisdictionList: [{
                id: 0,
                name: '',
                children: [{
                    id: 0,
                    name: ''
                }]
            }],
        })

        const { adminList, jurisdictionList } = toRefs(state)

        // 获取管理员数据
        const getAdminData = () => {
            getadmin().then(res => {
                console.log('管理员列表：', res)
                if (res.code === 200) {
                    adminList.value = res.data
                }
            })
        }
        getAdminData()
        // 获取权限列表
        const getjur = () => {
            jurisdictionList.value = []
            getjurisdiction().then(res => {
                if (res.code === 200) {
                    console.log(res.data)
                    // 过滤一级列表
                    res.data.forEach(item => {
                        if (item.class == '1') {
                            jurisdictionList.value.push({ id: item.id, name: item.name, children: [] })
                        }
                    })
                    // 过滤二级列表
                    jurisdictionList.value.forEach(item => {
                        res.data.forEach(subitem => {
                            if (item.id == subitem.uid) {
                                item.children.push({ id: subitem.id, name: subitem.name })
                            }
                        })
                    })
                    console.log('权限列表：', jurisdictionList.value)
                } else {
                    ElMessage({
                        type: 'error',
                        message: '获取权限列表失败，请重试'
                    })
                }
            })
        }
        getjur()
        // 编辑
        const handleEdit = (item: any) => {
            console.log('@')
        }
        // 删除
        const handleDelete = (item: any) => {
            console.log('@')
        }
        // 分配权限
        const handleUpdate = (item: any) => {
            jurVisible.value = true
        }
        const jurinput = ref('')
        // 搜索过滤数据
        const searchData = () => {
            // messData.value = oldmessData.value.filter(item => {
            //     return item.content.indexOf(mesinput.value) >= 0
            // })
            console.log('@')
        }
        // tree
        const defaultProps = {
            children: 'children',
            label: 'name',
        }
        return {
            Edit,
            Delete,
            Setting,
            Search,
            CirclePlus,
            parentBorder,
            jurinput,
            jurVisible,
            adminList,
            jurisdictionList,
            defaultProps,
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