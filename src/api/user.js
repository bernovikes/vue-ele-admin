import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `user/${id}`,
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: `user`,
    method: 'post',
    data
  })
}
export function fetchUser(params) {
  return request({
    url: `user`,
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
