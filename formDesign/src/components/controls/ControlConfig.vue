<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
        <div v-if="index === `CTitle`">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === `CAttribute`">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === `type`">
              <p>控件类型</p>
              <el-input @change="changeConfig()" placeholder="控件类型" v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === `description`">
              <p>控件描述</p>
              <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
          </div>
        </div>
        <div v-else-if="index === `CKey`">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === `default`">
              <p>默认值</p>
              <el-input @change="changeConfig()" placeholder="控件默认值" v-model="config[index][indexIn]"></el-input>
            </div>
          </div>
        </div>
        <hr class="hrLine" style="border-top:0; border-right:0;border-left:0; border-bottom:1px solid red">
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
