<template>
  <div class="ControlConfig">
    <ul class="typeBox">
      <li @click="changeTab('formSetting')" class="items" :class="[
        activeJudge === true ? 'active' : ''
      ]">
        表单属性
      </li>
      <li @click="changeTab('controlSetting')" class="items" :class="[
        activeJudge === false ? 'active' : ''
      ]">
        控件属性
      </li>
    </ul>
    <div class="controlAttribute">
      <!--表单设置 start-->
      <div v-if="activeJudge">
        <el-form class="controlElForm" label-position="right" label-width="70px">
          <el-form-item
            class="lineRow"
            label="设置标题"
          >
            <el-input
              @change="changeFConfig"
              placeholder="请输入标题"
              v-model="fConfig.title"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="lineRow"
            label="设置描述"
          >
            <el-input
              type="textarea"
              placeholder="表单描述"
              v-model="fConfig.description"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div><!--表单设置 ended-->
      <!--控件属性设置 start-->
      <div v-else-if="!activeJudge && config" class="configSetting">
        <div v-for="(item , index) in config">
          <!--标题 start-->
          <div v-if="index === 'CTitleCN'">
            <el-form label-position="left" label-width="70px">
              <el-form-item
                class="lineRow"
                label="控件标题"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件标题"
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--标题ended-->
          <!--英文标题start-->
          <div v-else-if="index === 'CTitleEN'">
            <el-form label-position="left" label-width="70px">
              <el-form-item
                class="lineRow"
                label="英文标题"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件英文标题"
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--英文标题ended-->
          <!--文字对齐方式 start-->
          <div v-else-if="index === 'labelPositionModel'">
            <el-form label-position="top">
              <el-form-item
                class="lineRow"
                label="对齐方式"
              >
                <el-radio-group v-model="config[index]">
                  <el-radio
                    v-if="config.labelPositionValue.length > 0"
                    :key="radio.value"
                    v-for="radio in config.labelPositionValue"
                    :label="radio.value"
                  >
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div><!--文字对齐方式 ended-->
          <!--控件标题宽度 start-->
          <div v-else-if="index === 'labelWidth' && config.labelPositionModel !== 'top'">
            <el-form label-position="right" label-width="70px">
              <el-form-item
                class="lineRow"
                label="标题宽度"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder='单位像素'
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--控件 标题宽度 ended-->
          <!--Demo start-->
          <div v-else-if="index === ''">
            <el-form label-position="right" label-width="70px">
              <el-form-item
                class="lineRow"
                label=""
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder=""
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--Demo ended-->
        </div>
      </div><!--控件属性设置 start-->
      <div v-else-if="!activeJudge && !config">
        <span class="warnSpan">请选择需要编辑的控件</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {layoutJudge} from '@/assets/js/common'

  export default {
    name: 'ControlConfig',
    props: ['config', 'fConfig'],
    destroy () {
      console.info(`destroy`)
    },
    data () {
      return {
        activeSetting: 'formSetting',
        startTime: '',
        stepTime: '',
        endTime: '',
        formateItems: ['HH:mm:ss', 'HH-mm-ss', 'HH/mm/ss'],
        timeSelectableRange: new Date(),
        addSwitchValue: false, // 是否增加switch值
        currentIndex: 0, // 当前选中项在默认值的index(多选)
        selectedGroup: {
          label: '',
          options: {label: '', showContent: '', isDisabled: false}
        },
        rules: {
//          radio和checkbox label值校验
          label: [
            {required: true, message: '请输入选项值'},
            {
              validator: (rules, value, callback) => {
                this.config.CAttribute.itemAttr.forEach((item, index) => {
                  if (item.label === value && index !== this.config.CAttribute.currentSelected) {
                    this.config.CAttribute.itemAttr[this.config.CAttribute.currentSelected].label = ''
                    callback(new Error('选项值不可以重复'))
                  }
                })
                callback()
              }
            }
          ]
        },
        rulesSlider: {
          //          sliderStep值校验
          sliderStep: [
            {required: true, message: '请输入步长'},
            {
              validator: (rules, value, callback) => {
                if (!/^\d+(\.\d+)?$/.test(value)) { // 只能是数字
                  this.config.CAttribute.sliderStep = 1
                  callback(new Error('请输入数字'))
                }
                callback()
              }
            }
          ],
          height: [
            {required: true, message: '请输入高度'},
            {
              validator: (rules, value, callback) => {
                if (!/^\d+(\.\d+)?$/.test(value)) { // 只能是数字
                  this.config.CAttribute.height = 300
                  callback(new Error('请输入数字'))
                }
                callback()
              }
            }
          ]
        },
        rulesAdd: {}
      }
    },
    mounted () {
      if (this.config) {
        this.activeSetting = 'controlSetting'
      }
    },
    computed: {
      activeJudge () {
        if (this.activeSetting === 'formSetting') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      changeTab (values) {
        this.activeSetting = values
      },
      //      添加collapse条目
      addItem () {
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
        this.config.CAttribute.collapseItem.push({name: '', title: '', content: ''})
      },
//      关闭collapse对话框
      closeCollapseDialog ($flag) {
        if ($flag === false) {
          this.config.CAttribute.collapseItem.pop()
        }
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
      },
//      添加card内容条目
      addCardItem () {
        let parentAttribute = this.config.CAttribute
        let currentVal = parentAttribute.cardCurrent
        parentAttribute.cardItemAttribute.addCardItemFlag = !parentAttribute.cardItemAttribute.addCardItemFlag
        parentAttribute.cardItemAttribute.cardItem[currentVal].contentItem.push({content: ''})
      },
//      关闭card对话框
      closeCardDialog ($flag) {
        let parentAttribute = this.config.CAttribute
        let currentVal = parentAttribute.cardCurrent
        if ($flag === false) {
          parentAttribute.cardItemAttribute.cardItem[currentVal].contentItem.pop()
        }
        parentAttribute.cardItemAttribute.addCardItemFlag = !parentAttribute.cardItemAttribute.addCardItemFlag
      },
//      修改card图片
      handleAvatarSuccess (res, file) {
        this.cardImageUrl = URL.createObjectURL(file.raw)
        this.config.CAttribute.cardUploadFlag = true
        this.config.CAttribute.cardItemAttribute.cardItem[this.config.CAttribute.cardCurrent].imageUrl = this.cardImageUrl
      },
      validateLayout (layoutItem, layoutType) {
        console.error(`validateLayout`)
        let returnValue = layoutJudge(layoutItem, layoutType)
        if (!returnValue) {
          return
        }
        if (returnValue.msg !== '') {
          this.reverseLayoutValue(returnValue)
          this.$message({
            type: 'error',
            message: returnValue.msg
          })
        }
        // this.$emit('changeConfig', this.config)
      },
      reverseLayoutValue (item) {
        for (let key in this.config.CLayout) {
          if (this.config.CLayout[key].value === item.type) {
            this.config.CLayout[key].default = item.value
            break
          } else {
            continue
          }
        }
      },
      getLayoutItem () {
        for (let key in this.config.CLayout) {
          if (this.config.CLayout[key].value === this.config.layoutModel) {
            this.config.CLayout[key].status = true
            this.config.currentLayout = this.config.CLayout[key]
          } else {
            this.config.CLayout[key].status = false
          }
        }
      },
      changeConfig () {
        this.$emit('changeConfig', this.config)
      },
      changeFConfig () {
        this.$emit('changeFConfig', this.fConfig)
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
        // 设置switch的icon by pyy
        if (this.config.CName === 'CSwitch') {
          this.setSwitchIcon()
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
        // console.error(chooseRes)
        if (chooseRes !== '') {
          window.validateOBJ.validateModel = chooseRes
        }
        window.validateOBJ.chooseStatus = false
      },
      validateStatusChange (item) {
        if (!item.status) {
          this.config.CValidate.validateModel = ''
        }
      },
      // by pyy
      AddItem () {
        this.config.CAttribute.addStatus = !this.config.CAttribute.addStatus
        if (this.config.CAttribute.typeModel !== 'selectGroup') {
          this.config.CAttribute.itemAttr.push({label: '', showContent: '', isDisabled: false})
        }
      },
      HandleClose (value) {
        if (value === '') {
          if (this.config.CAttribute.typeModel !== 'selectGroup') {
            this.config.CAttribute.itemAttr.pop()
          } else {
            this.config.CAttribute.itemAttrSelectGroup.pop()
          }
        }
        if (this.config.CAttribute.typeModel === 'selectGroup') {
          for (let i = 0; i < this.config.CAttribute.itemAttrSelectGroup.length; i++) {
            if (this.config.CAttribute.itemAttrSelectGroup[i].label === this.selectedGroup.label) {
              this.config.CAttribute.itemAttrSelectGroup[i].options.push(this.selectedGroup.options)
              setTimeout(() => {
                this.selectedGroup = {
                  label: '',
                  options: {label: '', showContent: '', isDisabled: false}
                }
              }, 20)
              break
            } else if (i === this.config.CAttribute.itemAttrSelectGroup.length - 1) {
              this.config.CAttribute.itemAttrSelectGroup.push({
                label: this.selectedGroup.label,
                options: [this.selectedGroup.options]
              })
              setTimeout(() => {
                this.selectedGroup = {
                  label: '',
                  options: {label: '', showContent: '', isDisabled: false}
                }
              }, 20)
              break
            }
          }
        }
        this.config.CAttribute.addStatus = false
      },
      DeleteItem (index) {
        this.config.CAttribute.itemAttr.splice(index, 1)
        this.config.CAttribute.currentSelected = 0
        this.config.CAttribute.defaultSelected = ''
      },
      // checkbox聚焦
      focusCheckbox () {
        if (this.config.CName === 'CCheckbox') {
          this.config.CAttribute.defaultCheckboxSelected.forEach((item, index) => {
            if (item === this.config.CAttribute.itemAttr[this.config.CAttribute.currentSelected].label) {
              this.currentIndex = index
            }
          })
        }
      },
      // radio,checkbox,select值与绑定值的同步
      valueChange (value) {
        if (this.config.CName === 'CRadio') {
          this.config.CKey.default = value
        } else if (this.config.CName === 'CSelect') {
          this.config.CAttribute.defaultSelected = value
        } else {
          this.config.CAttribute.defaultCheckboxSelected[this.currentIndex] = value
        }
      },
      // select事件
      DeleteItemSelectGroup (arr) {
        this.config.CAttribute.itemAttrSelectGroup[arr[0]].options.splice(arr[1], 1)
        this.config.CAttribute.currentSelectedGroup = [0, 0]
        this.config.CAttribute.defaultSelected = ''
      },
      doSelectMultiple () {
        if (this.config.CAttribute.isMultiple === true) {
          this.config.CAttribute.defaultSelected = []
        } else {
          this.config.CAttribute.defaultSelected = ''
        }
      },
      doSelectCreate () {
        if (this.config.CAttribute.isSelectCreate === true) {
          this.config.CAttribute.isSelectFilterable = true
        }
      },
      doSelectRemote () {
        if (this.config.CAttribute.isSelectRemote === true) {
          this.config.CAttribute.isSelectFilterable = true
        }
      },
      focusSelect () {
        if (this.config.CAttribute.isMultiple) {
          let currentLabel = this.config.CAttribute.itemAttrSelectGroup[this.config.CAttribute.currentSelectedGroup[0]]
            .options[this.config.CAttribute.currentSelectedGroup[1]].label
          this.config.CAttribute.defaultSelected.forEach((item, index) => {
            if (item === currentLabel) {
              this.currentIndex = index
            }
          })
        }
      },
      // selectGroup值改变
      selectValueChange (value) {
        if (!this.config.CAttribute.isMultiple) {
          this.config.CAttribute.defaultSelected = value
        } else {
          this.config.CAttribute.defaultSelected[this.currentIndex] = value
        }
      },
      // switch事件
      switchValue (value) {
        if (value !== '') {
          this.config.CAttribute.defaultSwitchStatus = value
        }
      },
      setSwitchIcon () {
        if (this.config.CAttribute.switchStatus) {
          this.config.CAttribute.onSwitchIcon = 'el-icon-' + this.config.Icon.className
        } else {
          this.config.CAttribute.offSwitchIcon = 'el-icon-' + this.config.Icon.className
        }
      },
      // slider
      rangeChange () {
        if (this.config.CAttribute.sliderRange) {
          this.config.CAttribute.sliderShowInput = false
        }
      },
      // datepicker
      formatStartTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeStartend = value
        } else {
          this.config.CAttribute.timeStart = value
        }
      },
      formatStepTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeStepend = value
        } else {
          this.config.CAttribute.timeStep = value
        }
      },
      formatEndTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeEndend = value
        } else {
          this.config.CAttribute.timeEnd = value
        }
      },
      formatSelectableRange (value) {
        this.config.CAttribute.timeSelectableRange = value
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

  .controlAttribute
    position absolute
    top 2.3rem
    left .2rem
    right .2rem
    bottom .2rem
    > div
      padding: .3rem

  .typeBox
    display: flex
    width: 100%
    height 2.35rem
    .items
      &.active
        background-color rgb(102, 175, 233)
        color rgba(255, 255, 255, .9)
      flex 1
      float left
      line-height 1rem
      padding .5rem 0
      text-align center
      overflow hidden
      text-overflow ellipsis
      height 1rem
      border-bottom 1px solid #e1e1e1
      border-right 1px solid #e1e1e1
      cursor pointer
      &:last-child
        border-right none

  .controlElForm, .configSetting
    > div
      margin-bottom .3rem

  .warnSpan
    background $font-danger
    color #fff
    display block
    padding 7px 15px
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px
    font-size $font-normal

  .lineRow
    padding-bottom .3rem
    border-bottom: 1px dashed rgba(102, 175, 233, .5)

</style>
