import request from '@/api/http';
import { messData, messItem, messResult, addmess } from '@/types/message'

// 获取公告信息
export const messageData = ():Promise<messData> => request.get('message/getmessage')

// 修改公告
export const updateMessage = ( params: messItem ):Promise<messResult> => request.post("message/updatemessage", params)

// 添加公告
export const addMess = ( params: addmess ):Promise<messResult> => request.post("message/addmessage", params)
// 添加公告
export const delMess = ( params: { id: number } ):Promise<messResult> => request.post("message/delmessage", params)
