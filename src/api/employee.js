import request from '@/utils/request'

export function queryEmpByName(data) {
  return request({
    url: '/employee/queryEmpByName',
    method: 'get',
    params: data
  })
}
