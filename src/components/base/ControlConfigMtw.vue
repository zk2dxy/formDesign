<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item, index) in config">
        {{index}}
        <div v-if="index === 'CTitleCN'">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CTitleEN'">
          <p>英文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CAttribute'"> <!--CAttribute-->
          <div v-for="(itemIn, indexIn) in item">

            <div v-if="indexIn === 'type'"> <!--input、tag标签、进度条、badge标记的基础type属性-->
              <p>控件类型</p>
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

            <div v-else-if="indexIn === 'defaultTagName'">
              <p>标签名</p>
              <el-input @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--tag标签的基础属性-->
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
            <div v-else-if="indexIn === 'hit'"> <!--tag标签的基础属性-->
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
              <div v-if="config[index][indexIn].showTextStatus && config[index].typeModel === 'line'">
                <p>文字显示位置</p>
                <el-radio-group v-model="config[index][indexIn].textInsideStatus">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].textInside" :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
              <div v-if="config[index].typeModel === 'circle'">
                <p>环形宽度值</p>
                <el-input @change="changeConfig()"
                          v-model.number="config[index][indexIn].width"></el-input>
              </div>
              <p>线形宽度值</p>
              <el-input @change="changeConfig()"
                        v-model.number="config[index][indexIn].strokeWidth"></el-input>
            </div> <!--进度条的基础属性-->
            <div v-else-if="index === 'progressStatus'"> <!--进度条的状态属性-->
              <p>状态</p>
              <el-radio-group v-model="config[index].progressStatusCurrent">
                <el-radio :key="radio.value" v-for="radio in config[index].status" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--进度条的状态属性-->

            <div v-else-if="indexIn === 'badgeValue'"> <!--badge标记的基础值属性-->
              <p>标记值</p>
              <template v-if="config[index].typeModel === 'string' && !config[index].isDot.dotStatus">
                <p>字符串值</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入"
                          v-model="config[index][indexIn].defaultValue"></el-input>
              </template>
              <template v-if="config[index].typeModel === 'number' && !config[index].isDot.dotStatus">
                <p>数字值</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入"
                          v-model.number="config[index][indexIn].defaultValue"></el-input>
                <p>max最大值设置</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入最大值"
                          v-model.number="config[index][indexIn].max"></el-input>
              </template>
            </div> <!--badge标记的基础值属性-->
            <div v-else-if="indexIn === 'isDot'"> <!--badge标记的is-dot（点）属性-->
              <p>显示类型</p>
              <el-radio-group v-model="config[index][indexIn].dotStatus">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].dotAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--badge标记的is-dot（点）属性-->
            <div v-else-if="indexIn === 'badgeStatus'"> <!--badge标记的状态属性-->
              <p>标记状态</p>
              <el-radio-group v-model="config[index][indexIn].hidden">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hiddenAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--badge标记的状态属性-->

            <div v-else-if="indexIn === 'tabsStatus'"> <!--tabs标签页的状态属性-->
              <p>可增加</p>
              <el-radio-group v-model="config[index][indexIn].addable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].addStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <p>可关闭</p>
              <el-radio-group v-model="config[index][indexIn].closable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <p>可同时增加和关闭</p>
              <el-radio-group v-model="config[index][indexIn].editable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].editStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--tabs标签页的状态属性-->
            <div v-else-if="indexIn === 'top'">
              <p>控件位置</p>
              <el-input type="input" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div> <!--Dialog对话框的top属性-->
            <div v-else-if="indexIn === 'title'"> <!--Dialog对话框的title属性-->
              <p>控件标题</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Dialog对话框、Popover的title属性-->
            <div v-else-if="indexIn === 'size'"> <!--Dialog对话框的size属性-->
              <p>控件大小</p>
              <el-radio-group v-model="config[index][indexIn].currentSize">
                <el-radio :key="radio.name" v-for="radio in config[index][indexIn].sizeAble" :label="radio.name">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的size属性-->
            <div v-else-if="indexIn === 'modal'"> <!--Dialog对话框的model属性-->
              <p>是否需要遮罩层</p>
              <el-radio-group v-model="config[index][indexIn].modal">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <template v-if="config[index][indexIn].modal">
                <p>遮罩层插入位置</p>
                <el-radio-group v-model="config[index][indexIn].modalPosition.modalPosition">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalPosition.modalPositionAble" :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </template>
            </div> <!--Dialog对话框的modal属性-->
            <div v-else-if="indexIn === 'lockScroll'"> <!--Dialog对话框的lockScroll属性-->
              <p>是否Dialog出现时将body滚动锁定</p>
              <el-radio-group v-model="config[index][indexIn].lockScroll">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].lockScrollAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的lockScroll属性-->
            <div v-else-if="indexIn === 'showClose'"> <!--Dialog对话框的showClose属性-->
              <p>是否显示关闭按钮</p>
              <el-radio-group v-model="config[index][indexIn].showClose">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showCloseAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的showClose属性-->

            <div v-else-if="indexIn === 'MessageBoxtitle'">
              <p>控件标题</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的title属性-->
            <div v-else-if="indexIn === 'inputValue'">
              <p>输入框的初始文本</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputValue属性-->
            <div v-else-if="indexIn === 'inputPattern'">
              <p>输入框的校验表达式</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputPattern属性-->
            <div v-else-if="indexIn === 'inputErrorMessage'">
              <p>校验未通过时的提示文本</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputPattern属性-->
            <div v-else-if="indexIn === 'showInput'">
              <p>是否显示输入框</p>
              <el-radio-group v-model="config[index][indexIn].showInput">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showInputable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--弹框MessageBox的showInput属性-->
            <div v-else-if="indexIn === 'confirmButtonText'">
              <p>确定按钮文字</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的confirmButtonText属性-->
            <div v-else-if="indexIn === 'cancelButtonText'">
              <p>取消按钮文字</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的cancelButtonText属性-->

            <div v-else-if="indexIn === 'trigger'"> <!--Popover的trigger属性-->
              <p>触发方式</p>
              <el-radio-group v-model="config[index].triggerModel">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的trigger属性-->
            <div v-else-if="indexIn === 'width'"> <!--Popover弹出框的width属性-->
              <p>控件宽度</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的width属性-->
            <div v-else-if="indexIn === 'content'">
              <p>控件内容</p>
              <el-input type="textarea" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的content属性-->
            <div v-else-if="indexIn === 'visibleArrow'"> <!--Popover弹出框的visibleArrow属性-->
              <p>是否显示Tooltip 箭头</p>
              <el-radio-group v-model="config[index][indexIn].visibleArrow">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].visibleArrowable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的visibleArrow属性-->
            <div v-else-if="indexIn === 'offset'"> <!--Popover弹出框的offset属性-->
              <p>位置偏移</p>
              <el-input type="input" @change="changeConfig()" v-model.number="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的offset属性-->
            <div v-else-if="indexIn === 'placement'"> <!--Popover弹出框的位置属性-->
              <p>控件位置</p>
              <el-radio-group v-model="config[index][indexIn].placement">
                <el-radio :key="radio.name" v-for="radio in config[index][indexIn].placementable" :label="radio.name">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的位置属性-->
          </div>
        </div> <!--CAttribute结束-->

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
        <div v-else-if="index === 'MessageBoxStatus'"> <!--弹框MessageBox的状态属性-->
          <div v-for="(itemIn, indexIn) in item">
            <div v-if="indexIn === 'showConfirmButton'">
              <p>是否显示确定按钮</p>
              <el-radio-group v-model="config[index][indexIn].showConfirmButton">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showConfirmButtonable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'showCancelButton'">
              <p>是否显示取消按钮</p>
              <el-radio-group v-model="config[index][indexIn].showCancelButton">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showCancelButtonable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'closeOnClickModal'">
              <p>是否可通过点击遮罩关闭MessageBox</p>
              <el-radio-group v-model="config[index][indexIn].closeOnClickModal">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeOnClickModalable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div> <!--弹框MessageBox的状态属性-->
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
