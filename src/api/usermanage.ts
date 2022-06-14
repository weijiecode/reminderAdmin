import request from '@/api/http';
import { pageData } from '@/types/usermanager'

// 获取指定页数的用户数据
export const getUserData = (params:pageData) => {
    console.log(params)
    return request({
        url: 'adminuser/selectuser',
        method: 'post',
        data: params
    })
}

// 删除指定ID的用户
// export const deleteUser = (params: number) => {
//     return request({
//         url: 'adminuser/deleteuser',
//         method: 'post',
//         data: params
//     })
// }

export const deluser = (params: object) => {
    return request({
        url: 'adminuser/deleteuser',
        method: 'post',
        data: params
    })
}