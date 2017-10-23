<template>
  <div class="formDesign" ref="formDesign">
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
          v-model="item.children"
          :options="{group:{name:'controls',pull:'clone', put: false}, animation: 0, ghostClass: 'ghost-none', sort:false}"
          :clone="formClone"
        >
          <div
            v-if="item.children"
            v-for="controlItem in item.children"
            class="singleControl"
            :key="controlItem.CNameCN">
            <el-button icon="circle-check">
              {{controlItem.CNameCN}}
            </el-button>
            <component
              class="opacity0 hidden"
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
        表单标题
      </div>
      <div class="formContainer">
        <draggable
          v-model="list"
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
            v-if="list"
            class="item"
            :key="controlItem.id"
            v-for="controlItem in list"
            :ControlConfig="controlItem.config"
            :ControlID='controlItem.id'
            :is="controlItem.component"
            v-model="controlItem.config"
            @getValue="showAttribute($event,controlItem)"
            :children="controlItem.children"
            :childrenDefault="controlItem.childrenDefault"
            :style="[
            controlItem.config.layoutModel === 'percentLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`%`} : null,
            controlItem.config.layoutModel === 'pixelLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`px`} : null,
            controlItem.config.layoutModel === 'flexLayout'  && controlItem.config.currentLayout !== null ? {'flex' : controlItem.config.currentLayout.default} : null
          ]"
          >
          </component>
        </draggable>
      </div>
    </div>
    <div class="rightFormSettings" ref="rightFormSettings">
      <form-settings
        :config="Config.CConfig"
        :fConfig="Config.FConfig"
        @changeConfig="changeView"
      ></form-settings>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'
  import {calcLayoutClass} from '@/assets/js/common'
  import FormSettings from '@/components/module/formDesign/FormSettings'

  export default {
    name: `formDesign`,
    components: {
      draggable,
      FormSettings
    },
    created () {
      this.loadAllControls()
    },
    mounted () {
      // console.info(uuid)
      // console.info(calcLayoutClass)
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
    watch: {},
    computed: {
      layoutClass () {
        return calcLayoutClass(this.list)
      },
      computedFormClass () {
        let flex = true
        if (this.list.length > 0) {
          let flexClass = 'flexLayout'
          for (let key in this.list) {
            console.error(this.list[key].config)
            flex = (this.list[key].config.currentLayout.value === flexClass) && flex
            if (!flex) {
              break
            }
          }
          return flex
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
      showAttribute (data, item) {
        this.Config.CConfig = data
      },
      changeView (config) {
      }
    },
    data () {
      return {
        tabIndex: 'normal',
        tabHeight: 2.35,
        list: [],
        ControlList: null,
        Config: {
          FConfig: {
            title: '',
            description: '',
            classification: '',
            listViews: [],
            flowBindResult: []
          },
          CConfig: ''
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .leftControls
    width 18%
    position absolute
    top 1%
    bottom 1%
    left 1%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)

  .container
    width 60%
    position absolute
    top 1%
    bottom 1%
    left 20%
    right 20%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)
    .formContainer
      padding 11px 15px

  .rightFormSettings
    position absolute
    overflow auto
    width 18%
    top 1%
    bottom 1%
    right 1%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)

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
</style>
