import request from '@/api/http';
import { adminFrom, questioninter, passwordinter, addsafeinter } from '@/types/mycenter';

// 查询登录信息
export const dataLogin = () => {
    return request({
        url: '/admin/selectlogindata',
        method: 'post'
    })
}
// 修改管理员基本信息
export const updateAdmin = ( params: adminFrom ) => {
    return request({
        url: '/admin/updateadmin',
        method: 'post',
        data: params
    })
}
// 查询是否已添加账号安全信息
export const selectSafe = () => {
    return request({
        url: '/admin/selectsafe',
        method: 'post'
    })
}
// 查询有没有记录则添加信息
export const addsafe = (params: addsafeinter) => {
    return request({
        url: '/admin/addsafe',
        method: 'post',
        data: params
    })
}

// 修改管理员手机绑定信息
export const updatePhone = (params: any) => {
    console.log('787',params)
    return request({
        url: '/admin/updatephone',
        method: 'post',
        data: params
    })
}
// 修改管理员密保问题
export const updateQuestion = (params: questioninter ) => {
    return request({
        url: '/admin/updatequestion',
        method: 'post',
        data: params
    })
}
// 修改管理员qq信息
export const updateQq = (params: any) => {
    return request({
        url: '/admin/updateqq',
        method: 'post',
        data: params
    })
}

// 修改管理员密码
export const updatepassword = (params: passwordinter) => {
    return request({
        url: 'admin/updatepassword',
        method: 'post',
        data: params
    })
}