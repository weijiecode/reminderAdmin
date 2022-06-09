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

export interface questioninter{
    question: string,
    answer: string
}

export interface passwordinter{
    newpassword: string,
    oldpassword: string
}