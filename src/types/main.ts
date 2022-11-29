
export type PromiseRes<T> = Promise<T>

export interface countdata {
    code: number;
    msg: string;
    data: {
        s1: number,
        s2: number,
        s3: number,
        s4: number,
        todayc: number,
        allc: number,
        regc: number,
        blockc: number
    }
}

export interface userlogininfo<T> {
    code: number;
    msg: string,
    data: T[]
}

export interface logininfo {
    username: string;
    devinfo: string;
    createtime: string;
}

export interface newuser {
    photo: string;
    username: string;
}

export interface sevendata {
    code: number;
    msg: string,
    data: {
        s1: number;
        s2: number;
        s3: number;
        s4: number;
        s5: number;
        s6: number;
        s7: number;
        s8: number;
        s9: number;
        s10: number;
        s11: number;
        s12: number;
        s13: number;
        s14: number;
    }
}