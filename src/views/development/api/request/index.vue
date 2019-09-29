<template>
  <div class="app-container">
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="method">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="host" placeholder="host" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="url" placeholder="url" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Index',
  data() {
    const store = {}
    store.host = process.env.VUE_APP_BASE_API
    store.options = [
      { label: 'GET', value: 'get' },
      { label: 'POST', value: 'post' },
      { label: 'PUT', value: 'put' },
      { label: 'DELETE', value: 'delete' }
    ]
    store.method = 'get'
    store.url = ''
    return store
  },
  methods: {
    async send(method, host, url) {
      request({
        url: 'http://www.qq.com',
        methods: 'get'
      })
    }
  }
}
</script>

<style scoped>

</style>
