import Vue from 'vue'
export default new Vue({
  methods: {
    message(msg, code) {
      this.$message({
        message: msg,
        type: code === 200 ? 'success' : 'error'
      })
    }
  }
})

