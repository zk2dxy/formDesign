<template>
  <div
    class="Index"
    :class="[
        fixedStatus === true ? 'headerHide' : ''
    ]"
  >
    <span
      title="显示菜单"
      class="headerShow el-icon-form el-icon-form-circle-down"
      :class="[
        !fixedStatus === true ? 'opacity0' : 'opacity100'
     ]"
      @click="changeHeader()"
    ></span>
    <!--头部 start-->
    <div
      class="header clearfix"
    >
      <span class="header-title fl"><i class="el-icon-form el-icon-form-table"></i>表单设计器</span>
      <div class="form-buttons fr">
        <span class="form-button" title="预览设计页面"><i class="el-icon-form el-icon-form-eye"></i> <span>预览</span></span>
        <span class="form-button" title="暂存页面数据，不提交"><i class="el-icon-form el-icon-form-stack"></i> <span>暂存</span></span>
        <span class="form-button" title="丢弃当前设计结果"><i class="el-icon-form el-icon-form-bin"></i> <span>丢弃</span></span>
        <span class="form-button" title="保存设计结果并且提交"><i class="el-icon-form el-icon-form-quill"></i> <span>提交</span></span>
      </div>
      <span @click="changeHeader()" class="headerIconRight el-icon-form el-icon-form-circle-up" title="拉起"></span>
    </div><!--ended-->
    <!--容器 start-->
    <div class="FContainer">
      <div class="formDesign" ref="formDesign" v-if="ControlList">
        <div class="leftControls" ref="leftControls">
          <ul class="typeBox" v-if="ControlList">
            <li
              @click="clickAction(index)"
              :class="[
            index === tabIndex ? 'active' : ''
          ]" class="items" v-for="(item, index) in ControlList.form.controls">
              {{item.name}}
            </li>
          </ul>
          <div v-if="index === tabIndex" class="controls" v-for="(item, index) in ControlList.form.controls">
            <draggable
              v-if="item.children.length > 0"
              class="spDiv"
              v-model="item.children"
              :clone="formClone"
              :options="{group:{name:'controls',pull:'clone', put: false}, animation: 0, ghostClass: 'movingControl', sort:false}"
            >
              <div
                v-if="item.children"
                v-for="controlItem in item.children"
                class="singleControl"
                :key="controlItem.CNameCN">
                <div class="spIn"></div>
                <el-button
                  class="moveButton"
                  icon="el-icon-success">
                  {{controlItem.CNameCN}}
                </el-button>
                <component
                  class="opacity0 hidden moveControl"
                  :ControlID='controlItem.id'
                  v-model="controlItem.config"
                  :is="controlItem.component"
                >
                </component>
                <!--{{controlItem}}-->
              </div>
            </draggable>
          </div>
        </div>
        <div class="container" ref="container">
          <div class="formDesignTitle">
            {{Config.FConfig.title}}
          </div>
          <div class="formContainer">
            <draggable
              v-model="formStorage.states"
              :options="{name:'list',animation: 100,group:{name:'controls'},ghostClass: 'item-block-drag'}"
              style="display:flex; padding-bottom:50px"
              :style="[
            computedFormClass === true ?{'display' : 'flex'} : {'display' : 'block'}
          ]"
              :class="[
            computedFormClass ? '' : 'floatChildren'
          ]"
            >
              <component
                v-if="formStorage.states"
                class="item"
                v-for="(controlItem, key) in formStorage.states"
                :key="controlItem.id"
                :ControlConfig="controlItem.config"
                :ControlID='controlItem.id'
                :is="controlItem.component"
                :children="controlItem.children"
                :childrenDefault="controlItem.childrenDefault"
                :formOBJ="formStorage"
                :formItem="controlItem"
                :Methods="Methods"
                @changeTAB="changeTabs"
                :style="[
              controlItem.config.layoutModel === 'percentLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`%`} : null,
              controlItem.config.layoutModel === 'pixelLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`px`} : null,
              controlItem.config.layoutModel === 'flexLayout'  && controlItem.config.currentLayout !== null ? {'flex' : controlItem.config.currentLayout.default} : null
            ]"
              >
              </component>
            </draggable>
            <!--{{formStorage.states}}-->
          </div>
        </div>
        <div class="rightFormSettings" ref="rightFormSettings">
          <form-settings
            v-if="properties"
            :properties="properties"
            :selectControl="formStorage.selected"
            :config="formStorage.selected"
            :fConfig="Config.FConfig"
            :formOBJ="formStorage"
            :tabStatus="tabStatus"
            :Methods="Methods"
          ></form-settings>
        </div>
      </div>
    </div><!--ended-->
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'
  import {calcLayoutClass} from '@/assets/js/common'
  import FormSettings from '@/components/module/formDesign/FormSettingsBak.vue'
  import * as properties from 'api/properties.json'
  import FormStore from '@/store/formStore'
  import Properties from '@/store/formProperties'
  import Methods from '@/store/formMethods'

  export default {
    name: `Index`,
    components: {
      draggable,
      FormSettings
    },
    created () {
      this.loading = this.$loading({
        text: '拼命加载中...'
      })
    },
    mounted () {
      // 定时计划loading
      this.timeInterval = setInterval(() => {
        if (this.properties !== null) {
          if (!this.formStorage) {
            this.formStorage = new FormStore(this)
          }
          window.clearInterval(this.timeInterval)
          this.loadAllControls()
          this.loading.close()
        }
      }, 100)

      // 模拟请求属性
      setTimeout(() => {
        if (properties.retCode === 1) {
          if (!this.properties) {
            this.properties = new Properties(this)
            this.properties.mutations.setData(this.properties, properties.data.properties)
            this.Methods = new Methods(this)
            this.Methods.mutations.setData(this.Methods, properties.data.methods)
          }
        } else {
          alert('表单设计属性集请求数据失败')
        }
      }, 1500)

      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    updated () {
    },
    /* keep-alive 组件激活时调用。 */
    activated () {
    },
    /* keep-alive 组件停用时调用。 */
    deactivated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    watch: {
      controlSelect (val) {
        console.warn('controlSelect = >')
        console.error(val)
      }
    },
    computed: {
      layoutClass () {
        return calcLayoutClass(this.formStorage.states)
      },
      computedFormClass () {
        let flex = true
        if (this.formStorage.states) {
          if (this.formStorage.states.length > 0) {
            let flexClass = 'flexLayout'
            for (let key in this.formStorage.states) {
              flex = (this.formStorage.states[key].config.currentLayout.value === flexClass) && flex
              if (!flex) {
                break
              }
            }
            return flex
          }
        } else {
          return flex
        }
      }
    },
    methods: {
      formClone (originData) {
        let newObj = this.L.cloneDeep(originData)
        let _uuid = uuid.v4()
        newObj.id = _uuid
        return newObj
      },
      clickAction (key) {
        this.tabIndex = key // 改变tab索引
      },
      loadAllControls () {
        this.ControlList = {
          form: {
            title: '表单容器',
            name: 'form',
            containerConfig: {
              workflow: [], // 工作流配置
              dataOrigin: [], // 数据来源配置
              config: [] // 自身配置
            }, // 容器配置
            controls: {
              normal: {
                name: '基础控件',
                children: [{
                  CNameCN: '输入框',
                  CNameEN: 'input',
                  parent: 'form', // 父级对象
                  type: 'input', // 类型
                  component: 'CInput',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '单选框',
                  CNameEN: 'radio',
                  parent: 'form', // 父级对象
                  type: 'radio', // 类型
                  component: 'CRadio',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '多选框',
                  CNameEN: 'checkbox',
                  parent: 'form', // 父级对象
                  type: 'checkbox', // 类型
                  component: 'CCheckbox',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '选择器',
                  CNameEN: 'select',
                  parent: 'form', // 父级对象
                  type: 'select', // 类型
                  component: 'CSelect',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '折叠面板',
                  CNameEN: 'collapse',
                  parent: 'form', // 父级对象
                  type: 'collapse', // 类型
                  component: 'CCollapse',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '标签',
                  CNameEN: 'tag',
                  parent: 'form', // 父级对象
                  type: 'tag', // 类型
                  component: 'CTag',
                  config: '' // 控件配置
                }, {
                  CNameCN: '按钮',
                  CNameEN: 'button',
                  parent: 'form', // 父级对象
                  type: 'button', // 类型
                  component: 'CButton',
                  config: '' // 控件配置
                }, {
                  CNameCN: '标记',
                  CNameEN: 'badge',
                  parent: 'form', // 父级对象
                  type: 'badge', // 类型
                  component: 'CBadge',
                  config: '' // 控件配置
                }, {
                  CNameCN: '面板',
                  CNameEN: 'CCard',
                  parent: 'form', // 父级对象
                  type: 'card', // 类型
                  component: 'CCard',
                  config: '' // 控件配置
                }, {
                  CNameCN: '级联选择器',
                  CNameEN: 'cascader',
                  parent: 'form', // 父级对象
                  type: 'cascader', // 类型
                  component: 'CCascader',
                  config: '' // 控件配置
                }, {
                  CNameCN: '时间选择器',
                  CNameEN: 'CDateTimePicker',
                  parent: 'form', // 父级对象
                  type: 'timePicker', // 类型
                  component: 'CDateTimePicker',
                  config: '' // 控件配置
                }, {
                  CNameCN: '等待框配置',
                  CNameEN: 'loading',
                  parent: 'form', // 父级对象
                  type: 'loading', // 类型
                  component: 'CLoading',
                  config: '' // 控件配置
                }, {
                  CNameCN: '分页控件',
                  CNameEN: 'CPage',
                  parent: 'form', // 父级对象
                  type: 'page', // 类型
                  component: 'CPage',
                  config: '' // 控件配置
                }, {
                  CNameCN: '弹出框',
                  CNameEN: 'popover',
                  parent: 'form', // 父级对象
                  type: 'popover', // 类型
                  component: 'CPopover',
                  config: '' // 控件配置
                }, {
                  CNameCN: '进度条',
                  CNameEN: 'progress',
                  parent: 'form', // 父级对象
                  type: 'progress', // 类型
                  component: 'CProgress',
                  config: '' // 控件配置
                }, {
                  CNameCN: '滑块',
                  CNameEN: 'slider',
                  parent: 'form', // 父级对象
                  type: 'slider', // 类型
                  component: 'CSlider',
                  config: '' // 控件配置
                }, {
                  CNameCN: '开关',
                  CNameEN: 'switch',
                  parent: 'form', // 父级对象
                  type: 'switch', // 类型
                  component: 'CSwitch',
                  config: '' // 控件配置
                }]
              },
              extend: {
                name: '扩展控件',
                children: []
              },
              layout: {
                name: '布局控件',
                children: [{
                  CNameCN: '布局控件',
                  CNameEN: 'layout',
                  parent: 'form', // 父级对象
                  type: 'layout', // 类型
                  component: 'CLayout',
                  config: '', // 控件配置
                  children: [[]], // 绑定值props
                  childrenDefault: [[]]
                }]
              }
            }
          }
        }
      },
      changeViewForm (fConfig) {
        this.Config.FConfig = fConfig
      },
      changeTabs (config) {
        if (config.type === 'layout' || config.type === 'button') {
          this.tabStatus = true
        } else {
          this.tabStatus = false
        }
      },
      changeHeader () {
        this.fixedStatus = !this.fixedStatus
      }
    },
    data () {
      return {
        // activeS: 'formSetting',
        fixedStatus: false,
        list: [],
        tabStatus: false, // 是否不需要选属性
        controlSelect: null, // 是否选中了控件
        timeInterval: null, // 获取属性集定时器
        loading: null, // loading 表单设计器loading控件
        tabIndex: 'normal', // 设置控件选择状态
        tabHeight: 2.35,
        formStorage: null, // 表单设计器数据
        properties: null, // 单据一级属性数据集合
        Methods: null, // 单据方法数据集合
        ControlList: null,
        Config: {
          FConfig: {
            title: '表单标题',
            description: '表单描述',
            classification: '',
            listViews: [],
            flowBindResult: [],
            properties: null
          },
          CConfig: ''
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .Index
    position absolute
    left 0
    right 0
    top 0
    bottom 0

  .headerHide
    .header
      top -4rem !important
    .FContainer
      top 0

  .header
    transition all .5s
    position fixed
    z-index 2
    left 0
    right 0
    top 0
    height 2rem
    background-color $font-primary
    padding 1rem 4rem 1rem 2rem
    .header-title
      color $font-none
      font-size 1.4rem
      display inline-block
      line-height 2rem
      > i.el-icon-form
        vertical-align top
        font-size: 1.4rem
        margin-right .4rem
    .form-button
      height 1.4rem
      display inline-block
      border 1px solid rgba(255, 255, 255, .3)
      padding .3rem 1rem
      color $font-none
      background-color rgba(255, 255, 255, .2)
      border-radius 3px
      cursor pointer
      transition all .5s
      margin-left .4rem
      &:hover
        background rgba(247, 186, 42, .5)
      > i.el-icon-form
        vertical-align top

  .FContainer
    transition all .5s
    position absolute
    left 0
    top 4rem
    right 0
    bottom 0
    z-index 1
    overflow hidden

  .headerIconRight
    position absolute
    right 1rem
    top 1rem
    color rgba(255, 255, 255, .6)
    display inline-block
    cursor pointer
    padding .4rem
    &:before
      font-size 1.4rem

  .headerShow
    position fixed
    background $font-none
    border-radius 50%
    cursor pointer
    z-index 2
    right 0.1rem
    top .1rem
    color $font-primary
    &:before
      font-size 1.6rem

  .leftControls
    width 23%
    position absolute
    top 1%
    bottom 1%
    left 1%
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)

  .container
    width 50%
    position absolute
    overflow auto
    top 1%
    bottom 1%
    left 25%
    right 25%
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
    .formContainer
      padding 11px 15px

  .rightFormSettings
    position absolute
    overflow auto
    width 23%
    top 1%
    bottom 1%
    right 1%
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)

  .controls
    padding: 0 .4rem
    > .item
      width 50%
      text-align center
      margin-bottom .4rem

  .typeBox
    display: block
    width: 100%
    height 2.35rem
    .items
      &.active
        background-color rgb(102, 175, 233)
        color rgba(255, 255, 255, .9)
      display block
      width 33%
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

  .singleControl
    display inline-block
    width 46%
    margin .2rem 1.5%
    > .el-button
      display block
      width 100%
      padding-left 0
      padding-right 0
      text-align left
      text-indent .2rem

  .formDesignTitle
    font-size $font-huge
    color $font-primary
    padding 11px 15px
    border-bottom 1px dashed $font-primary

  .floatChildren
    clear both
    &:after
      content: "."
      display: block
      height: 0
      clear: both
      visibility: hidden
    .item
      float left
      margin-bottom 10px

  .formContainer
    .movingControl
      .moveButton
        opacity 0 !important
        display none !important
      .moveControl
        opacity 1 !important
        display block !important

  /* Resolve the draggable bug for firefox */
  .spDiv
    > .singleControl
      position relative
      > .spIn
        position absolute
        left 0
        right 0
        top 0
        bottom 0

</style>
