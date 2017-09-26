<template>
  <div class="CInput">
    <!--module content-->
    <el-button type="primary">primary</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="info">info</el-button>
    <el-button type="success">success</el-button>
    <el-button type="text">text</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CInput`,
    created () {
      this.API._testAPI()
      this.loading = this.$loading({
        text: 'loading',
        lock: true
      })
    },
    mounted () {
      setTimeout(() => {
        this.loading.close()
      }, 1000)
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
