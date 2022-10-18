export type PromiseRes<T = {}> = Promise<jurisdictionRes<T>>

export interface jurisdictionRes<T = {}> {
    code: number,
    data: T[]
}

// 权限数据
export interface jurisdiction {
    id: number,
    name: string,
    path: string,
    class: string,
    remark: string,
    createtime: string
}

// 修改单个数据
export interface jurItem {
    id: number,
    name: string,
    path: string,
    class: string,
    remark: string,
}

// 添加单个数据
export interface addjurItem {
    name: string,
    path: string,
    class: string,
    remark: string,
}

// 返回结果
export interface jueResult {
    code: number,
    msg: string
}