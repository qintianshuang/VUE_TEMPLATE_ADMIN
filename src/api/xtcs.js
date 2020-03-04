import request from '@/utils/request'

export function getSystemParamBySearch(data) {
  return request({
    url: '/sb/common/getSystemParamBySearch',
    method: 'get',
    params: data
  })
}
export function saveXtcs(data) {
  return request({
    url: '/sb/common/saveXtcs',
    method: 'post',
    data
  })
}
export function editXtcs(data) {
  return request({
    url: '/sb/common/editXtcs',
    method: 'post',
    data
  })
}
export function deleteXtcs(data) {
  return request({
    url: '/sb/common/deleteXtcs',
    method: 'delete',
    params: data
  })
}

// export function downloadEmpTemplate(data) {
//   return request({
//     url: '/employee/downloadEmpTemplate',
//     method: 'post',
//     params: data,
//     responseType: 'blob'
//   })
// }

// export function exportEmpList(data) {
//   debugger
//   return request({
//     url: '/employee/exportEmpList',
//     method: 'post',
//     params: data,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
// }
