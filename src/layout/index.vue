<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="220px">Aside</el-aside>
      <el-main>
        <appMain></appMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import appMain from './components/appmain.vue'
</script>

<style scoped>

</style>
