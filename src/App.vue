<template>
  <div id="formDesign">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        CInput: 'CInput'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  #formDesign
    position absolute
    left 0
    right 0
    top 0
    bottom 0
</style>

