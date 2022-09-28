import request from '@/api/http';
import { PromiseRes, PromiseResArray, loginDataState, safeInfo, phone, adminFrom, updateInfo, question, qq, addsafeinter, password } from '@/types/mycenter';

// 查询登录信息
export const dataLogin = ():PromiseResArray<loginDataState> => request.post("admin/selectlogindata")

// 修改管理员基本信息
export const updateAdmin = ( params: adminFrom ):Promise<updateInfo> => request.post("admin/updateadmin", params)

// 查询是否已添加账号安全信息
export const selectSafe = ():PromiseRes<safeInfo> => request.post("adminsafe/selectsafe")

// 添加管理员信息
export const addsafe = (params: addsafeinter):Promise<updateInfo> => request.post("adminsafe/addsafe", params)

// 修改管理员手机绑定信息
export const updatePhone = (params: phone):Promise<updateInfo> => request.post("adminsafe/updatephone", params)

// 修改管理员密保问题
export const updateQuestion = (params: question):Promise<updateInfo> => request.post("adminsafe/updatequestion", params)

// 修改管理员qq信息
export const updateQq = (params: qq):Promise<updateInfo> => request.post("adminsafe/updateqq", params)

// 修改管理员密码
export const updatepassword = (params: password):Promise<updateInfo> => request.post("adminsafe/updateqq", params)
