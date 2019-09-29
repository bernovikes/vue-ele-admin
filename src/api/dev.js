import axios from 'axios'

export function ApiFile(params) {
  return axios({
    url: 'http://localhost:3000/api',
    method: 'get',
    params
  })
}
