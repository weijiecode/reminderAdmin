<template>
    <div class="content">
        <el-button type="success" :icon="CirclePlus" @click="addDialogFormVisible = true">发布公告</el-button>
        <!-- 公告列表 -->
        <el-table style="width: 100%" :data="messData">
            <el-table-column prop="id" label="id" width="120" />
            <el-table-column prop="title" label="通知类型" width="120" />
            <el-table-column prop="content" label="内容" width="320" />
            <el-table-column prop="datetime" label="发布时间" />
            <el-table-column prop="username" label="发布人" />
            <el-table-column label="Operations" width="180">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleClick(scope.row)">编辑</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row.id)" title="你确定删除该用户吗?">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹框 -->
        <el-dialog v-model="mesDialogFormVisible" title="公告编辑">
            <el-form :model="messItem">
                <el-form-item label="公告类型" label-width="140px">
                    <el-input v-model="messItem.title" placeholder="请输入公告类型" autocomplete="off" />
                </el-form-item>
                <el-form-item label="内容" label-width="140px">
                    <el-input rows="3" maxlength="60" placeholder="请输入内容" show-word-limit type="textarea"
                        v-model="messItem.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="mesDialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="messEditForm">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加弹框 -->
        <el-dialog v-model="addDialogFormVisible" title="公告编辑">
            <el-form :model="addmessItem">
                <el-form-item label="公告类型" label-width="140px">
                    <el-input v-model="addmessItem.title" placeholder="请输入公告类型" autocomplete="off" />
                </el-form-item>
                <el-form-item label="内容" label-width="140px">
                    <el-input rows="3" maxlength="60" placeholder="请输入内容" show-word-limit type="textarea"
                        v-model="addmessItem.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="messSaveForm">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { CirclePlus } from '@element-plus/icons-vue';
import { messageData, updateMessage, addMess, delMess } from '@/api/message';
import { messItem } from '@/types/message';
import { ElMessage } from 'element-plus';
export default defineComponent({
    setup() {
        const state = reactive({
            messData: [{
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
            }
        })
        const mesDialogFormVisible = ref(false)
        const addDialogFormVisible = ref(false)
        const { messData, messItem, addmessItem } = toRefs(state)
        // 获取数据列表
        const getMessage = () => {
            messageData().then(res => {
                console.log("用户列表数据:",res)
                messData.value = res.data
            })
        }
        getMessage()

        // 编辑
        const handleClick = (messData: messItem) => {
            console.log(messData)
            mesDialogFormVisible.value = true
            messItem.value.id = messData.id
            messItem.value.title = messData.title
            messItem.value.content = messData.content
        }
        // 删除
        const handleDelete = (id: number) => {
            console.log(id)
            delMess({id: id}).then( res => {
                console.log(res)
                if(res.code === 200) {
                    getMessage()
                    ElMessage({
                        type: 'success',
                        message: '删除公告成功'
                    })
                }else {
                    ElMessage({
                        type: 'error',
                        message: '删除失败，请重试'
                    })
                }
            })
        }
        // 添加保存
        const messSaveForm = () => {
            console.log(addmessItem)
            addMess(addmessItem.value).then( res => {
                if(res.code === 200) {
                    getMessage()
                    addDialogFormVisible.value = false
                    ElMessage({
                        type: 'success',
                        message: '添加公告成功'
                    })
                }else {
                    ElMessage({
                        type: 'error',
                        message: '添加失败，请重试'
                    })
                }
            })
        }
        // 提交编辑保存
        const messEditForm = () => {
            console.log(messItem)
            updateMessage(messItem.value).then(res => {
                if (res.code === 200) {
                    mesDialogFormVisible.value = false
                    getMessage()
                    ElMessage({
                        type: 'success',
                        message: '修改公告成功'
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '修改失败，请重试'
                    })
                }
            })
        }
        return {
            CirclePlus,
            messData,
            messItem,
            addmessItem,
            mesDialogFormVisible,
            addDialogFormVisible,
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
</style>