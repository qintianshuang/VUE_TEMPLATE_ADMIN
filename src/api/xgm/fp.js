import request from '@/utils/request'

export function getXgmfpxxBySearch(data) {
  return request({
    url: '/xgm/common/getHyfpdata',
    method: 'get',
    params: data
  })
}
export function saveFpData(data) {
  return request({
    url: '/xgm/common/saveFpData',
    method: 'post',
    data
  })
}
export function editFpData(data) {
  return request({
    url: '/xgm/common/editFpData',
    method: 'post',
    data
  })
}
export function deleteFpData(data) {
  return request({
    url: '/xgm/common/deleteFpData',
    method: 'delete',
    params: data
  })
}
