import request from '@/api/http';
import { PromiseRes, loginDataState, adminFrom, updateInfo, questioninter, passwordinter, addsafeinter } from '@/types/mycenter';

// 查询登录信息
export const dataLogin = ():PromiseRes<loginDataState> => request.post("admin/selectlogindata")

// 修改管理员基本信息
export const updateAdmin = ( params: adminFrom ):Promise<updateInfo> => request.post("admin/updateadmin", params)

// 查询是否已添加账号安全信息
export const selectSafe = () => request.post("adminsafe/selectsafe")

// 查询有没有记录则添加信息
export const addsafe = (params: addsafeinter) => {
    return request({
        url: 'adminsafe/addsafe',
        method: 'post',
        data: params
    })
}

// 修改管理员手机绑定信息
export const updatePhone = (params: any) => {
    console.log('787',params)
    return request({
        url: 'adminsafe/updatephone',
        method: 'post',
        data: params
    })
}
// 修改管理员密保问题
export const updateQuestion = (params: questioninter ) => {
    return request({
        url: 'adminsafe/updatequestion',
        method: 'post',
        data: params
    })
}
// 修改管理员qq信息
export const updateQq = (params: any) => {
    return request({
        url: 'adminsafe/updateqq',
        method: 'post',
        data: params
    })
}

// 修改管理员密码
export const updatepassword = (params: passwordinter) => {
    return request({
        url: 'adminsafe/updatepassword',
        method: 'post',
        data: params
    })
}