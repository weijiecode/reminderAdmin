import request from '@/api/http';
import { adminFrom } from '@/types/mycenter';

export const dataLogin = () => {
    return request({
        url: '/admin/selectlogindata',
        method: 'post'
    })
}

export const updateAdmin = ( params: adminFrom ) => {
    return request({
        url: '/admin/updateadmin',
        method: 'post',
        data: params
    })
}