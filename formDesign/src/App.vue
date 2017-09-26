<template>
  <div id="app">
    <router-view></router-view>
    <c-input></c-input>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/stylus/mixin.styl"
</style>

