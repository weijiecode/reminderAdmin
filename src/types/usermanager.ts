export type PromiseRes<T = {}> = Promise<ManageRes<T>>

export interface ManageRes<T = {}> {
    code: number,
    data: T[],
    count: {
        num: number 
    },
    msg: string
}

// 用户数据
export interface userData {
    id: number,
    username: string,
    nickname: string,
    sex: number | string,
    email: string | null,
    phone: string | null,
    introduction: string | null,
    createtime: string,
    status: number | boolean
}
// 编辑用户数据
export interface editUserData {
    id: number,
    username: string,
    nickname: string,
    sex: number | string,
    email: string | null,
    phone: string | null,
    introduction: string | null,
    status: number | boolean
}
// 用户id
export interface userid {
    id: number
}
// 删除操作返回的数据
export interface userInfo {
    code : number,
    msg: string
}
// 所有用户数据
export interface userArray {
    userDatas: userData[],
    stateLength: number
}
// 分页
export interface pageData {
    currentPage: number,
    pageSize: number
}
// 搜索
export interface search {
    searchType: string,
    searchData: string | number
}
// 添加用户
export interface addUserInt {
    username: string,
    nickname: string,
    password: string,
    sex: number | string,
    phone: string | null,
    email: string | null,
    introduction: string | null,
}
