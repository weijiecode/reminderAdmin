export type PromiseResArray<T = {}> = Promise<ManageResArray<T>>
export type PromiseRes<T = {}> = Promise<ManageRes<T>>

export interface ManageRes<T = {}> {
    code : number,
    data: T
}

export interface ManageResArray<T = {}> {
    code : number,
    data: T[]
}
// 用户登录信息
export interface loginDataState {
    createtime: string,
    id: number,
    username: string,
    ip: string
}
// 返回的信息
export interface updateInfo {
    code: number,
    msg: string
}
// 手机号
export interface phone {
    phone: string
}
// qq
export interface qq {
    qq: string
}
// 密保问题
export interface question {
    question: string,
    answer: string
}
// 密码
export interface password {
    newpassword: string,
    oldpassword: string
}
// 安全基本信息
export interface safeInfo{
    phone: string | null,
    question: string | null,
    answer: string | null,
    qq: string | null,
    username: string,
    id: number
}
// 提交的基本信息
export interface adminFrom{
    nickname: string | null,
    sex: string,
    phone: string | null,
    email: string | null,
    introduction: string | null
}
// 添加修改基本信息
export interface addsafeinter{
    phone: string | null,
    question: string | null,
    answer: string | null,
    qq: string | null
}