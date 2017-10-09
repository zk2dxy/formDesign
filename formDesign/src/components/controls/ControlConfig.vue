<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        <div v-if="index === `CTitle`">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `ControlConfig`,
    props: [`config`],
    methods: {
      changeConfig () {
        console.info(this.config)
        this.$emit('changeConfig', this.config)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .ControlConfig
    p
      padding 0
      margin 0
      margin-bottom 5px
</style>
