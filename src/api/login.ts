import request from '@/api/http';
import { loginFormState, loginData, PromiseRes, loginState } from "@/types/login";

// 登录
export const signIn = (params: loginFormState):PromiseRes<loginState> => request.post('/admin/adminlogin',params);

// 添加登录基本信息
export const adminLoginData = (params: loginData) => request.post("admin/logindata", params)
