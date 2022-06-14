export interface userData{
    id: number,
    username: string,
    nickname: string,
    sex: number | string,
    email: string | null,
    phone: string | null,
    introduction: string | null,
    createtime: string,
    status: number | string
}

export interface userArray{
    userDatas: userData[],
    stateLength: number
}

export interface pageData{
    currentPage: number,
    pageSize: number
}