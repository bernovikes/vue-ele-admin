<template>
  <el-cascader v-model="value" :options="options" :props="{value:'name',label:'name'}" filterable @change="onChange" />
</template>
<script>
import data from './data'
export default {
  name: 'ElCity',
  data() {
    return {
      options: data,
      value: []
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    }
  }
}
</script>
