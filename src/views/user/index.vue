<template>
  <div class="app-container">
    <div class="mb2">
      <el-button type="primary" @click="dialogVisible=true">创建用户</el-button>
      <el-dialog :visible.sync="dialogVisible" title="创建用户">
        <el-form label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="权限角色">
            <el-select v-model="form.role">
              <el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table border :data="list">
      <el-table-column label="id" prop="id" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="用户名">
        <template slot-scope="{row}">
          <el-button type="primary">删除</el-button>
          <el-button type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { register, fetchUser } from '@/api/user'
import { FetchRole } from '@/api/permission'
export default {
  name: 'Index',
  data() {
    return {
      dialogVisible: false,
      form: {},
      list: [],
      role: []
    }
  },
  async mounted() {
    const { data } = await fetchUser()
    const { data: role } = await FetchRole()
    this.role = role
    this.list = data
  },
  methods: {
    async submit() {
      // console.log(this.form)
      await register(this.form)
    }
  }
}
</script>

<style scoped>

</style>
