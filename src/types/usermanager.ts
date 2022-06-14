// 用户数据
export interface userData{
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
export interface editUserData{
    id: number,
    nickname: string,
    sex: number,
    email: string | null,
    phone: string | null,
    introduction: string | null,
    status: number
}
// 所有用户数据
export interface userArray{
    userDatas: userData[],
    stateLength: number
}
// 分页
export interface pageData{
    currentPage: number,
    pageSize: number
}
// 搜索
export interface search{
    searchType: string,
    searchData: string | number
}
// 添加用户
export interface addUserInt{
    username: string,
    nickname: string,
    password: string,
    sex: number | string,
    phone: string | null,
    email: string | null,
    introduction: string | null,
}
