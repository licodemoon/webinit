import request from '@/utils/http'

export function loginApi(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function loginoutApi() {
  return request({
    url: '/logout',
    method: 'get'
  })
}