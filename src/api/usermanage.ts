import request from '@/api/http';
export const getUserData = () => {
    return request({
        url: '/admin/selectuser',
        method: 'post'
    })
}