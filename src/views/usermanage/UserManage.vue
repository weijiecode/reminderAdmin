<template>
    <div class="content">
        <div class="tabheader">
            <!-- <el-input placeholder="请输入搜索内容" clearable /> -->
            <!-- <el-button type="primary" :icon="Search">查询</el-button> -->
            <el-input style="width: 400px;" v-model="searchData" :placeholder="$t('usermanage.inputsearch')" class="input-with-select">
                <template #prepend>
                    <el-select v-model="searchType" :placeholder="$t('usermanage.selecttype')" style="width: 90px">
                        <el-option label="ID" value="ID" />
                        <el-option :label="$t('usermanage.username')" value="username" />
                        <el-option :label="$t('usermanage.nickname')" value="nickname" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" @click="getSearchData" />
                </template>
            </el-input>
            <el-button type="success" :icon="CirclePlus" @click="dialogFormVisibleAdd = true">{{ $t("usermanage.adduser") }}</el-button>
        </div>
        <el-table :data="userDatas" :cell-style="{ height: '70px', maxHeight: '70px' }">
            <!-- <el-table-column type="index" prop="id" :label="$t('usermanage.number')" width="60px" /> -->
            <el-table-column prop="id" :label="$t('usermanage.userid')" width="70px" />
            <el-table-column :label="$t('usermanage.photo')" >
                <template #default="scope">
                    <img :src="scope.row.photo" class="userphoto">
                </template>
            </el-table-column>
            <el-table-column prop="username" :label="$t('usermanage.username')" />
            <el-table-column prop="nickname" :label="$t('usermanage.nickname')" />
            <!-- <el-table-column prop="sex" label="性别" width="60px" /> -->
            <el-table-column :label="$t('usermanage.sex')" width="60px">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <Male color="#1296db" v-if="scope.row.sex === '男'" />
                            <Female color="#d4237a" v-if="scope.row.sex === '女'" />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="phone" :label="$t('usermanage.phone')" width="110px" />
            <!-- <el-table-column show-overflow-tooltip prop="email" :label="$t('usermanage.email')" width="120px" /> -->
            <el-table-column sortable prop="createtime" :label="$t('usermanage.createtime')" />
            <el-table-column show-overflow-tooltip prop="introduction" :label="$t('usermanage.introduction')" />
            <!-- <el-table-column prop="status" label="状态" /> -->
            <el-table-column :label="$t('usermanage.state')">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
                        <el-button size="small" v-if="scope.row.status === true" type="success" link>{{ $t("usermanage.start") }}</el-button>
                        <el-button size="small" v-if="scope.row.status === false" type="danger" link>{{ $t("usermanage.nostart") }}</el-button>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="statue" label="操作" /> -->
            <el-table-column :label="$t('usermanage.todo')" width="180px">
                <template #default="scope">
                    <!-- <el-button size="small" type="primary" :icon="Edit" @click="handleEdit(scope.$index)" /> -->
                    <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(scope.row)">{{ $t("usermanage.edit") }}</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" :title="$t('usermanage.warningdel')">
                        <template #reference>
                            <el-button :icon="Delete" size="small" type="danger">{{ $t("usermanage.del") }}</el-button>
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
                v-model="dialogFormVisibleEdit" :title="$t('usermanage.updateuser')">
                <el-form ref="editFormRef" :rules="editRules" :model="userDatasForm">
                    <el-form-item style="float: left" label-width="90px" label="ID">
                        <el-input disabled v-model="userDatasForm.id" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" :label="$t('usermanage.username')">
                        <el-input disabled v-model="userDatasForm.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="nickname" style="float: left" label-width="90px" :label="$t('usermanage.nickname')">
                        <el-input v-model="userDatasForm.nickname" autocomplete="off" />
                    </el-form-item>
                    <el-form-item style="float: left" label-width="90px" :label="$t('usermanage.sex')">
                        <!-- <el-input v-model="userDatasForm.sex" autocomplete="off" /> -->
                        <el-select v-model="userDatasForm.sex" :placeholder="$t('usermanage.selectsex')">
                            <el-option value="男" :label="$t('usermanage.male')" />
                            <el-option value="女" :label="$t('usermanage.female')" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="90px" :label="$t('usermanage.state')">
                        <!-- <el-input v-model="userDatasForm.status" autocomplete="off" /> -->
                        <el-switch v-model="userDatasForm.status" class="mt-2" style="margin-left: 24px" inline-prompt
                            :active-icon="Check" :inactive-icon="Close" />
                    </el-form-item>
                    <el-form-item prop="phone" style="float: left" label-width="90px" :label="$t('usermanage.phone')">
                        <el-input maxlength="11" v-model="userDatasForm.phone" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="email" label-width="90px" :label="$t('usermanage.email')">
                        <el-input v-model="userDatasForm.email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" :label="$t('usermanage.introduction')">
                        <!-- <el-input v-model="userDatasForm.introduction" autocomplete="off" /> -->
                        <el-input v-model="userDatasForm.introduction" maxlength="30" :placeholder="$t('usermanage.inputintroduction')"
                            show-word-limit type="textarea" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelEdit">{{ $t("usermanage.cancel") }}</el-button>
                        <el-button type="primary" @click="saveEdit(editFormRef)">{{ $t("usermanage.saveupdate") }}</el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 添加用户 -->
            <el-dialog @close-auto-focus="closeAutoFocusAdd" @close="addClose" width="750px"
                v-model="dialogFormVisibleAdd" :title="$t('usermanage.addnewuser')">
                <el-form ref="addFormRef" :rules="addRules" :model="addState">
                    <el-form-item prop="username" style="float: left" label-width="90px" :label="$t('usermanage.username')">
                        <el-input maxlength="8" v-model="addState.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="password" label-width="90px" :label="$t('usermanage.password')">
                        <el-input maxlength="15" show-password v-model="addState.password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="nickname" style="float: left" label-width="90px" :label="$t('usermanage.nickname')">
                        <el-input maxlength="8" v-model="addState.nickname" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" :label="$t('usermanage.sex')">
                        <!-- <el-input v-model="userDatasForm.sex" autocomplete="off" /> -->
                        <el-select style="width: 250px" v-model="addState.sex" :placeholder="$t('usermanage.selectsex')">
                            <el-option value="男" :label="$t('usermanage.male')" />
                            <el-option value="女" :label="$t('usermanage.female')" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="float: left" label-width="90px" :label="$t('usermanage.phone')">
                        <el-input maxlength="11" v-model="addState.phone" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="email" label-width="90px" :label="$t('usermanage.email')">
                        <el-input v-model="addState.email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label-width="90px" :label="$t('usermanage.introduction')">
                        <!-- <el-input v-model="userDatasForm.introduction" autocomplete="off" /> -->
                        <el-input v-model="addState.introduction" maxlength="30" :placeholder="$t('usermanage.inputintroduction')" show-word-limit
                            type="textarea" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelAdd">{{ $t("usermanage.cancel") }}</el-button>
                        <el-button type="primary" @click="addUser(addFormRef)">{{ $t("usermanage.add") }}</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { Search, CirclePlus, Male, Female, Check, Close, Edit, Delete } from '@element-plus/icons-vue';
import { getUserData, deluser, edituser, searchUser, addUserData } from '@/api/usermanage';
import { ElMessage } from 'element-plus';
import { userData, editUserData, search, addUserInt } from '@/types/usermanager';
import type { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default defineComponent({
    components: {
        Male,
        Female
    },
    setup() {
        const { t } = useI18n()
        // 分页参数
        const pageData = reactive({
            currentPage: 1,
            pageSize: 5
        });
        const editFormRef = ref<FormInstance>();
        const addFormRef = ref<FormInstance>();
        // 用户信息
        const state = reactive({
            userDatas: [
                {
                    id: 0,
                    username: '',
                    nickname: '',
                    photo: '',
                    sex: 0,
                    email: '',
                    phone: '',
                    introduction: '',
                    createtime: '',
                    status: 0
                } as userData
            ],
            stateLength: 0
        });
        let { userDatas } = toRefs(state)
        // 封装获取用户列表的方法
        const getData = () => {
            getUserData(pageData).then(res => {
                console.log('用户列表数据：', res)
                if (res.code === 200) {
                    userDatas.value = res.data;
                    state.stateLength = res.count.num
                    state.userDatas.forEach(item => {
                        item.createtime = item.createtime.substring(0, 10) + ' ' + item.createtime.substring(11, 19);
                        item.status === 0 ? item.status = false : item.status = true
                        item.sex === 0 ? item.sex = '男' : item.sex = '女'
                    });
                }
            });
        }
        // 提交表单的数据
        const saveState = reactive<editUserData>({
            id: 0,
            username: '',
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
                { required: true, message: t('usermanage.inputnick'), trigger: "blur" },
                { min: 4, max: 8, message: t('usermanage.nicklength'), trigger: "blur" },
            ],
            phone: [
                { min: 11, message: t('usermanage.phonelength'), trigger: "blur" },
            ],
            email: [
                {
                    type: 'email',
                    message: t('usermanage.inputemail'),
                    trigger: ['blur', 'change'],
                },
            ]
        })
        // 添加用户表单验证规则
        const addRules = reactive<FormRules>({
            username: [
                { required: true, message: t('usermanage.inputuser'), trigger: "blur" },
                { min: 4, max: 8, message: t('usermanage.userlength'), trigger: "blur" },
            ],
            password: [
                { required: true, message: t('usermanage.inputpassword'), trigger: "blur" },
                { min: 6, max: 15, message: t('usermanage.passwordlength'), trigger: "blur" },
            ],
            nickname: [
                { required: true, message: t('usermanage.inputnick'), trigger: "blur" },
                { min: 4, max: 8, message: t('usermanage.nicklength'), trigger: "blur" },
            ],
            phone: [
                { min: 11, message: t('usermanage.phonelength'), trigger: "blur" },
            ],
            email: [
                {
                    type: 'email',
                    message: t('usermanage.inputemail'),
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
                } as editUserData
        });
        // 编辑框
        const isViewEdit = ref<boolean>(false);
        // 搜索
        const searchState = reactive<search>({
            searchType: 'username',
            searchData: ''
        });
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
        const dialogFormVisibleEdit = ref(false);
        const handleEdit = (userData: editUserData) => {
            dialogFormVisibleEdit.value = true
            editState.userDatasForm = userData
            localStorage.setItem('editData', JSON.stringify(state.userDatas))
        };
        // 删除
        const handleDelete = (val: number) => {
            deluser({ id: val }).then(res => {
                console.log(res)
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: t('usermanage.deluser')
                    });
                    // 跳转到第一页，防止最后一页只剩一个用户的情况下删除导致还在当前页
                    pageData.currentPage = 1;
                    // 重新加载用户列表
                    getData();
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('usermanage.nodeluser')
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
                        if (res.code == 200) {
                            getData();
                            dialogFormVisibleEdit.value = false;
                            ElMessage({
                                type: 'success',
                                message: t('usermanage.updatesuccess')
                            });
                        } else {
                            ElMessage.error(t('usermanage.usererror'));
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
                // console.log("搜索数据：", res)
                if (res.code === 200) {
                    state.userDatas = res.data
                    // id为空时显示所有数据
                    if (searchState.searchType === 'ID') {
                        if (searchState.searchData === '') {
                            state.userDatas = res.data
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
                        message: t('usermanage.searcherror')
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
                    addUserData(addState).then(res => {
                        console.log(res.code)
                        console.log(res.code == -201)
                        if (res.code == -201) {
                            ElMessage({
                                type: 'error',
                                message: t('usermanage.usernameed')
                            });
                        } else {
                            if (res.code == 200) {
                                getData();
                                dialogFormVisibleAdd.value = false;
                                ElMessage({
                                    type: 'success',
                                    message: t('usermanage.addusersuccess')
                                });
                            } else {
                                ElMessage.error(t('usermanage.addusererror'));
                            }
                        }
                    })
                } else {
                    console.log('error submit!', fields)
                }
            })
        };
        // 封装初始化方法
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
            Delete,
            Edit,
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
    background-color: var(--themeColor);
    padding: 20px;
    margin: 0 10px;
    border: 1px solid var(--tabborder);
}

.tabheader {
    margin-bottom: 25px;

    .el-input {
        width: 240px;
        margin-right: 20px;
    }
}

.userphoto {
    width: 50px;
    height: 50px;
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