<template>
  <el-form :label-width="width">
    <el-form-item v-for="(item,index) in config" :key="index" :label="item.label">
      <slot :name="item.slot">
        <span v-if="item.text" v-text="form[item.model]" />
        <el-input v-if="item.input" v-model="form[item.model]" :type="item.type" :readonly="item.readonly"/>
        <el-select v-if="item.select" :ref="item.model" v-model="form[item.model]">
          <el-option v-for="(option,okey) in item.select" :key="okey" :label="option[item.select_label]" :value="option[item.select_value]" />
        </el-select>
        <oss-upload v-if="item.upload" :logo="copy[item.model]" :model="item" @image="upload" />
        <el-button v-if="item.button" type="primary" @click="submit" v-text="item.button" />
        <span class="silver f7" v-text="item.desc" />
      </slot>
    </el-form-item>
  </el-form>
</template>
<script>
import OssUpload from '@/components/Upload/OssUpload'
export default {
  name: 'Index',
  components: {
    OssUpload
  },
  props: {
    config: {
      type: Array,
      default() {
        return []
      }
    },
    edit: {
      type: Object,
      default() {
        return { }
      }
    },
    width: {
      type: String,
      default: '60px'
    }
  },
  data() {
    return {
      form: this.edit,
      logo: [],
      copy: {},
      cb: {

      }
    }
  },
  watch: {
    edit: {
      deep: true,
      immediate: true,
      handler() {
        this.form = this.edit
        this.copy = Object.assign({}, this.edit)
      }
    }
  },
  mounted() {
    this.config.map((item) => {
      if (item.select) {
        this.$refs[item.model][0].$on('change', (data) => {
          this.$emit(item.model, data)
        })
      }
    })
  },
  methods: {
    upload(urls, model) {
      urls = urls.map(function(item) {
        const { url } = item
        return url
      })
      this.form[model.model] = urls
      this.$emit('image', urls)
    },
    submit() {
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped>

</style>
