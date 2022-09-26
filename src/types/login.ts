export type  PromiseRes<T = {}> = Promise<ManageRes<T>> 

export interface ManageRes<T = {}> {
    code: number,
    data: T,
    token: string
}

export interface loginState {
    email: string | null,
    id: number,
    introduction: string | null,
    nickname: string,
    password: string,
    photo: string | null,
    sex: number,
    ststus: number,
    username: string
}

export interface loginFormState {
    username: string,
    password: string
}

export interface loginData {
    username: string,
    ip: string | null
}

// export interface loginDataState{
//     createtime: string,
//         email: string | null,
//         id: number,
//         introduction: string | null,
//         nickname: string,
//         password: string,
//         photo: string | null,
//         sex: number,
//         ststus: number,
//         username: string
// }