import request from '@/utils/request'

export function PostPermission(data) {
  return request({
    url: '/permission',
    method: 'post',
    data
  })
}

export function FetchPermission(params) {
  return request({
    url: '/permission',
    method: 'get',
    params
  })
}

export function DeletePermission(id) {
  return request({
    url: `/permission/${id}`,
    method: 'delete'
  })
}

export function FetchRole(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export function PostRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function ShowRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'get'
  })
}
