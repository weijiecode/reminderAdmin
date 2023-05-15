import axios from 'axios';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie'

// axios.defaults.baseURL = 'http://localhost:5002/'

// 配置新建一个 axios 实例
const service = axios.create({
	// baseURL: 'http://localhost:5002/',
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		// 发送请求之前 token
		// if (localStorage.getItem('token')) {
		// 	(<any>config.headers).common['Authorization'] = `Bearer ${localStorage.token || ''}`;
		// }
		if (Cookies.get('token')) {
			(<any>config.headers).common['Authorization'] = `Bearer ${Cookies.get('token') || ''}`;
		}
		return config;
	}, error => {
		// 请求错误
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	response => {
		return response.data;
		//响应数据
		// const res = response;
		//console.log(res,'net')
		// if (res.data.code !== 200 && res.data.code !== 201) {
		// 	ElMessage.error('网络异常');
		// 	console.log(res.data)
		// 	// `token` 过期或者账号已在别处登录
		// 	// if (res.code === 401 || res.code === 4001) {
		// 	// 	localStorage.clear(); // 清除浏览器全部临时缓存
		// 	// 	// window.location.href = '/'; // 去登录页
		// 	// 	// ElMessageBox.alert('你已被登出，请重新登录', '提示', {}).then(() => {}).catch(() => {});
		// 	// }
		// 	return Promise.reject(service.interceptors.response);
		// } else {
		// 	return res;
		// }
	}, error => {
		// 响应错误提示
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
