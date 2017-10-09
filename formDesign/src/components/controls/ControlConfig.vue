<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
        <div v-if="index === `CTitle`">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === `CNameCN`">
          <p>中文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === `CNameEN`">
          <p>英文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === `CAttribute`">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === `type`">
              <p>控件类型</p>
              <!--<el-input @change="changeConfig()" placeholder="控件类型" v-model="config[index][indexIn]"></el-input>-->
              <el-radio-group v-model="config[index].typeModel">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value" >{{radio.name}}</el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === `description`">
              <p>控件描述</p>
              <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === `placeholder`">
              <p>控件提示语</p>
              <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
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
        <div v-else-if="index === `Status`">
          <!--{{item}}-->
          <div>
            <el-checkbox v-model="item.status"></el-checkbox>
            状态
          </div>
          <div v-if="item.status">
            <el-checkbox-group v-model="config[index].ruleList">
              <el-checkbox :key="checkbox.value" v-for="checkbox in config[index].rules" :label="checkbox.value">
                {{checkbox.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div v-else-if="index === `Icon`">
          <!--{{item}}-->
          <div>
            <el-checkbox v-model="item.status"></el-checkbox>
            状态
          </div>
          <div v-if="item.rule">
            <el-checkbox-group v-model="config[index].ruleList">
              <el-checkbox :key="checkbox.value" v-for="checkbox in config[index].rules" :label="checkbox.value">
                {{checkbox.name}}
              </el-checkbox>
            </el-checkbox-group>
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
