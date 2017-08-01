<template>
  <div>
  <el-row>
    <el-col :span="24">
      <header_top></header_top>
    </el-col>
    <el-row>
      <el-col :span="6">
        <menu_left></menu_left>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-row>
  </div>
</template>

<script>
  import header_top from './components/header-top/header-top'
  import menu_left from './components/menu-left/menu-left'

  export default {
      components: {
          header_top,
          menu_left
      },
      data () {
          return {
          }
      }
  }
</script>

<style>
</style>
