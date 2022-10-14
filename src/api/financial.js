import request from '@/utils/request'
/*
consumption
  增管理员             1   API0012    /consumption/insert
  删管理员             1   API0013    /consumption/delete
  改管理员             1   API0014    /consumption/update
  查管理员             1   API0015    /consumption/queryByPage
income
  增管理员             1   API0012    /income/insert
  删管理员             1   API0013    /income/delete
  改管理员             1   API0014    /income/update
  查管理员             1   API0015    /income/queryByPage
debt
  增管理员             1   API0012    /debt/insert
  删管理员             1   API0013    /debt/delete
  改管理员             1   API0014    /debt/update
  查管理员             1   API0015    /debt/queryByPage
investment
  增管理员             1   API0012    /investment/insert
  删管理员             1   API0013    /investment/delete
  改管理员             1   API0014    /investment/update
  查管理员             1   API0015    /investment/queryByPage
analysis
  





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




//consumption
//增管理员             1   API0012
export function createconsumption(data) {
  return request({
    url: '/consumption/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删管理员             1   API0013
export function deleteconsumption(id) {
  return request({
    url: '/consumption/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改管理员             1   API0014
export function updateconsumption(data) {
  return request({
    url: '/consumption/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查管理员             1   API0015
export function fetchconsumptionList(query) {
  return request({
    url: '/consumption/queryByPage',
    method: 'post',
    data: query
  })
}

//income
//增管理员             1   API0012
export function createincome(data) {
  return request({
    url: '/income/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删管理员             1   API0013
export function deleteincome(id) {
  return request({
    url: '/income/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改管理员             1   API0014
export function updateincome(data) {
  return request({
    url: '/income/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查管理员             1   API0015
export function fetchincomeList(query) {
  return request({
    url: '/income/queryByPage',
    method: 'post',
    data: query
  })
}


//debt
//增管理员             1   API0012
export function createdebt(data) {
  return request({
    url: '/debt/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删管理员             1   API0013
export function deletedebt(id) {
  return request({
    url: '/debt/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改管理员             1   API0014
export function updatedebt(data) {
  return request({
    url: '/debt/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查管理员             1   API0015
export function fetchdebtList(query) {
  return request({
    url: '/debt/queryByPage',
    method: 'post',
    data: query
  })
}

//investment
//增管理员             1   API0012
export function createinvestment(data) {
  return request({
    url: '/investment/insert',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//删管理员             1   API0013
export function deleteinvestment(id) {
  return request({
    url: '/investment/delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data:  id 
  })
}
//改管理员             1   API0014
export function updateinvestment(data) {
  return request({
    url: '/investment/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    dataType: 'json',
    method: 'post',
    data
  })
}
//查管理员             1   API0015
export function fetchinvestmentList(query) {
  return request({
    url: '/investment/queryByPage',
    method: 'post',
    data: query
  })
}

//查管理员             1   API0015
export function fetchAList(query) {
  return request({
    url: '/analysis/query',
    method: 'post',
    data: query
  })
}
export function fetchYList(query) {
  return request({
    url: '/analysis/yearquery',
    method: 'post',
    data: query
  })
}
export function fetchMList(query) {
  return request({
    url: '/analysis/monthquery',
    method: 'post',
    data: query
  })
}
export function fetchTList(query) {
  return request({
    url: '/analysis/dayquery',
    method: 'post',
    data: query
  })
}