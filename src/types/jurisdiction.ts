export type PromiseRes<T = {}> = Promise<jurisdictionRes<T>>

export interface jurisdictionRes<T = {}> {
    code: number;
    data: T[];
}

// 权限数据
export interface jurisdiction {
    id: number;
    uid: number;
    name: string;
    path: string;
    class: string;
    remark: string;
    createtime: string;
}

// 修改单个数据
export interface jurItem {
    id: number;
    name: string;
    path: string;
    remark: string;
}

// 添加单个数据
export interface addjurItem {
    name: string;
    uid: string;
    path: string;
    class: string;
    remark: string;
}

// 返回结果
export interface jueResult {
    code: number;
    msg: string;
}

// 管理员列表数据
export interface adminList {
    id: number;
    uid: number;
    introduction: string;
    username: string;
    type: string;
    sex: string;
    photo: string;
    phone: string;
    email: string;
    jurids: string;
}

// 角色所属权限信息
export interface adminjurList {
    id: number;
    admin_id: number;
    jurids: string;
}

// 修改角色配置信息
export interface addupdateadmin {
    admin_id: number;
    jurids: string;
}

// 添加管理员用户信息
export interface admin {
    username: string;
    nickname: string;
    password: string;
    photo: string;
    sex: string;
    phone: string | null;
    email: string | null;
    introduction: string | null;
    type: string;
}

// 修改管理员用户信息
export interface uadmin {
    id: number;
    username: string;
    nickname: string;
    password: string;
    photo: string;
    sex: string;
    phone: string | null;
    email: string | null;
    introduction: string | null;
    type: string;
}