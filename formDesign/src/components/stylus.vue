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
  export default{}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/stylus/mixin"
  .stylus
    *
      vertical-align top
    padding 11px 15px !important
    span
      font-size $font-large
      color $font-danger
      &:hover
        color $font-primary
        cursor pointer
    .bgImg
      display inline-block
      bg-image('../common/image/Laugh.png', '', '', cover)
      height 300px
      width 300px
</style>
