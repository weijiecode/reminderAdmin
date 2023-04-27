<template>
    <div class="content">
        <div class="boxbtn">
            <el-input class="addbtn" v-model="mesinput" :placeholder="$t('message.inputcontent')" />
            <el-button type="primary" :icon="Search" @click="searchData">
                {{ $t("message.search") }}
            </el-button>
            <el-button type="success" :icon="CirclePlus" @click="addDialogFormVisible = true">
            {{ $t("message.addmessage") }}</el-button>
        </div>
        <!-- 公告列表 -->
        <el-table style="width: 100%" :data="messData">
            <el-table-column prop="id" label="id" width="120" />
            <el-table-column prop="title" :label="$t('message.msgtype')" width="120" />
            <el-table-column prop="content" :label="$t('message.content')" width="320" />
            <el-table-column prop="datetime" :label="$t('message.createtime')" />
            <el-table-column prop="username" :label="$t('message.createpeople')" />
            <el-table-column :label="$t('message.todo')" width="180">
                <template #default="scope">
                    <el-button size="small" :icon="Edit" type="primary" @click="handleClick(scope.row)">{{ $t("message.edit") }}
                    </el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" :title="$t('message.warningdel')">
                        <template #reference>
                            <el-button :icon="Delete" size="small" type="danger">{{ $t("message.delete") }}</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹框 -->
        <el-dialog v-model="mesDialogFormVisible" :title="$t('message.msgedit')">
            <el-form :model="messItem">
                <el-form-item :label="$t('message.msgtype')" label-width="80px">
                    <!-- <el-input v-model="messItem.title" placeholder="请输入公告类型" autocomplete="off" /> -->
                    <el-select v-model="messItem.title" class="m-2" :placeholder="$t('message.inputtype')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.content')" label-width="80px">
                    <el-input rows="3" maxlength="60" :placeholder="$t('message.inputcontent')" show-word-limit
                        type="textarea" v-model="messItem.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="mesDialogFormVisible = false">{{ $t("message.cancel") }}</el-button>
                    <el-button type="primary" @click="messEditForm">{{ $t("message.save") }}</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加弹框 -->
        <el-dialog v-model="addDialogFormVisible" :title="$t('message.msgedit')">
            <el-form :model="addmessItem">
                <el-form-item :label="$t('message.msgtype')" label-width="80px">
                    <!-- <el-input v-model="addmessItem.title" placeholder="请输入公告类型" autocomplete="off" /> -->
                    <el-select v-model="addmessItem.title" class="m-2" :placeholder="$t('message.inputtype')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.content')" label-width="80px">
                    <el-input rows="3" maxlength="60" :placeholder="$t('message.inputcontent')" show-word-limit
                        type="textarea" v-model="addmessItem.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDialogFormVisible = false">{{ $t("message.cancel") }}</el-button>
                    <el-button type="primary" @click="messSaveForm">{{ $t("message.save") }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { CirclePlus, Search, Edit, Delete } from '@element-plus/icons-vue';
import { messageData, updateMessage, addMess, delMess } from '@/api/message';
import { messItem } from '@/types/message';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const state = reactive({
            messData: [{
                id: 0,
                title: '',
                content: '',
                datetime: '',
                username: ''
            }],
            // 原始数据
            oldmessData: [{
                id: 0,
                title: '',
                content: '',
                datetime: '',
                username: ''
            }],
            messItem: {
                id: 0,
                title: '',
                content: ''
            },
            addmessItem: {
                title: '',
                content: ''
            },
            options: [
                {
                    value: '【通知】',
                    label: t('message.messagetype'),
                },
                {
                    value: '【官方】',
                    label: t('message.messagetype1'),
                }
            ]
        })
        const mesDialogFormVisible = ref(false)
        const addDialogFormVisible = ref(false)
        const { messData, messItem, addmessItem, options, oldmessData } = toRefs(state)
        // 获取数据列表
        const getMessage = () => {
            messageData().then(res => {
                // console.log("用户列表数据:", res)
                messData.value = res.data
                oldmessData.value = res.data
            })
        }
        getMessage()

        // 编辑
        const handleClick = (messData: messItem) => {
            // console.log(messData)
            mesDialogFormVisible.value = true
            messItem.value.id = messData.id
            messItem.value.title = messData.title
            messItem.value.content = messData.content
        }
        // 删除
        const handleDelete = (id: number) => {
            // console.log(id)
            delMess({ id: id }).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    getMessage()
                    ElMessage({
                        type: 'success',
                        message: t('message.delsuccess')
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('message.delerror')
                    })
                }
            })
        }
        // 添加保存
        const messSaveForm = () => {
            console.log(addmessItem)
            addMess(addmessItem.value).then(res => {
                if (res.code === 200) {
                    getMessage()
                    addDialogFormVisible.value = false
                    ElMessage({
                        type: 'success',
                        message: t('message.savesuccess')
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('message.saveerror')
                    })
                }
            })
        }
        // 提交编辑保存
        const messEditForm = () => {
            // console.log(messItem)
            updateMessage(messItem.value).then(res => {
                if (res.code === 200) {
                    mesDialogFormVisible.value = false
                    getMessage()
                    ElMessage({
                        type: 'success',
                        message: t('message.editsuccess')
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: t('message.editerror')
                    })
                }
            })
        }

        const mesinput = ref('')
        // 搜索过滤数据
        const searchData = () => {
            messData.value = oldmessData.value.filter(item => {
                return item.content.indexOf(mesinput.value) >= 0
            })
        }

        return {
            CirclePlus,
            Search,
            Edit,
            Delete,
            messData,
            messItem,
            mesinput,
            addmessItem,
            mesDialogFormVisible,
            addDialogFormVisible,
            options,
            searchData,
            handleClick,
            handleDelete,
            messSaveForm,
            messEditForm
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