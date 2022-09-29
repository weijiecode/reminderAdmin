import request from '@/api/http';
import { PromiseRes, userData, pageData, userInfo, userid, editUserData, addUserInt } from '@/types/usermanager'

// 获取指定页数的用户数据
export const getUserData = (params:pageData):PromiseRes<userData> => request.post("adminuser/selectuser", params)

// 删除指定ID的用户
export const deluser = (params: userid):Promise<userInfo> => request.post("adminuser/deleteuser", params)

// 编辑用户信息
export const edituser = (params: editUserData):Promise<userInfo>  => request.post("adminuser/updateuser", params)

// 查询所有数据，搜索筛选
export const searchUser = ():PromiseRes<userData>  => request.post("adminuser/selectuser_search")

// 添加用户
export const addUserData = (params: addUserInt):Promise<userInfo>  => request.post("adminuser/adduser", params)

// 查询该用户名是否被占用(未使用)
export const isusername = (params: object) => request.post("account/selectusername", params)