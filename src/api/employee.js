import request from '@/utils/request'

export function queryEmpByName(data) {
  return request({
    url: '/employee/queryEmpByName',
    method: 'get',
    params: data
  })
}
export function saveEmployee(data) {
  return request({
    url: '/employee/saveEmployee',
    method: 'post',
    data
  })
}
export function editEmployee(data) {
  return request({
    url: '/employee/editEmployee',
    method: 'post',
    data
  })
}
export function deleteEmployee(data) {
  return request({
    url: '/employee/deleteEmployee',
    method: 'delete',
    params: data
  })
}

export function downloadEmpTemplate(data) {
  return request({
    url: '/employee/downloadEmpTemplate',
    method: 'post',
    params: data,
    responseType: 'blob'
  })
}

export function exportEmpList(data) {
  debugger
  return request({
    url: '/employee/exportEmpList',
    method: 'post',
    params: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
