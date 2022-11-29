<template>
    <div class="content">
        <el-alert :title="$t('jurisdiction.warning')" type="warning" show-icon />
        <div class="boxbtn">
            <div class="leftbox">
                <el-input class="addbtn" v-model="jurinput" :placeholder="$t('jurmanage.inputadmin')" />
                <el-button type="primary" :icon="Search" @click="searchData">
                    {{ $t("jurmanage.search") }}
                </el-button>
                <el-button @click="dialogFormVisibleAdd = true" type="success" :icon="CirclePlus">
                    {{ $t("jurmanage.addadmin") }}
                </el-button>
            </div>
            <div class="top">{{ $t("jurmanage.border") }}
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
            <el-table-column :label="$t('jurmanage.adminaccount')" prop="username" />
            <el-table-column :label="$t('jurmanage.admintype')" prop="type" />
            <el-table-column :label="$t('jurmanage.detail')" prop="introduction" />
            <el-table-column width="265" :label="$t('jurmanage.operation')">
                <template #default="scope">
                    <el-button :icon="Edit" :disabled="scope.row.id == 1" size="small" type="primary"
                        @click="handleEdit(scope.row)">{{$t("jurmanage.edit")}}</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" :title="$t('jurmanage.delwarning')">
                        <template #reference>
                            <el-button :disabled="scope.row.id == 1" :icon="Delete" size="small" type="danger">{{ $t("jurmanage.delete") }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-button :disabled="scope.row.id == 1" :icon="Setting" size="small" type="warning"
                        @click="handleUpdate(scope.row.id)">{{ $t("jurmanage.distribution") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分配角色dialog框 -->
        <el-dialog @close="clearjurcheck" v-model="jurVisible" :title="$t('jurmanage.distribution')" width="30%">
            <!-- 树形控件 -->
            <el-tree ref="treeRef" :data="jurisdictionList" show-checkbox node-key="id" :default-expand-all="true"
                :default-checked-keys="jurcheck" :props="defaultProps" />


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="jurVisible = false">{{ $t("jurmanage.cancel") }}</el-button>
                    <el-button type="primary" @click="savejur">{{ $t("jurmanage.distribution") }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 添加管理员dialog框 -->
        <el-dialog width="650px" v-model="dialogFormVisibleAdd" :title="$t('jurmanage.addadminaccount')">
            <el-form ref="addFormRef" :model="addForm" :rules="addrules" label-width="80px" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item style="float: left;" :label="$t('jurmanage.photo')" prop="photo">
                    <el-upload class="avatar-uploader" :headers="headertoken"
                        action="https://api.weijiebaby.cloud:5002/admin/photouploadurl" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="addForm.photo" :src="addForm.photo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item :label="$t('jurmanage.type')" prop="username">
                    <el-input disabled v-model="addForm.type" />
                </el-form-item>
                <el-form-item>
                    <el-alert style="height: 32px;" :title="$t('jurmanage.distributiondetail')" type="warning" show-icon />
                </el-form-item>
                <el-form-item style="clear: both;" :label="$t('jurmanage.admin')" prop="username">
                    <el-input :placeholder="$t('jurmanage.inputadminpwd')" v-model="addForm.username" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.password')" prop="password">
                    <el-input :placeholder="$t('jurmanage.inputadminpwd')" show-password type="password" v-model="addForm.password" />
                </el-form-item>
                <el-form-item style="float: left;" :label="$t('jurmanage.nickname')" prop="nickname">
                    <el-input :placeholder="$t('jurmanage.inputnickname')" v-model="addForm.nickname" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.sex')" prop="sex">
                    <el-radio-group v-model="addForm.sex" class="ml-4">
                        <el-radio label="1" size="large">{{ $t("jurmanage.male") }}</el-radio>
                        <el-radio label="0" size="large">{{ $t("jurmanage.female") }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="float: left;" :label="$t('jurmanage.phone')">
                    <el-input :placeholder="$t('jurmanage.inputphone')" v-model.number="addForm.phone" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.email')" prop="email">
                    <el-input :placeholder="$t('jurmanage.inputemail')" v-model="addForm.email" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.introduction')">
                    <el-input v-model="addForm.introduction" maxlength="30" :placeholder="$t('jurmanage.inputintroduction')" show-word-limit
                        type="textarea" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitAddForm(addFormRef)">{{ $t("jurmanage.confirmadd") }}
                    </el-button>
                    <el-button @click="resetAddForm(addFormRef)">{{ $t("jurmanage.resetform") }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 修改管理员dialog框 -->
        <el-dialog width="650px" v-model="dialogFormVisibleUpdate" :title="$t('jurmanage.updateadmin')">
            <el-form ref="addFormRef" :model="updateForm" :rules="addrules" label-width="80px" class="demo-ruleForm"
                size="default" status-icon>
                <el-form-item style="float: left;" :label="$t('jurmanage.photo')" prop="photo">
                    <el-upload class="avatar-uploader" :headers="headertoken"
                        action="https://api.weijiebaby.cloud:5002/admin/photouploadurl" :show-file-list="false"
                        :on-success="uhandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="updateForm.photo" :src="updateForm.photo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item :label="$t('jurmanage.type')" prop="username">
                    <el-input disabled v-model="updateForm.type" />
                </el-form-item>
                <el-form-item style="clear: both;" :label="$t('jurmanage.admin')" prop="username">
                    <el-input :placeholder="$t('jurmanage.inputadmin')" v-model="updateForm.username" />
                </el-form-item>
                <!-- <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入管理员密码" show-password type="password" v-model="updateForm.password" />
                </el-form-item> -->
                <el-form-item style="float: left;" :label="$t('jurmanage.nickname')" prop="nickname">
                    <el-input :label="$t('jurmanage.inputnickname')" v-model="updateForm.nickname" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.sex')" prop="sex">
                    <el-radio-group v-model="updateForm.sex" class="ml-4">
                        <el-radio label="1" size="large">{{ $t("jurmanage.male") }}</el-radio>
                        <el-radio label="0" size="large">{{ $t("jurmanage.female") }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="float: left;" :label="$t('jurmanage.phone')">
                    <el-input :placeholder="$t('jurmanage.inputphone')" v-model.number="updateForm.phone" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.email')" prop="email">
                    <el-input :placeholder="$t('jurmanage.inputemail')" v-model="updateForm.email" />
                </el-form-item>
                <el-form-item :label="$t('jurmanage.introduction')">
                    <el-input v-model="updateForm.introduction" maxlength="30" :placeholder="$t('jurmanage.inputintroduction')" show-word-limit
                        type="textarea" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitUpdateForm(addFormRef)">{{ $t("jurmanage.updatesave") }}
                    </el-button>
                    <!-- <el-button @click="resetAddForm(addFormRef)">{{ $t("jurmanage.resetform") }}</el-button> -->
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
import { useI18n } from 'vue-i18n'

export default defineComponent({
    components: { Plus, CaretRight },
    setup() {
        const { t } = useI18n()
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
                        message: t('jurmanage.jurlisterr')
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
                        message: t('jurmanage.deladminsuc')
                    })
                    getAdminData()
                } else if (res.code === 202) {
                    ElMessage({
                        type: 'error',
                        message: t('jurmanage.noupdate')
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('jurmanage.jurdelerr')
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
                            message: t('jurmanage.jurdelsuc')
                        })
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: t('jurmanage.nodel')
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: t('jurmanage.jurupdateerr')
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
                            message: t('jurmanage.updatejursuc')
                        })
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: t('jurmanage.nodel')
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: t('jurmanage.jurupdateerr')
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
                { required: true, message: t('jurmanage.inputadmin'), trigger: 'blur' },
                { min: 3, max: 8, message: t('jurmanage.userlen'), trigger: 'blur' },
            ], password: [
                { required: true, message: t('jurmanage.inputpwd'), trigger: 'blur' },
                { min: 6, max: 15, message: t('jurmanage.pwdlen'), trigger: 'blur' },
            ], nickname: [
                { required: true, message: t('jurmanage.inputnickname'), trigger: 'blur' },
            ], photo: [
                { required: true, message: t('jurmanage.uploadphoto'), trigger: 'blur' },
            ], sex: [
                { required: true, message: t('jurmanage.inputsex'), trigger: 'blur' },
            ], email: [
                { type: 'email', message: t('jurmanage.inputcheckemail'), trigger: ['blur', 'change'] }
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
                                message: t('jurmanage.addadminsuc')
                            })
                        } else if (res.code === 202) {
                            ElMessage({
                                type: 'error',
                                message: t('jurmanage.nojuradmin')
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: t('jurmanage.addadminerr')
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
                                message: t('jurmanage.updateadminsuc')
                            })
                        } else if (res.code === 202) {
                            ElMessage({
                                type: 'error',
                                message: t('jurmanage.noupdateadmin')
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: t('jurmanage.updateadminerr')
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
                ElMessage.error(t('jurmanage.inputpngjpeg'))
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error(t('jurmanage.uploadoversize'))
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