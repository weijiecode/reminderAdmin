import request from '@/api/http';

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
export const signIn = (params: object) => {
	return request({
		url: '/account/adminlogin',
		method: 'post',
		data: params,
	});
};
