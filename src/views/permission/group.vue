<template>
  <div class="app-container">
    <div class="mb2">
      <el-button type="primary" @click="dialogVisible=true">添加权限</el-button>
      <el-dialog :visible.sync="dialogVisible">
        <el-form :model="role" label-width="80px" label-position="left">
          <el-form-item label="名称">
            <el-input v-model="role.name" placeholder="权限组名" />
          </el-form-item>
          <el-form-item label="菜单">
            <el-tree
              ref="tree"
              :check-strictly="checkStrictly"
              :data="routesData"
              :props="defaultProps"
              show-checkbox
              node-key="path"
              class="permission-tree"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmRole">确认</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="list" border="">
      <el-table-column align="center" prop="id" label="id" />
      <el-table-column align="center" prop="name" label="名称" />
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" @click="delPermission(row)">删除</el-button>
          <el-button type="primary">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { FetchPermission, PostPermission, DeletePermission } from '@/api/permission'
import { deepClone } from '@/utils'
import { constantRoutes, asyncRoutes } from '@/router'
import path from 'path'
import mbox from '@/utils/message'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
export default {
  name: 'Group',
  data() {
    return {
      list: [],
      role: Object.assign({}, defaultRole),
      checkStrictly: false,
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoutes()
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    async delPermission(row) {
      const { code, msg } = await DeletePermission(row.id)
      this.fetchList()
      mbox.message(msg, code)
    },
    async fetchList() {
      const { data } = await FetchPermission()
      this.list = data
    },
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    async confirmRole() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const params = {
        'route': checkedKeys,
        'name': this.role.name
      }
      const { code, msg } = await PostPermission(params)
      mbox.message(msg, code)
      this.fetchList()
      this.dialogVisible = false
      // this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    getRoutes() {
      // const res = await getRoutes()
      const route = deepClone([...constantRoutes, ...asyncRoutes])
      this.serviceRoutes = route
      this.routes = this.generateRoutes(route)
    }
  }
}
</script>

<style scoped>

</style>
