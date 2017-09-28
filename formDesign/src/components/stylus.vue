<template>
  <div class="stylus">
    <span>
      Stylus span
    </span>
    <div class="bgImg">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'stylus'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .stylus
    *
      vertical-align top
    padding 11px 15px !important
    span
      font-size $font-large
      color $font-danger
      no-wrap()
      extend-click()
      &:hover
        color $font-primary
        cursor pointer
        background $font-info !important
    .bgImg
      display inline-block
      bg-image('../assets/image/Laugh.png', '', '', cover)
      height 300px
      width 300px
</style>
