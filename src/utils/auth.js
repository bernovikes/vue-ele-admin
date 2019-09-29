import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.trace()
  return Cookies.remove(TokenKey)
}

const LoginCache = 'login'

export function getCache() {
  const cache = Cookies.get(LoginCache)
  return cache ? JSON.parse(cache) : ''
}

export function setCache(data) {
  return Cookies.set(LoginCache, JSON.stringify(data))
}

export function removeCache() {
  return Cookies.remove(LoginCache)
}

