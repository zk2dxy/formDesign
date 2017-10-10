<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
        <div v-if="index === 'CTitleCN'">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CTitleEN'">
          <p>英文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CAttribute'">
          <!--{{item}}-->
          {{config.CAttribute.typeModel}}
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === 'type'">
              <p>控件类型</p>
              <!--<el-input @change="changeConfig()" placeholder="控件类型" v-model="config[index][indexIn]"></el-input>-->
              <el-radio-group v-model="config[index].typeModel">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'description'">
              <p>控件描述</p>
              <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'placeholder'">
              <p>控件提示语</p>
              <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'prepend' && config.CAttribute.typeModel==='input'">
              <p>输入框前置追加</p>
              <el-input @change="changeConfig()" placeholder="输入框前置追加头(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'append' && config.CAttribute.typeModel==='input'">
              <p>输入框尾部增加</p>
              <el-input @change="changeConfig()" placeholder="输入框尾部增加(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
          </div>
        </div>
        <div v-else-if="index === 'CKey'">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === 'default'">
              <p>默认值</p>
              <el-input @change="changeConfig()" placeholder="控件默认值"
                        v-model="config[index][indexIn]"></el-input>
            </div>
          </div>
        </div>
        <div v-else-if="index === 'Status'">
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
        <div v-else-if="index === 'Icon'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="statusChange(item)" v-model="item.status" label="状态"></el-checkbox>
          </div>
          <div v-if="item.status">
            <div>
              <el-button @click="chooseIcon(item)" type="primary" size="small" icon="edit">选择图标</el-button>
              <c-icon @postIcon="setIcon" v-if="item.chooseStatus"></c-icon>
            </div>
            <div v-if="item.position!=''&&item.position.length>0&&item.status&&(item.className!='')">
              <br/>
              <div>图标放置位置</div>
              <el-radio-group v-model="item.positionModel">
                <el-radio v-for="radio in item.position" :key="radio.value" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <hr class="hrLine" style="border-top:0; border-right:0;border-left:0; border-bottom:1px solid red">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElRadioGroup from '../../../node_modules/element-ui/packages/radio/src/radio-group.vue'
  import ElRadio from '../../../node_modules/element-ui/packages/radio/src/radio.vue'

  export default {
    components: {
      ElRadio,
      ElRadioGroup
    },
    name: 'ControlConfig',
    props: ['config'],
    methods: {
      changeConfig () {
        console.info(this.config)
        this.$emit('changeConfig', this.config)
      },
      chooseIcon (item) {
        item.chooseStatus = !item.chooseStatus
        window.iconOBJ = item
      },
      setIcon (chooseRes) {
        if (chooseRes !== '') {
          window.iconOBJ.className = chooseRes.className
          window.iconOBJ.content = chooseRes.content
          window.iconOBJ.title = chooseRes.title
          window.iconOBJ.library = chooseRes.library
          window.iconOBJ.positionModel = 'right'
        }
        window.iconOBJ.chooseStatus = false
      },
      statusChange (item) {
        if (!item.status) {
          item.className = ''
          item.content = ''
          item.title = ''
          item.library = ''
          this.config.CAttribute.positionModel = ''
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .ControlConfig
    p
      padding 0
      margin 0
      margin-bottom 5px
</style>
