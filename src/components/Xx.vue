<template>
  <div class="HelloWorld">
    <pre>{{DATA}}</pre>
  </div>
</template>
<script type="text/ecmascript-6">
  import formDATA from 'api/formDATA'

  export default {
    name: `Xx`,
    data () {
      return {
        DATA: null
      }
    },
    created () {
      this.DATA = formDATA
      setTimeout(() => {
        console.info(this.DATA)
      }, 20)
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .layout-flex
    display flex

  .layout-pixel
    display block

  .layout-col
    display block

  .layout-percent
    display block

  .dragBLOCK
    min-height 200px
    background lightpink
    > div
      margin-bottom 10px

  .HelloWorld
    > div
      float left
      min-height 200px
    .leftControlArea
      width 20%
      margin-right 2.5%
      > div
        float left
        display block

    .formContainer
      width 55%
    .rightControlArea
      width 20%
      margin-left 2.5%
    .draggable
      min-height 200px

  .item
    margin 20px 0
</style>
