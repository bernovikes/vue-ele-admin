import request from '@/utils/request'

export function UserList(params) {
  return request({
    url: 'http://www.baid.com',
    methods: 'post',
    params
  })
}

export function GoodsList(params) {
  return request({
    url: 'http://www.qq.com',
    methods: 'get',
    params
  })
}

