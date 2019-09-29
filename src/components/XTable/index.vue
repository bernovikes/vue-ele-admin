<template>
  <div :class="{'app-container':wrap}">
    <slot name="query" />
    <el-table border :data="list" @selection-change="handleSelectionChange">
      <el-table-column
        v-if="select"
        type="selection"
        align="center"
      />
      <el-table-column v-for="(item,index) in config" :key="index" :width="item.width" align="center" :label="item.name" :prop="item.prop">
        <template slot-scope="{row}">
          <slot :name="item.prop" :row="row">
            {{ row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="page" class="mt2">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="current"
        :total="total"
        @current-change="CurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'XTable',
  props: {
    current: {
      type: Number,
      default: 1
    },
    page: {
      type: Boolean,
      default: true
    },
    select: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    wrap: {
      type: Boolean,
      default: true
    },
    config: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    CurrentChange(page) {
      this.$emit('current-change', page)
    },
    handleSelectionChange(row) {
      const arr = []
      row.forEach(item => {
        arr.push(item.id)
      })
      this.$emit('selection', arr)
    }
  }
}
</script>

<style scoped>

</style>
