import request from '@/utils/request'
/*
查询宠物             1   API001     /petStorage/searchPet                                     
新增宠物字典         1   API002     /dictionary/insert
修改宠物字典         1   API003     /dictionary/update
删除宠物字典         1   API004     /dictionary/delete
查询宠物字典         1   API005     /dictionary/queryByPage
顾客收养宠物         1   API006     /adoptRecordHistory/customerAdopt
顾客收养宠物历史查询 1   API007     /adoptRecordHistory/queryByPage
站点救助宠物         1   API008     /succourRecordHistory/sitSuccour
站点救助宠物历史查询 1   API009     /succourRecordHistory/queryByPage
顾客注册             1   API0010    /customer/insert
顾客查询             1   API0011    /customer/queryByPage
增管理员             1   API0012    /user/insert
删管理员             1   API0013    /user/delete
改管理员             1   API0014    /user/update
查管理员             1   API0015    /user/queryByPage
顾客修改             1   API0016    /customer/update
顾客删除             1   API0017    /customer/delete
文件上传             1   API0018    /upLoadFile/upLoad
文件查询             1   API0019    /upLoadFile/selectOne
文件删除             1   API0020    /upLoadFile/delete
文件下载             1   API0021    /upLoadFile/downLoad
*/
//dic
//新增宠物字典         1   API002
export function createDic(data) {
  return request({
    url: '/dictionary/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删除宠物字典         1   API004
export function deleteDic(id) {
  return request({
    url: '/dictionary/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//修改宠物字典         1   API003
export function updateDic(data) {
  return request({
    url: '/dictionary/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查询宠物字典         1   API005
export function fetchDicList(query) {
  return request({
    url: '/dictionary/queryByPage',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//user
//增管理员             1   API0012
export function createUser(data) {
  return request({
    url: '/user/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删管理员             1   API0013
export function deleteUser(id) {
  return request({
    url: '/user/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改管理员             1   API0014
export function updateUser(data) {
  return request({
    url: '/user/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查管理员             1   API0015
export function fetchUserList(query) {
  return request({
    url: '/user/queryByPage',
    method: 'post',
    data: query
  })
}
//customer
//顾客注册             1   API0010    
export function createcustomer(data) {
  return request({
    url: '/customer/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//顾客查询             1   API0011    
export function fetchcustomerList(query) {
  return request({
    url: '/customer/queryByPage',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//删顾客             1   API0016
export function deleteCustomer(id) {
  return request({
    url: '/customer/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改顾客             1   API0017
export function updateCustomer(data) {
  return request({
    url: '/customer/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//petStorage
//查询宠物             1   API001     
export function fetchpetStorageList(query) {
  return request({
    url: '/petStorage/searchPet',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//adoptRecordHistory
//顾客收养宠物         1   API006     
export function createAdopt(query) {
  return request({
    url: '/adoptRecordHistory/customerAdopt',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//顾客收养宠物历史查询 1   API007     
export function fetchadoptRecordHistoryList(query) {
  return request({
    url: '/adoptRecordHistory/queryByPage',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//succourRecordHistory
//站点救助宠物         1   API008     
export function createSuccour(query) {
  return request({
    url: '/succourRecordHistory/sitSuccour',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}
//站点救助宠物历史查询 1   API009     
export function fetchsuccourRecordHistoryList(query) {
  return request({
    url: '/succourRecordHistory/queryByPage',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data: query
  })
}

//文件下载 1  API0021    
export async function downLoad(query) {
  return await request({
    url: '/upLoadFile/downLoad?id='+query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'get'
  })
}


//根据token查用户信息             1   API0024
export function tokenfetchUser(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}