import request from './http'
import { PromiseRes, jurisdiction, jueResult, jurItem, addjurItem, adminList, adminjurList, addupdateadmin, admin } from '../types/jurisdiction'

// 获取权限数据
export const getjurisdiction = ():PromiseRes<jurisdiction> => request.get('admin/selectjuri')

// 修改权限
export const updatejurisdiction = (params: jurItem):Promise<jueResult> => request.post('admin/updatejuri', params)

// 删除权限
export const deljurisdiction = (params: { id: number }):PromiseRes<jueResult> => request.post('admin/deljuri', params)

// 添加权限
export const addjurisdiction = (params: addjurItem):PromiseRes<jueResult> => request.post('admin/addjuri', params)

// 获取管理员列表数据
export const getadmin = ():PromiseRes<adminList> => request.get('admin/selectadmin')

// 获取角色所属权限信息
export const getadminjur = ():PromiseRes<adminjurList> => request.get('admin/selectjur')

// 修改角色所属权限信息
export const updateadminjur = (params: addupdateadmin):PromiseRes<jueResult> => request.post('admin/updateadminjur', params)

// 添加角色所属权限信息（第一次配置）
export const addadminjur = (params: addupdateadmin):PromiseRes<jueResult> => request.post('admin/addadminjur', params)

// 删除管理员数据（admin表的数据）
export const deladmin = (params: { id: number }):PromiseRes<jueResult> => request.post('admin/deladmin', params)

// 删除管理员数据（admin_jursdiction_ids表的数据）
export const deladminjur = (params: { admin_id: number }):PromiseRes<jueResult> => request.post('admin/deladminjur', params)

// 添加管理员
export const addadmin = (params: admin):PromiseRes<jueResult> => request.post('admin/addadmin', params)

// 修改管理员
export const updateadmin = (params: any):PromiseRes<jueResult> => request.post('admin/updateadmin', params)

