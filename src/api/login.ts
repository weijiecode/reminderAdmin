import request from '@/api/http';
import { loginFormState, loginData } from "@/types/login";
// export function useLoginApi() {
// 	return {
// 		signIn: (params: object) => {
// 			return service({
// 				url: 'account/login',
// 				method: 'post',
// 				data: params,
// 			});
// 		},
// 		signOut: (params: object) => {
// 			return service({
// 				url: '/user/signOut',
// 				method: 'post',
// 				data: params,
// 			});
// 		},
// 	};
// };
export const signIn = (params: loginFormState) => {
	return request({
		url: '/admin/adminlogin',
		method: 'post',
		data: params,
	});
};

export const adminLoginData = (params: loginData) => {
	return request({
		url: '/admin/logindata',
		method: 'post',
		data: params
	})
}
