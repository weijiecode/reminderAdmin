
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

export interface loginDataState {
    createtime: string,
    id: number,
    username: string,
    ip: string
}

export interface updateInfo {
    code: number,
    msg: string
}

export interface phone {
    phone: string
}

export interface qq {
    qq: string
}

export interface question {
    question: string,
    answer: string
}

export interface password {
    newpassword: string,
    oldpassword: string
}

export interface safeInfo{
    phone: string | null,
    question: string | null,
    answer: string | null,
    qq: string | null,
    username: string,
    id: number
}

export interface adminFrom{
    nickname: string | null,
    sex: string,
    phone: string | null,
    email: string | null,
    introduction: string | null
}

export interface addsafeinter{
    phone: string | null,
    question: string | null,
    answer: string | null,
    qq: string | null
}