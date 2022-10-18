import request from './http'
import { PromiseRes, jurisdiction, jueResult, jurItem, addjurItem } from '../types/jurisdiction'

// 获取权限数据
export const getjurisdiction = ():PromiseRes<jurisdiction> => request.get('admin/selectjuri')

// 修改权限
export const updatejurisdiction = (params: jurItem):Promise<jueResult> => request.post('admin/updatejuri', params)

// 删除权限
export const deljurisdiction = (params: { id: number }):PromiseRes<jueResult> => request.post('admin/deljuri', params)

// 添加权限
export const addjurisdiction = (params: addjurItem):PromiseRes<jueResult> => request.post('admin/addjuri', params)

