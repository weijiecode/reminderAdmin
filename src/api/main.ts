import request from '@/api/http';
import { PromiseRes, countdata, userlogininfo, logininfo, newuser, sevendata } from "@/types/main";

// 获取首页统计数据
export const countData = ():PromiseRes<countdata> => request.get('/admin/countdata');
// 获取用户登录数据
export const loginData = ():PromiseRes<userlogininfo<logininfo>> => request.get('/admin/selectuserlogin');
// 获取前十条最新注册的用户
export const newuserData = ():PromiseRes<userlogininfo<newuser>> => request.get('/admin/selectnewuser');
// 获取前7天数据
export const sevenData = ():PromiseRes<sevendata> => request.get('/admin/countweek');
