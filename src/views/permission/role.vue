<template>
  <div class="app-container">
    <div class="mb2">
      <el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
      <el-dialog :visible.sync="dialogVisible" title="添加角色">
        <el-form ref="form" label-width="width:80px" :rules="formRules" :model="form">
          <el-form-item label="名称" prop="name">
            <el-col :span="9">
              <el-input v-model="form.name" />
            </el-col>
          </el-form-item>
          <el-form-item label="权限组" prop="group">
            <el-select v-model="form.group" multiple collapse-tags>
              <el-option v-for="item in permission" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="flex">
              <el-button type="primary" @click="submit">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table border :data="list">
      <el-table-column label="id" prop="id" align="center" />
      <el-table-column label="名称" prop="name" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" @click="show(row)">编辑</el-button>
          <el-button type="danger" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { FetchRole, FetchPermission, PostRole, deleteRole, ShowRole } from '@/api/permission'
import mbox from '@/utils/message'
export default {
  name: 'Role',
  data() {
    const store = {
      list: [],
      form: { group: [], name: '' },
      permission: '',
      detail: '',
      dialogVisible: false
    }
    const validatorRoleGroup = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('至少选择一个权限组'))
      } else {
        callback()
      }
    }
    store.formRules = {
      name: [{ required: true, trigger: 'blur', message: '角色名称不能为空' }],
      group: [{ required: true, validator: validatorRoleGroup }]
    }
    return store
  },
  async mounted() {
    this.getList()
    const { data: permission } = await FetchPermission()
    this.permission = permission
  },
  methods: {
    async getList() {
      const { data } = await FetchRole()
      this.list = data
    },
    del(row) {
      this.$alert('是否确定删除该权限角色', '提示', {
        confirmButtonText: '确定',
        callback: async action => {
          if (action === 'confirm') {
            const { msg, code } = await deleteRole(row.id)
            mbox.message(msg, code)
            this.getList()
          }
        }
      })
    },
    async show(row) {
      const { result } = await ShowRole(row.id)
      this.form = result
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { msg, code } = await PostRole(this.form)
          mbox.message(msg, code)
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
