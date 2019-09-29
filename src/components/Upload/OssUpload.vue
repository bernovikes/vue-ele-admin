<template>
  <el-upload
    :limit="limit"
    :file-list="form.logo"
    :http-request="upload"
    action=""
    :show-file-list="showfile"
    list-type="picture"
    class="upload-demo"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import Upload from '@/utils/oss'
export default {
  name: 'OssUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    },
    showfile: {
      type: Boolean,
      default: true
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    logo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: { logo: [] }
    }
  },
  mounted() {
    this.$watch('logo', () => {
      this.form.logo = this.logo
    })
  },
  methods: {
    async upload(files) {
      const url = await Upload(files)
      this.form.logo.push({ url })
      this.$emit('image', this.form.logo, this.model)
    }
  }
}
</script>

<style scoped>

</style>
