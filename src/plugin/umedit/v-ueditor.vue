<template>
  <div
    :class="{
      newstyle: newstyle
    }"
    class="ueditor"
  >
    <script :id="id" name="content" type="text/plain" v-html="content" />
  </div>
</template>
<script>
import $ from 'jquery'
window.$ = window.jQuery = $
window.UMEDITOR_HOME_URL = 'http://front.jingmai.shop/admin/umedit/'
// window.UMEDITOR_HOME_URL = '/static/umedit/'
require('./static/umeditor.config.js')
require('./static/umeditor.js')
require('./static/themes/default/css/umeditor.css')
export default {
  name: 'VUeditor',
  props: {
    newstyle: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      instance: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    this.$watch('content', () => {
      this.setContent(this.content)
    })
  },
  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy()
    }
  },
  methods: {
    setContent(val = '') {
      this.instance.setContent(val)
    },
    init() {
      this.instance = UM.getEditor(this.id, {
        initialFrameWidth: '100%',
        ...this.config
      })
      this.instance.ready(() => {
        this.$emit('ready', this.instance)
      })
      this.instance.addListener('contentChange', () => {
        this.$emit('change', this.instance)
        this.$emit('input', this.instance.getContent())
      })
      this.instance.addListener('selectionchange', (editor) => {
        this.instance.fireEvent('contentChange')
      })
    }
  }
}
</script>
<style>
  #editor p {
    line-height: normal;
  }
</style>
