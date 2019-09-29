<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-row><el-button class="black" type="text" @click="read('role.js')">role.js</el-button></el-row>
        <el-row><el-button class="black" type="text">user.js</el-button></el-row>
      </el-col>
      <el-col :span="20">
        <pre v-highlightjs="code"><code class="javascript" /></pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ApiFile } from '@/api/dev'
import 'highlight.js/styles/darcula.css'
export default {
  name: 'Index',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    async read(name) {
      const { data } = await ApiFile({ name })
      this.code = data
    }
  }
}
</script>

<style scoped>

</style>
