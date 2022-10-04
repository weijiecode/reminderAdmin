// 消息数据列表
export interface messData {
    data: [{
        id: number,
        title: string,
        content: string,
        datetime: string,
        username: string
    }]
}

// 单个数据
export interface messItem {
    id: number,
    title: string,
    content: string,
}

// 添加公告数据
export interface addmess {
    title: string,
    content: string
}

// 返回结果
export interface messResult {
    code: number,
    msg: string
}