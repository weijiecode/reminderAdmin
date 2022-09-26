import request from '@/api/http';
import { loginFormState, loginData, PromiseRes, loginState } from "@/types/login";

export const signIn = (params: loginFormState):PromiseRes<loginState> => request.post('/admin/adminlogin',params);

export const adminLoginData = (params: loginData) => {
	return request({
		url: '/admin/logindata',
		method: 'post',
		data: params
	})
}
