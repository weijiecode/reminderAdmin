import request from '@/api/http';
import { pageData, editUserData, addUserInt } from '@/types/usermanager'

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
// 删除指定ID的用户
export const deluser = (params: object) => {
    return request({
        url: 'adminuser/deleteuser',
        method: 'post',
        data: params
    })
}

// 编辑用户信息
export const edituser = (params: editUserData) => {
    return request({
        url: 'adminuser/updateuser',
        method: 'post',
        data: params
    })
}

// 查询所有数据，搜索筛选
export const searchUser = () => {
    return request({
        url: 'adminuser/selectuser_search',
        method: 'post'
    })
}

// 添加用户
export const addUserData = (params: addUserInt) => {
    return request({
        url: 'adminuser/adduser',
        method: 'post',
        data: params
    })
}