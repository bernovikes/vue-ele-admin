import path from 'path'
import { deepClone } from '@/utils'
import { constantRoutes, asyncRoutes } from '@/router'

function generateTree(routes, basePath = '/', checkedKeys) {
  const res = []
  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)

    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys)
    }

    if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
      res.push(route)
    }
  }
  return res
}

export function RouterTree(router) {
  const serviceRouter = deepClone([...constantRoutes, ...asyncRoutes])
  return generateTree(deepClone(serviceRouter), '/', router)
}
