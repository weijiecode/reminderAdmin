<template>
    <div class="content">
        <div class="tabheader">
            <!-- <el-input placeholder="请输入搜索内容" clearable /> -->
            <!-- <el-button type="primary" :icon="Search">查询</el-button> -->
            <el-input style="width: 330px;" v-model="searchData" placeholder="请输入搜索内容" class="input-with-select">
                <template #prepend>
                    <el-select v-model="searchType" placeholder="请选择搜索类别" style="width: 85px">
                        <el-option label="ID" value="ID" />
                        <el-option label="用户名" value="username" />
                        <el-option label="昵称" value="nickname" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" @click="getSearchData" />
                </template>
            </el-input>
            <el-button type="success" :icon="CirclePlus" @click="dialogFormVisibleAdd = true">新增用户</el-button>
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
                            <Male color="#1296db" v-if="scope.row.sex === '男'" />
                            <Female color="#d4237a" v-if="scope.row.sex === '女'" />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="110px" />
            <el-table-column show-overflow-tooltip prop="email" label="邮箱" width="185px" />
            <el-table-column sortable prop="createtime" label="创建时间" />
            <el-table-column show-overflow-tooltip prop="introduction" label="简介" />
            <!-- <el-table-column prop="status" label="状态" /> -->
            <el-table-column label="状态">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
                        <el-button size="small" v-if="scope.row.status === true" type="success" link>启用</el-button>
                        <el-button size="small" v-if="scope.row.status === false" type="danger" link>禁用</el-button>
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
            <!-- 编辑用户 -->
            <el-dialog @close-auto-focus="closeAutoFocus" @close="editClose" width="750px"
                v-model="dialogFormVisibleEdit" title="用户信息修改">
                <el-form ref="editFormRef" :rules="editRules" :model="userDatasForm">
                    <el-form-item style="float: left" label-width="90px" label="ID">
                        <el-input disabled v-model="userDatasForm.id" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="用户名">
                        <el-input disabled v-model="userDatasForm.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="nickname" style="float: left" label-width="90px" label="昵称">
                        <el-input v-model="userDatasForm.nickname" autocomplete="off" />
                    </el-form-item>
                    <el-form-item style="float: left" label-width="90px" label="性别">
                        <!-- <el-input v-model="userDatasForm.sex" autocomplete="off" /> -->
                        <el-select v-model="userDatasForm.sex" placeholder="请选择性别">
                            <el-option value="男" label="男" />
                            <el-option value="女" label="女" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="90px" label="状态">
                        <!-- <el-input v-model="userDatasForm.status" autocomplete="off" /> -->
                        <el-switch v-model="userDatasForm.status" class="mt-2" style="margin-left: 24px" inline-prompt
                            :active-icon="Check" :inactive-icon="Close" />
                    </el-form-item>
                    <el-form-item prop="phone" style="float: left" label-width="90px" label="手机号码">
                        <el-input maxlength="11" v-model="userDatasForm.phone" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="email" label-width="90px" label="邮箱">
                        <el-input v-model="userDatasForm.email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="简介">
                        <!-- <el-input v-model="userDatasForm.introduction" autocomplete="off" /> -->
                        <el-input v-model="userDatasForm.introduction" maxlength="30" placeholder="请输入简介"
                            show-word-limit type="textarea" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelEdit">取消</el-button>
                        <el-button type="primary" @click="saveEdit(editFormRef)">保存修改</el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 添加用户 -->
            <el-dialog @close-auto-focus="closeAutoFocusAdd" @close="addClose" width="750px"
                v-model="dialogFormVisibleAdd" title="添加新用户">
                <el-form ref="addFormRef" :rules="addRules" :model="addState">
                    <el-form-item prop="username" style="float: left" label-width="90px" label="用户名">
                        <el-input maxlength="8" v-model="addState.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="password" label-width="90px" label="密码">
                        <el-input maxlength="15" show-password v-model="addState.password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="nickname" style="float: left" label-width="90px" label="昵称">
                        <el-input maxlength="8" v-model="addState.nickname" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="性别">
                        <!-- <el-input v-model="userDatasForm.sex" autocomplete="off" /> -->
                        <el-select style="width: 250px" v-model="addState.sex" placeholder="请选择性别">
                            <el-option value="男" label="男" />
                            <el-option value="女" label="女" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="float: left" label-width="90px" label="手机号码">
                        <el-input maxlength="11" v-model="addState.phone" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="email" label-width="90px" label="邮箱">
                        <el-input v-model="addState.email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" label="简介">
                        <!-- <el-input v-model="userDatasForm.introduction" autocomplete="off" /> -->
                        <el-input v-model="addState.introduction" maxlength="30" placeholder="请输入简介" show-word-limit
                            type="textarea" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelAdd">取消</el-button>
                        <el-button type="primary" @click="addUser(addFormRef)">添加</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { Search, CirclePlus, Male, Female, Check, Close } from '@element-plus/icons-vue';
import { getUserData, deluser, edituser, searchUser, addUserData, isusername } from '@/api/usermanage';
import { ElMessage } from 'element-plus';
import { userArray, userData, editUserData, search, addUserInt } from '@/types/usermanager';
import type { FormInstance, FormRules } from 'element-plus';

export default defineComponent({
    components: {
        Male,
        Female,
    },
    setup() {
        // 分页参数
        const pageData = reactive({
            currentPage: 1,
            pageSize: 5
        });
        const editFormRef = ref<FormInstance>();
        const addFormRef = ref<FormInstance>();
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
        // 提交表单的数据
        const saveState = reactive<editUserData>({
            id: 0,
            nickname: '',
            sex: 0,
            phone: '',
            email: '',
            status: 0,
            introduction: ''
        });
        // 添加表单的数据
        const addState = reactive<addUserInt>({
            username: '',
            nickname: '',
            password: '',
            sex: '男',
            phone: '',
            email: '',
            introduction: ''
        });
        // 编辑表单验证规则
        const editRules = reactive<FormRules>({
            nickname: [
                { required: true, message: "请输入昵称", trigger: "blur" },
                { min: 4, max: 8, message: "昵称需要在4-8位", trigger: "blur" },
            ],
            phone: [
                { min: 11, message: "手机号长度为11位", trigger: "blur" },
            ],
            email: [
                {
                    type: 'email',
                    message: '请输入正确的电子邮箱',
                    trigger: ['blur', 'change'],
                },
            ]
        })
        // 添加用户表单验证规则
        const addRules = reactive<FormRules>({
            username: [
                { required: true, message: "请输入用户名", trigger: "blur" },
                { min: 4, max: 8, message: "用户名需要在4-8位", trigger: "blur" },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
                { min: 6, max: 15, message: "密码需要在6-15位", trigger: "blur" },
            ],
            nickname: [
                { required: true, message: "请输入昵称", trigger: "blur" },
                { min: 4, max: 8, message: "昵称需要在4-8位", trigger: "blur" },
            ],
            phone: [
                { min: 11, message: "手机号长度为11位", trigger: "blur" },
            ],
            email: [
                {
                    type: 'email',
                    message: '请输入正确的电子邮箱',
                    trigger: ['blur', 'change'],
                },
            ]
        })
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
        // 搜索
        const searchState = reactive<search>({
            searchType: 'username',
            searchData: ''
        });
        // 封装获取用户列表的方法
        const getData = () => {
            getUserData(pageData).then(res => {
                if (res.data.code === 200) {
                    state.stateLength = res.data.count.match(/\d+/g)[0] * 1
                    state.userDatas = res.data.data;
                    state.userDatas.forEach(item => {
                        item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                        item.status === 0 ? item.status = false : item.status = true
                        item.sex === 0 ? item.sex = '男' : item.sex = '女'
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
            localStorage.setItem('editData', JSON.stringify(state.userDatas))
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
        };
        const cancelEdit = () => {
            dialogFormVisibleEdit.value = false;
            state.userDatas = JSON.parse(localStorage.getItem('editData') || '{}');
        };
        const closeAutoFocus = () => {
            dialogFormVisibleEdit.value = false;
            state.userDatas = JSON.parse(localStorage.getItem('editData') || '{}');
        };
        const editClose = () => {
            dialogFormVisibleEdit.value = false;
            state.userDatas = JSON.parse(localStorage.getItem('editData') || '{}');
        };
        // 保存提交
        const saveEdit = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    saveState.id = editState.userDatasForm.id;
                    saveState.nickname = editState.userDatasForm.nickname;
                    saveState.sex = editState.userDatasForm.sex === '女' ? 1 : 0;
                    saveState.phone = editState.userDatasForm.phone;
                    saveState.email = editState.userDatasForm.email;
                    saveState.introduction = editState.userDatasForm.introduction;
                    saveState.status = editState.userDatasForm.status === true ? 1 : 0;
                    edituser(saveState).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            getData();
                            dialogFormVisibleEdit.value = false;
                            ElMessage({
                                type: 'success',
                                message: '修改成功'
                            });
                        } else {
                            ElMessage.error('用户名或密码输入有误，请重新输入');
                        }
                    })
                } else {
                    console.log('error submit!', fields)
                }
            })
        };
        // 搜索
        const getSearchData = () => {
            searchUser().then(res => {
                if (res.data.code === 200) {
                    state.userDatas = res.data.data
                    // id为空时显示所有数据
                    if (searchState.searchType === 'ID') {
                        if (searchState.searchData === '') {
                            state.userDatas = res.data.data
                        } else {
                            state.userDatas = state.userDatas.filter(item => {
                                return item.id == searchState.searchData
                            })
                        }
                        state.stateLength = state.userDatas.length
                        state.userDatas.forEach(item => {
                            item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                            item.status === 0 ? item.status = false : item.status = true
                            item.sex === 0 ? item.sex = '男' : item.sex = '女'
                        });
                    } else if (searchState.searchType === 'username') {
                        state.userDatas = state.userDatas.filter(item => {
                            // searchState.searchData类型为string或number不能赋给类型item.username的string类型，所以要转换为string
                            return item.username.indexOf(searchState.searchData.toString()) >= 0
                        })
                        state.stateLength = state.userDatas.length
                        state.userDatas.forEach(item => {
                            item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                            item.status === 0 ? item.status = false : item.status = true
                            item.sex === 0 ? item.sex = '男' : item.sex = '女'
                        });
                    } else if (searchState.searchType === 'nickname') {
                        state.userDatas = state.userDatas.filter(item => {
                            // searchState.searchData类型为string或number不能赋给类型item.nickname的string类型，所以要转换为string
                            return item.nickname.indexOf(searchState.searchData.toString()) >= 0
                        })
                        state.stateLength = state.userDatas.length
                        state.userDatas.forEach(item => {
                            item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                            item.status === 0 ? item.status = false : item.status = true
                            item.sex === 0 ? item.sex = '男' : item.sex = '女'
                        });
                    }
                } else {
                    ElMessage({
                        type: 'error',
                        message: '搜索失败，请重试'
                    })
                }
            })
        };
        // 添加
        const dialogFormVisibleAdd = ref<boolean>(false)
        const addUser = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    addState.sex === '男' ? addState.sex = 0 : addState.sex = 1;
                    isusername({ username: addState.username }).then(res => {
                        if (res.data.code === 200) {
                            ElMessage({
                                type: 'error',
                                message: '该用户名已注册，请尝试输入其他用户名称后重试'
                            });
                        } else {
                            addUserData(addState).then((res: any) => {
                                if (res.data.code == 200) {
                                    getData();
                                    dialogFormVisibleAdd.value = false;
                                    ElMessage({
                                        type: 'success',
                                        message: '添加用户成功'
                                    });
                                    initAdd();
                                } else {
                                    ElMessage.error('添加用户失败，请重新输入');
                                }
                            })
                        }
                    })
                }
            })
        };
        // 封装初始化
        const initAdd = () => {
            addState.username = '';
            addState.nickname = '';
            addState.password = '';
            addState.sex = '男';
            addState.phone = '';
            addState.email = '';
            addState.introduction = '';
        };
        // 添加的取消
        const cancelAdd = () => {
            dialogFormVisibleAdd.value = false;
            initAdd();
        };
        const closeAutoFocusAdd = () => {
            initAdd();
        };
        const addClose = () => {
            initAdd();
        };
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
            dialogFormVisibleAdd,
            ...toRefs(editState),
            Check,
            Close,
            cancelEdit,
            cancelAdd,
            closeAutoFocus,
            editClose,
            closeAutoFocusAdd,
            addClose,
            editFormRef,
            editRules,
            addRules,
            ...toRefs(editRules),
            ...toRefs(addRules),
            saveEdit,
            ...toRefs(searchState),
            getSearchData,
            addUser,
            addFormRef,
            addState
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

.components {

    // .el-form-item {
    //     float: left;
    // }
    .el-textarea {
        width: 590px;
    }

    .el-select {
        width: 115px;
    }

    .el-switch {
        width: 125px;
        margin-left: 5px !important;
    }

    .el-input {
        width: 250px;
    }
}
</style>