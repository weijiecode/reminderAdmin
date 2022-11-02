<template>
    <div class="content">
        <el-alert :title="$t('jurisdiction.warning')" type="warning" show-icon />
        <div class="boxbtn">
            <el-input class="addbtn" v-model="jurinput" :placeholder="$t('jurisdiction.inputname')" />
            <el-button type="primary" :icon="Search" @click="searchData">
                {{ $t("jurisdiction.select") }}
            </el-button>
            <el-button type="success" :icon="CirclePlus" @click="addDialogFormVisible = true">
                {{ $t("jurisdiction.addjur") }}
            </el-button>
        </div>
        <!-- 公告列表 -->
        <el-table style="width: 100%" :data="jurisdictionList">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="uid" label="上级id" />
            <el-table-column prop="name" :label="$t('jurisdiction.jurname')" width="120" />
            <el-table-column prop="path" width="180" :label="$t('jurisdiction.path')" />
            <el-table-column prop="createtime" width="250" :label="$t('jurisdiction.addtime')" />
            <el-table-column prop="remark" :label="$t('jurisdiction.remark')" />
            <el-table-column :label="$t('jurisdiction.class')">
                <template #default="scope">
                    <el-button v-if="scope.row.class === '1'" size="small" type="success" plain>{{
                            $t("jurisdiction.one")
                    }}</el-button>
                    <el-button v-if="scope.row.class === '2'" size="small" type="warning" plain>{{
                            $t("jurisdiction.two")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="$t('jurisdiction.todo')" width="180">
                <template #default="scope">
                    <el-button :icon="Edit" size="small" type="primary" @click="handleClick(scope.row)">{{
                            $t("jurisdiction.edit")
                    }}
                    </el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" :title="$t('jurisdiction.warningdel')">
                        <template #reference>
                            <el-button :icon="Delete" size="small" type="danger">{{ $t("jurisdiction.delete") }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹框 -->
        <el-dialog v-model="ediDialogFormVisible" :title="$t('jurisdiction.edit')">
            <el-form :model="updateItem">
                <el-form-item label="id" label-width="80px">
                    <el-input disabled v-model="updateItem.id" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.jurname')" label-width="80px">
                    <el-input v-model="updateItem.name" :placeholder="$t('jurisdiction.inputjur')" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.path')" label-width="80px">
                    <el-input v-model="updateItem.path" :placeholder="$t('jurisdiction.inputpath')"
                        autocomplete="off" />
                </el-form-item>
                <!-- <el-form-item :label="$t('jurisdiction.class')" label-width="80px">
                    <el-select v-model="updateItem.class" class="m-2" :placeholder="$t('jurisdiction.inputclass')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item> -->
                <el-form-item :label="$t('jurisdiction.remark')" label-width="80px">
                    <el-input rows="3" maxlength="60" :placeholder="$t('jurisdiction.inputremark')" show-word-limit
                        type="textarea" v-model="updateItem.remark" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="ediDialogFormVisible = false">{{ $t("jurisdiction.cancel") }}</el-button>
                    <el-button type="primary" @click="jurEditForm">{{ $t("jurisdiction.saveupdate") }}</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加弹框 -->
        <el-dialog v-model="addDialogFormVisible" :title="$t('jurisdiction.addjur')">
            <el-form :model="addItem">
                <el-form-item :label="$t('jurisdiction.jurname')" label-width="80px">
                    <el-input v-model="addItem.name" :placeholder="$t('jurisdiction.inputjur')" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.path')" label-width="80px">
                    <el-input v-model="addItem.path" :placeholder="$t('jurisdiction.inputpath')" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.class')" label-width="80px">
                    <el-select @change="selectoption" v-model="addItem.class" class="m-2"
                        :placeholder="$t('jurisdiction.inputclass')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.upclass')" label-width="80px">
                    <el-select :disabled="isdisabled" v-model="addItem.uid" class="m-2"
                        :placeholder="$t('jurisdiction.inputupclass')">
                        <el-option v-for="item in uoptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('jurisdiction.remark')" label-width="80px">
                    <el-input rows="3" maxlength="60" :placeholder="$t('jurisdiction.inputremark')" show-word-limit
                        type="textarea" v-model="addItem.remark" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDialogFormVisible = false">{{ $t("jurisdiction.cancel") }}</el-button>
                    <el-button type="primary" @click="jurAddForm">{{ $t("jurisdiction.save") }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { getjurisdiction, updatejurisdiction, deljurisdiction, addjurisdiction } from '@/api/jurisdiction'
import { ElMessage } from 'element-plus';
import { CirclePlus, Search, Edit, Delete } from '@element-plus/icons-vue';
import { jurisdiction } from '@/types/jurisdiction'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const state = reactive({
            jurisdictionList: [{
                id: 0,
                uid: 0,
                name: '',
                path: '',
                class: '',
                remark: '',
                createtime: ''
            }],
            // 初始数据
            oldjurisdictionList: [{
                id: 0,
                uid: 0,
                name: '',
                path: '',
                class: '',
                remark: '',
                createtime: ''
            }],
            updateItem: {
                id: 0,
                name: '',
                path: '',
                remark: ''
            },
            addItem: {
                uid: '',
                name: '',
                path: '',
                class: '',
                remark: ''
            },
            options: [
                {
                    value: '1',
                    label: t('jurisdiction.one')
                },
                {
                    value: '2',
                    label: t('jurisdiction.two')
                }
            ],
            // 一级选择框
            uoptions: [
                {
                    value: '',
                    label: ''
                }
            ]
        })

        const jurinput = ref('')
        const addDialogFormVisible = ref(false)
        const ediDialogFormVisible = ref(false)
        const { jurisdictionList, updateItem, options, uoptions, addItem, oldjurisdictionList } = toRefs(state)
        // 获取权限列表
        const getjur = () => {
            uoptions.value = []
            getjurisdiction().then(res => {
                if (res.code === 200) {
                    jurisdictionList.value = res.data
                    oldjurisdictionList.value = res.data
                    res.data.forEach(item => {
                        if (item.uid === 0) {
                            uoptions.value.push({ value: item.id + '', label: item.name })
                        }
                    })
                    // console.log('一级选项：', uoptions.value)
                    // console.log('二级选项：', options.value)
                    // console.log('权限列表：', jurisdictionList.value)
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('jurisdiction.listerror')
                    })
                }
            })
        }
        getjur()
        // 编辑
        const handleClick = (params: jurisdiction) => {
            console.log(params)
            ediDialogFormVisible.value = true
            updateItem.value.id = params.id
            updateItem.value.name = params.name
            updateItem.value.path = params.path
            updateItem.value.remark = params.remark
        }
        // 删除
        const handleDelete = (id: number) => {
            deljurisdiction({ id: id }).then(res => {
                if (res.code === 200) {
                    getjur()
                    ElMessage({
                        type: 'success',
                        message: t('jurisdiction.delsuccess')
                    })
                } else if (res.code === 202) {
                    ElMessage({
                        type: 'error',
                        message: t('jurisdiction.juradminwarning')
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('jurisdiction.delerror')
                    })
                }
            })

        }
        // 保存修改
        const jurEditForm = () => {
            if (updateItem.value.name == '' || updateItem.value.path == '') {
                ElMessage({
                    type: 'error',
                    message: t('jurisdiction.inputall')
                })
            } else {
                updatejurisdiction(updateItem.value).then(res => {
                    if (res.code === 200) {
                        ediDialogFormVisible.value = false
                        ElMessage({
                            type: 'success',
                            message: t('jurisdiction.updatesuccess')
                        })
                        getjur()
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: t('jurisdiction.juradminwarning')
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: t('jurisdiction.updateerror')
                        })
                    }
                })
            }
        }
        // 默认上级下拉框不能选择
        const isdisabled = ref(true)
        // 保存添加
        const jurAddForm = () => {
            if (addItem.value.name == '' || addItem.value.path == '') {
                ElMessage({
                    type: 'error',
                    message: t('jurisdiction.inputall')
                })
            } else {
                if (addItem.value.uid == '') { addItem.value.uid = '0' }
                addjurisdiction(addItem.value).then(res => {
                    console.log(addItem.value)
                    console.log(res)
                    if (res.code === 200) {
                        addDialogFormVisible.value = false
                        ElMessage({
                            type: 'success',
                            message: t('jurisdiction.addsuccess')
                        })
                        getjur()
                        addItem.value.class = ''
                        addItem.value.name = ''
                        addItem.value.path = ''
                        addItem.value.remark = ''
                        isdisabled.value = true
                    } else if (res.code === 202) {
                        ElMessage({
                            type: 'error',
                            message: t('jurisdiction.juradminwarning')
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: t('jurisdiction.adderror')
                        })
                    }
                })
            }
        }
        // 搜索过滤数据
        const searchData = () => {
            jurisdictionList.value = oldjurisdictionList.value.filter(item => {
                return item.name.indexOf(jurinput.value) >= 0
            })
        }
        // 选择等级
        const selectoption = (index: string) => {
            console.log(index)
            if (index == '2') {
                isdisabled.value = false
            } else {
                isdisabled.value = true
            }
        }
        return {
            CirclePlus,
            Search,
            Edit,
            Delete,
            jurisdictionList,
            addDialogFormVisible,
            ediDialogFormVisible,
            updateItem,
            options,
            addItem,
            jurinput,
            uoptions,
            isdisabled,
            selectoption,
            jurAddForm,
            handleClick,
            handleDelete,
            jurEditForm,
            searchData
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

.addbtn {
    width: 180px;
    margin-right: 10px;
}

.boxbtn {
    display: flex;
    margin-bottom: 25px;
    margin-top: 15px;
}
</style>