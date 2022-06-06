import request from '@/api/http';

export const dataLogin = () => {
    return request({
        url: '/admin/selectlogindata',
        method: 'post'
    })
}