<template>
    <div class="content">
        <el-alert :title="$t('jurisdiction.warning')" type="warning" show-icon />
        <div class="boxbtn">
            <div class="leftbox">
                <el-input class="addbtn" v-model="jurinput" placeholder="请输入管理员名称" />
                <el-button type="primary" :icon="Search" @click="searchData">
                    搜索
                </el-button>
                <el-button @click="dialogFormVisibleAdd = true" type="success" :icon="CirclePlus">
                    添加管理员
                </el-button>
            </div>
            <div class="top">纵向边框：
                <el-switch v-model="parentBorder" />
            </div>
        </div>

        <el-table :row-class-name="tableRowClassName" :data="adminList" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <template #default="scope">
                    <el-row v-for="item1 in jurisdictionList" :key="item1.id" class="bdbottom">

                        <el-col class="alltab" :span="8" v-show="scope.row.jurids?.split(',')">
                            <el-tag>{{ item1.name }}</el-tag>
                            <el-icon>
                                <CaretRight />
                            </el-icon>
                        </el-col>

                        <el-col :span="8">
                            <el-row v-for="item2 in item1.children" :key="item2.id">
                                <el-col v-show="scope.row.jurids?.split(',').includes(item2.id + '')">
                                    <el-tag type="success">{{ item2.name
                                    }}{{ scope.row.jurids?.split(',').includes(item2.id + '') }}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="管理员账户" prop="username" />
            <el-table-column label="管理员类型" prop="type" />
            <el-table-column label="描述" prop="introduction" />
            <el-table-column width="265" label="操作">
                <template #default="scope">
                    <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" title="您是否确认删除？">
                        <template #reference>
                            <el-button :icon="Delete" size="small" type="danger">删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-button :icon="Setting" size="small" type="warning" @click="handleUpdate(scope.row.id)">分配角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分配角色dialog框 -->
        <el-dialog @close="clearjurcheck" v-model="jurVisible" title="分配角色" width="30%">
            <!-- 树形控件 -->
            <el-tree ref="treeRef" :data="jurisdictionList" show-checkbox node-key="id" :default-expand-all="true"
                :default-checked-keys="jurcheck" :props="defaultProps" />


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="jurVisible = false">取消</el-button>
                    <el-button type="primary" @click="savejur">分配角色</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 添加管理员dialog框 -->
        <el-dialog width="650px" v-model="dialogFormVisibleAdd" title="添加管理员用户">
            <el-form ref="addFormRef" :model="addForm" :rules="addrules" label-width="80px" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item style="float: left;" label="头像" prop="photo">
                    <el-upload class="avatar-uploader" :headers="headertoken"
                        action="http://localhost:5001/admin/photouploadurl" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="addForm.photo" :src="addForm.photo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型" prop="username">
                    <el-input disabled v-model="addForm.type" />
                </el-form-item>
                <el-form-item>
                    <el-alert style="height: 32px;" title="权限配置需添加管理员成功后在列表页进行配置" type="warning" show-icon />
                </el-form-item>
                <el-form-item style="clear: both;" label="管理员" prop="username">
                    <el-input placeholder="请输入管理员用户名" v-model="addForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入管理员密码" show-password type="password" v-model="addForm.password" />
                </el-form-item>
                <el-form-item style="float: left;" label="昵称" prop="nickname">
                    <el-input placeholder="请输入昵称" v-model="addForm.nickname" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="addForm.sex" class="ml-4">
                        <el-radio label="1" size="large">男</el-radio>
                        <el-radio label="0" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="float: left;" label="手机号">
                    <el-input placeholder="请输入手机号" v-model.number="addForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input placeholder="请输入邮箱" v-model="addForm.email" />
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="addForm.introduction" maxlength="30" placeholder="请输入简介" show-word-limit
                        type="textarea" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitAddForm(addFormRef)">确认添加</el-button>
                    <el-button @click="resetAddForm(addFormRef)">重置表单</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 修改管理员dialog框 -->
        <el-dialog width="650px" v-model="dialogFormVisibleUpdate" title="修改管理员用户">
            <el-form ref="addFormRef" :model="updateForm" :rules="addrules" label-width="80px" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item style="float: left;" label="头像" prop="photo">
                    <el-upload class="avatar-uploader" :headers="headertoken"
                        action="http://localhost:5001/admin/photouploadurl" :show-file-list="false"
                        :on-success="uhandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="updateForm.photo" :src="updateForm.photo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型" prop="username">
                    <el-input disabled v-model="updateForm.type" />
                </el-form-item>
                <el-form-item style="clear: both;" label="管理员" prop="username">
                    <el-input placeholder="请输入管理员用户名" v-model="updateForm.username" />
                </el-form-item>
                <!-- <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入管理员密码" show-password type="password" v-model="updateForm.password" />
                </el-form-item> -->
                <el-form-item style="float: left;" label="昵称" prop="nickname">
                    <el-input placeholder="请输入昵称" v-model="updateForm.nickname" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="updateForm.sex" class="ml-4">
                        <el-radio label="1" size="large">男</el-radio>
                        <el-radio label="0" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="float: left;" label="手机号">
                    <el-input placeholder="请输入手机号" v-model.number="updateForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input placeholder="请输入邮箱" v-model="updateForm.email" />
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="updateForm.introduction" maxlength="30" placeholder="请输入简介" show-word-limit
                        type="textarea" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitUpdateForm(addFormRef)">修改保存</el-button>
                    <el-button @click="resetAddForm(addFormRef)">重置表单</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { Edit, Delete, Setting, CirclePlus, Search, Plus, CaretRight } from '@element-plus/icons-vue';
import { ElMessage, ElTree, FormInstance, FormRules, UploadProps } from 'element-plus';
import { getadmin, getjurisdiction, getadminjur, updateadminjur, addadminjur, deladmin, deladminjur, addadmin, updateadmin } from '@/api/jurisdiction'
import { uadmin } from '@/types/jurisdiction'
import Cookies from 'js-cookie'

export default defineComponent({
    components: { Plus, CaretRight },
    setup() {
        const jurVisible = ref(false)
        const parentBorder = ref(true)
        const state = reactive({
            adminList: [{
                id: 0,
                introduction: '',
                username: '',
                type: '',
                jurids: ''
            }],
            oldadminList: [{
                id: 0,
                introduction: '',
                username: '',
                type: '',
                jurids: ''
            }],
            jurisdictionList: [{
                id: 0,
                name: '',
                children: [{
                    id: 0,
                    name: ''
                }]
            }],
            adminjurList: [{
                id: 0,
                admin_id: 0,
                jurids: ''
            }],
            jurcheck: [] as object,
            addForm: {
                username: '',
                nickname: '',
                password: '',
                photo: '',
                sex: '1',
                phone: '',
                email: '',
                introduction: '',
                type: '普通管理员'
            },
            updateForm: {
                username: '',
                nickname: '',
                password: '',
                photo: '',
                sex: '1',
                phone: '',
                email: '',
                introduction: '',
                type: '普通管理员'
            } as uadmin
        })

        const { adminList, oldadminList, jurisdictionList, adminjurList, jurcheck, addForm, updateForm } = toRefs(state)

        // 获取管理员数据
        const getAdminData = () => {
            getadmin().then(res => {
                console.log('管理员列表：', res)
                if (res.code === 200) {
                    adminList.value = res.data
                    oldadminList.value = res.data
                }
            })
        }
        getAdminData()

        // 获取角色所属权限信息
        const getAdminjurData = () => {
            console.log('2')
            getadminjur().then(res => {
                if (res.code === 200) {
                    adminjurList.value = res.data
                }
                console.log('角色所属权限信息: ', adminjurList.value)
            })
        }
        getAdminjurData()

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

        // 权限表里是否有该管理员数据
        const ishaveadmin = ref(false)

        const treeRef = ref<InstanceType<typeof ElTree>>()

        // 当前需要操作的admin的id
        const adminid = ref(0)
        // 编辑
        const handleEdit = (item: uadmin) => {
            dialogFormVisibleUpdate.value = true
            updateForm.value = item
            console.log('t', updateForm.value)
        }
        // 删除
        const handleDelete = (id: number) => {
            adminjurList.value.forEach(item => {
                if (item.admin_id == id) {
                    ishaveadmin.value = true
                }
            })
            deladmin({ id: id }).then(res => {
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '删除该管理员成功'
                    })
                    getAdminData()
                } else if (res.code === 202) {
                    ElMessage({
                        type: 'error',
                        message: '您无权限修改，请联系超级管理员'
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '删除该管理员失败，请重试'
                    })
                }
            })

            // 如果admin_jursdiction_ids表有数据，所以也要删除该表里面的数据
            if (ishaveadmin.value === true) {
                deladminjur({ admin_id: id }).then(res => {
                    getAdminData()                    // if (res.code === 200) {
                    //     getjur()
                    //     getAdminjurData()
                    //     ElMessage({
                    //         type: 'success',
                    //         message: '删除该管理员成功'
                    //     })
                    // } else if (res.code === 202) {
                    //     ElMessage({
                    //         type: 'error',
                    //         message: '您无权限修改，请联系超级管理员'
                    //     })
                    // } else {
                    //     ElMessage({
                    //         type: 'error',
                    //         message: '删除该管理员失败，请重试'
                    //     })
                    // }
                })
            }
            ishaveadmin.value === false
        }

        // 分配权限
        const handleUpdate = (id: number) => {
            adminid.value = id
            // 初始化
            ishaveadmin.value = false
            jurVisible.value = true
            adminjurList.value.forEach(item => {
                if (item.admin_id == id) {
                    jurcheck.value = item.jurids.split(',')
                    ishaveadmin.value = true
                }
            })
            console.log('现在有的', jurcheck.value)
        }

        // 提交分配角色
        const savejur = () => {
            jurVisible.value = false
            console.log('jur', jurcheck.value)
            // 获取所选的tree里面的值
            console.log(treeRef.value!.getCheckedKeys(true).join(','))
            if (ishaveadmin.value === true) {
                updateadminjur({
                    jurids: treeRef.value!.getCheckedKeys(true).join(','),
                    admin_id: adminid.value
                }).then(res => {
                    console.log('修改', res)
                    if (res.code === 200) {
                        getjur()
                        getAdminjurData()
                        getAdminData()
                        ElMessage({
                            type: 'success',
                            message: '修改权限信息成功'
                        })
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: '您无权限修改，请联系超级管理员'
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '权限修改失败，请重试'
                        })
                    }

                })
            } else {
                addadminjur({
                    jurids: treeRef.value!.getCheckedKeys(true).join(','),
                    admin_id: adminid.value
                }).then(res => {
                    console.log('添加', res)
                    if (res.code === 200) {
                        getjur()
                        getAdminjurData()
                        getAdminData()
                        ElMessage({
                            type: 'success',
                            message: '修改权限信息成功'
                        })
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: '您无权限修改，请联系超级管理员'
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '权限修改失败，请重试'
                        })
                    }
                })
            }
        }

        const jurinput = ref('')
        // 搜索过滤数据
        const searchData = () => {
            adminList.value = oldadminList.value.filter(item => {
                return item.username.indexOf(jurinput.value) >= 0
            })
        }
        // tree配置
        const defaultProps = {
            children: 'children',
            label: 'name',
        }

        // 关闭配置dialog框时重置清空tree已选择的选项
        const clearjurcheck = () => {
            treeRef.value!.setCheckedKeys([], false)
        }

        // （添加管理员）
        // 添加弹出框
        const dialogFormVisibleAdd = ref(false)
        const dialogFormVisibleUpdate = ref(false)
        const addFormRef = ref<FormInstance>()

        // 校验规则
        const addrules = reactive<FormRules>({
            username: [
                { required: true, message: '请输入管理员用户名', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3 到 8 位', trigger: 'blur' },
            ], password: [
                { required: true, message: '请输入管理员密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 位', trigger: 'blur' },
            ], nickname: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
            ], photo: [
                { required: true, message: '请上传头像图片', trigger: 'blur' },
            ], sex: [
                { required: true, message: '请输入性别', trigger: 'blur' },
            ], email: [
                { type: 'email', message: '请输入正确格式的邮箱', trigger: ['blur', 'change'] }
            ]
        })

        // 重置添加管理员信息表单
        const resetAddForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }

        // 提交添加管理员信息
        const submitAddForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                    console.log('所提交数据', addForm.value)
                    addadmin(addForm.value).then(res => {
                        console.log('提交结果', res)
                        if (res.code === 200) {
                            formEl.resetFields()
                            dialogFormVisibleAdd.value = false
                            getAdminData()
                            ElMessage({
                                type: 'success',
                                message: '添加管理员成功'
                            })
                        } else if (res.code === 202) {
                            ElMessage({
                                type: 'error',
                                message: '您无权限添加，请联系超级管理员'
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: '添加管理员失败，请重试'
                            })
                        }
                    })
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        // 提交修改管理员信息
        const submitUpdateForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                    console.log('所修改保存数据', updateForm.value)
                    updateadmin(updateForm.value).then(res => {
                        console.log('提交结果', res)
                        if (res.code === 200) {
                            formEl.resetFields()
                            dialogFormVisibleUpdate.value = false
                            getAdminData()
                            ElMessage({
                                type: 'success',
                                message: '修改管理员成功'
                            })
                        } else if (res.code === 202) {
                            ElMessage({
                                type: 'error',
                                message: '您无权限修改，请联系超级管理员'
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: '修改管理员失败，请重试'
                            })
                        }
                    })
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        // (头像上传)
        // 上传成功之后的操作（提交）
        const handleAvatarSuccess: UploadProps['onSuccess'] = (
            response,
            uploadFile
        ) => {
            // photo.value = URL.createObjectURL(uploadFile.raw!)
            addForm.value.photo = response.data.url
        }
        // 上传成功之后的操作（修改）
        const uhandleAvatarSuccess: UploadProps['onSuccess'] = (
            response,
            uploadFile
        ) => {
            // photo.value = URL.createObjectURL(uploadFile.raw!)
            updateForm.value.photo = response.data.url
        }

        // 上传之前的操作
        const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
            if (!(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png')) {
                ElMessage.error('请上传png或者jpeg的格式!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('上传的图片不能超过 2MB!')
                return false
            }
            return true
        }

        // 获取请求头token值
        const headertoken = ref({})
        headertoken.value = {
            Authorization: `Authorization: Bearer ${Cookies.get('token') || ''}`
        }

        interface User {
            id: number;
            introduction: string;
            username: string;
            type: string;
            jurids: string;
        }
        // 超级管理员列 特别标注
        const tableRowClassName = ({
            row,
            rowIndex,
        }: {
            row: User
            rowIndex: number
        }) => {
            if (rowIndex === 0) {
                return 'success-row'
            }
        }
        return {
            Edit,
            Delete,
            Setting,
            Search,
            CirclePlus,
            treeRef,
            jurcheck,
            parentBorder,
            jurinput,
            jurVisible,
            adminList,
            jurisdictionList,
            defaultProps,
            dialogFormVisibleAdd,
            addFormRef,
            addForm,
            addrules,
            headertoken,
            dialogFormVisibleUpdate,
            updateForm,
            tableRowClassName,
            submitUpdateForm,
            beforeAvatarUpload,
            handleAvatarSuccess,
            uhandleAvatarSuccess,
            submitAddForm,
            resetAddForm,
            clearjurcheck,
            savejur,
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

.el-row {
    padding: 5px 0;
    display: flex;
    align-items: center;
}

.alltab {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.bdbottom {
    border-bottom: 1px solid #ECECEC;
    border-top: 1px solid #ECECEC;
}

::v-deep.el-table .success-row {
  background-color: #f0f9eb !important;
}
// 上传图片组件
::v-deep .avatar-uploader .avatar {
    width: 98px;
    height: 98px;
    display: block;
}

::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    text-align: center;
}
</style>