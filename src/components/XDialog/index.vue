<template>
  <el-dialog :visible.sync="visible" :title="title" @close="doCancel">
    <slot />
    <div slot="footer">
      <el-button type="primary" @click="doOk">确定</el-button>
      <el-button @click="doCancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Index',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  methods: {
    doCancel() {
      this.$emit('cancel')
    },
    doOk() {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped>

</style>
