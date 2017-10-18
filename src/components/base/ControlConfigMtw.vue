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
          <div v-for="(itemIn, indexIn) in item">
            <div v-if="indexIn === 'defaultTagName'">
              <p>标签名</p>
              <el-input @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--tag标签的基础属性-->
            <div v-else-if="indexIn === 'type'"> <!--input、tag标签、进度条的基础type属性-->
              <p>控件类型</p>
              <el-radio-group v-model="config[index].typeDefaultSelect">
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
            <div v-else-if="indexIn === 'closable'">
              <!--{{item}}-->
              <div>
                <el-checkbox v-model="config[index][indexIn].closableStatus"></el-checkbox>
                可关闭状态
              </div>
              <div v-if="config[index][indexIn].closableStatus">
                <el-radio-group v-model="config[index][indexIn].transitionModel">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeTransition" :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div> <!--tag标签的基础属性-->
            <div v-else-if="indexIn === 'hit'">
              <p>是否描边</p>
              <el-radio-group v-model="config[index][indexIn].hitStatus">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hitAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--tag标签的基础属性-->

            <div v-else-if="indexIn === 'showText'"> <!--进度条的基础属性-->
              <p>是否显示文字</p>
              <el-checkbox  v-model="config[index][indexIn].showTextStatus"></el-checkbox>
              <div v-if="config[index][indexIn].showTextStatus && config[index].typeDefaultSelect === 'line'">
                <p>文字显示位置</p>
                <el-radio-group v-model="config[index][indexIn].textInsideStatus">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].textInside" :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
              <div v-if="config[index].typeDefaultSelect === 'circle'">
                <p>环形宽度值</p>
                <el-input @change="changeConfig()"
                          v-model.number="config[index][indexIn].width"></el-input>
              </div>
              <!--<div v-if="config[index].typeDefaultSelect === 'line'">-->
                <p>线形宽度值</p>
                <el-input @change="changeConfig()"
                          v-model.number="config[index][indexIn].strokeWidth"></el-input>
              <!--</div>-->
            </div> <!--进度条的基础属性-->

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
        <!--<div v-else-if="index === 'position'">-->
          <!--<template>-->
            <!--<br/>-->
            <!--<div>图标放置位置</div>-->
            <!--<el-radio-group v-model="config.positionModel">-->
              <!--<el-radio v-for="radio in config.[index]" :key="radio.value" :label="radio.value">-->
                <!--{{radio.name}}-->
              <!--</el-radio>-->
            <!--</el-radio-group>-->
          <!--</template>-->
        <!--</div>-->
        <div v-else-if="index === 'CKey'">
          <!--{{item}}-->
          <div v-for="(itemIn, indexIn) in item">
            <div v-if="indexIn === 'default'">
              <p>默认值</p>
              <el-input @change="changeConfig()" placeholder="控件默认值"
                        v-model.number="config[index][indexIn]"></el-input>
            </div>
          </div>
        </div>
        <div v-else-if="index === 'Status'"> <!--input的状态属性-->
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
        <div v-else-if="index === 'Icon'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="iconStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
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
        <div v-else-if="index === 'CValidate'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="validateStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
          </div>
          <div v-if="item.status">
            <div>
              <el-button @click="chooseValidate(item)" type="primary" size="small" icon="edit">选择验证规则</el-button>
              <c-validate @postValidate="setValidate" v-if="item.chooseStatus"></c-validate>
            </div>
          </div>
        </div>
        <hr class="hrLine" style="border-top:0; border-right:0;border-left:0; border-bottom:1px solid red">
      </div> <!--input的状态属性-->
        <div v-else-if="index === 'progressStatus'"> <!--进度条的状态属性-->
          <p>状态</p>
          <el-radio-group v-model="config[index].progressStatusCurrent">
            <el-radio :key="radio.value" v-for="radio in config[index].status" :label="radio.value">
              {{radio.name}}
            </el-radio>
          </el-radio-group>
        </div> <!--进度条的状态属性-->
        <div v-else-if="index === 'Icon'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="iconStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
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
        <div v-else-if="index === 'CValidate'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="validateStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
          </div>
          <div v-if="item.status">
            <div>
              <el-button @click="chooseValidate(item)" type="primary" size="small" icon="edit">选择验证规则</el-button>
              <c-validate @postValidate="setValidate" v-if="item.chooseStatus"></c-validate>
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
    name: 'ControlConfigMtw',
    props: ['config'],
    destroy () {
      console.info(`destroy`)
    },
    methods: {
      changeConfig () {
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
      iconStatusChange (item) {
        if (!item.status) {
          item.className = ''
          item.content = ''
          item.title = ''
          item.library = ''
          this.config.CAttribute.positionModel = ''
        }
      },
      chooseValidate (item) {
        item.chooseStatus = !item.chooseStatus
        window.validateOBJ = item
      },
      setValidate (chooseRes) {
        console.error(chooseRes)
        if (chooseRes !== '') {
          window.validateOBJ.validateModel = chooseRes
        }
        window.validateOBJ.chooseStatus = false
      },
      validateStatusChange (item) {
        if (!item.status) {
          this.config.CValidate.validateModel = ''
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
