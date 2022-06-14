<template>
    <div class="content">
        <div class="tabheader">
            <el-input placeholder="请输入搜索内容" clearable />
            <el-button type="primary" :icon="Search">查询</el-button>
            <el-button type="success" :icon="CirclePlus">新增用户</el-button>
        </div>
        <el-table :data="userDatas" style="width: 100%" :cell-style="{ height: '70px', maxHeight: '70px' }">
            <el-table-column type="index" prop="id" label="序号" width="60px" />
            <el-table-column prop="id" label="用户ID" width="70px" />
            <el-table-column prop="username" label="用户名" width="80px" />
            <el-table-column prop="nickname" label="昵称" />
            <!-- <el-table-column prop="sex" label="性别" width="60px" /> -->
            <el-table-column label="性别" width="60px">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <Male color="#1296db" v-if="scope.row.sex === 0" />
                            <Female color="#d4237a" v-if="scope.row.sex === 1" />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="110px" />
            <el-table-column show-overflow-tooltip prop="email" label="邮箱" width="120px" />
            <el-table-column sortable prop="createtime" label="创建时间" />
            <el-table-column show-overflow-tooltip prop="introduction" label="简介" />
            <!-- <el-table-column prop="status" label="状态" /> -->
            <el-table-column label="状态">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
                        <el-button size="small" v-if="scope.row.status === 1" type="success" link>启用</el-button>
                        <el-button size="small" v-if="scope.row.status === 0" type="danger" link>禁用</el-button>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="statue" label="操作" /> -->
            <el-table-column label="操作" width="180px">
                <template #default="scope">
                    <!-- <el-button size="small" type="primary" :icon="Edit" @click="handleEdit(scope.$index)" /> -->
                    <el-button size="small" type="primary" @click="handleEdit(scope)">编辑</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" title="你确定删除该用户吗?">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-block">
            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30]"
                background layout="total, sizes, prev, pager, next, jumper" :total="stateLength"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <div class="components">
            <!-- 编辑 -->
            <el-dialog width="750px" v-model="dialogFormVisibleEdit" title="用户信息修改">
                <el-form>
                    <el-form-item label-width="90px" label="ID">
                        <el-input v-model="userDatasForm.id" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="用户名">
                        <el-input v-model="userDatasForm.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="昵称">
                        <el-input v-model="userDatasForm.nickname" autocomplete="off" />
                    </el-form-item>
                    
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
                        <el-button type="primary" @click="dialogFormVisibleEdit = false">保存修改</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { Search, CirclePlus, Male, Female } from '@element-plus/icons-vue';
import { getUserData, deluser } from '@/api/usermanage';
import { ElMessage } from 'element-plus';
import { userArray, userData } from '@/types/usermanager';
export default defineComponent({
    components: {
        Male,
        Female
    },
    setup() {
        const pageData = reactive({
            currentPage: 1,
            pageSize: 5
        });
        // 用户信息
        const state = reactive<userArray>({
            userDatas: [
                {
                    id: 0,
                    username: '',
                    nickname: '',
                    sex: 0,
                    email: '',
                    phone: '',
                    introduction: '',
                    createtime: '',
                    status: 0
                }
            ],
            stateLength: 0
        });
        // 编辑用户信息
        const editState = reactive({
            userDatasForm:
            {
                id: 0,
                username: '',
                nickname: '',
                sex: 0,
                email: '',
                phone: '',
                introduction: '',
                createtime: '',
                status: 0
            } as userData
        });
        // 编辑框
        const isViewEdit = ref<boolean>(false);
        // 封装获取用户列表的方法
        const getData = () => {
            getUserData(pageData).then(res => {
                if (res.data.code === 200) {
                    state.stateLength = res.data.count.match(/\d+/g)[0] * 1
                    state.userDatas = res.data.data;
                    state.userDatas.forEach(item => {
                        item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                    });
                }
            });
        }
        // 改变每页显示的数量
        const handleSizeChange = (val: number) => {
            pageData.pageSize = val;
            getData();
        };
        // 改变当前分页
        const handleCurrentChange = (val: number) => {
            pageData.currentPage = val;
            getData();
        };
        onMounted(() => {
            getData();
        });
        // 编辑
        const dialogFormVisibleEdit = ref<boolean>(false);
        const handleEdit = (userData: any) => {
            dialogFormVisibleEdit.value = true
            editState.userDatasForm = userData.row
            console.log(editState.userDatasForm,'123132')
        };
        // 删除
        const handleDelete = (val: number) => {
            deluser({ id: val }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '删除该用户成功'
                    });
                    // 跳转到第一页，防止最后一页只剩一个用户的情况下删除导致还在当前页
                    pageData.currentPage = 1;
                    // 重新加载用户列表
                    getData();
                } else {
                    ElMessage({
                        type: 'error',
                        message: '删除该用户失败，请重试'
                    });
                }
            });
        }
        return {
            Search,
            CirclePlus,
            ...toRefs(state),
            ...toRefs(pageData),
            handleSizeChange,
            handleCurrentChange,
            handleEdit,
            handleDelete,
            isViewEdit,
            dialogFormVisibleEdit,
            ...toRefs(editState)
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