<template>
  <div class="HelloWorld">
    <!--{{computedFormClass}}-->
    <div class="leftControlArea" v-if="ControlList!=null" v-for="container in ControlList">
      <draggable
        v-model="container.controls"
        :options="{group:{name:'controls',pull:'clone', put: false}, animation: 0, ghostClass: 'ghost-none', sort:false}"
        :clone="formClone"
      >
        <div
          class="item"
          v-if="container.controls"
          v-for="controlItem in container.controls"
        >
          <div class="singleControl" :key="controlItem.CNameCN">
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
        </div>
      </draggable>
    </div>
    <div class="formContainer">
      <!--布局容器-->
      <draggable
        v-model="list"
        :options="{name:'list',animation: 100,group:{name:'controls'},ghostClass: 'item-block-drag'}"
        style="min-height: 200px;display:flex"
        :style="[
          computedFormClass === true ?{'display' : 'flex'} : {'display' : 'block'}
        ]"
        :class=layoutClass
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
      {{list}}
    </div>
    <div class="rightControlArea">
      <control-config-pyy
        v-if="Config.CConfig"
        :config="Config.CConfig"
        @changeConfig="changeView"
      ></control-config-pyy>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'
  import {calcLayoutClass} from '@/assets/js/common'
  //  import CKeyApi from 'api/CKey'

  export default {
    components: {
      draggable
    },
    name: `HelloWorld`,
    data () {
      return {
        list: [],
        ControlList: null,
        Config: {
          FConfig: '',
          CConfig: ''
        }
      }
    },
    created () {
      this.loadAllControls()
      // console.error(this.I)
      // console.error(calcLayoutClass)
    },
    mounted () {
    },
    watch: {
      list (val, oldVal) {
      }
    },
    methods: {
      destroyDom () {
        // console.error(`destroyDom`)
      },
      formClone (originData) {
        let newObj = this.L.cloneDeep(originData)
        let _uuid = uuid.v4()
        newObj.id = _uuid
        return newObj
      },
      loadAllControls () {
        this.ControlList = {
          form: {
            title: '表单容器',
            name: 'form',
            containerConfig: {
              layout: ['flex', 'pixed', 'percent', 'column'], // 布局配置
              workflow: [], // 工作流配置
              dataOrigin: [], // 数据来源配置
              config: [] // 自身配置
            }, // 容器配置
            controls: [
              {
                CNameCN: '输入框',
                CNameEN: 'input',
                parent: 'form', // 父级对象
                type: 'input', // 类型
                component: 'CInput',
                config: '' // 控件配置,
              }, {
                CNameCN: '布局控件',
                CNameEN: 'layout',
                parent: 'form', // 父级对象
                type: 'layout', // 类型
                component: 'CLayout',
                config: '', // 控件配置
                children: [[]], // 绑定值props
                childrenDefault: [[]]
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
              }
            ]
          }
        }
      },
      showAttribute (data, item) {
        this.Config.CConfig = data
      },
      changeView (config) {
        // console.warn(`config =>`)
        // console.warn(JSON.stringify(config))
      }
    },
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
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .layout-flex
    display flex

  .layout-pixel
    display block

  .layout-col
    display block

  .layout-percent
    display block

  .dragBLOCK
    min-height 200px
    background lightpink
    > div
      margin-bottom 10px

  .HelloWorld
    > div
      float left
      min-height 200px
    .leftControlArea
      width 20%
      margin-right 2.5%
      > div
        float left
        display block

    .formContainer
      width 55%
    .rightControlArea
      width 20%
      margin-left 2.5%
    .draggable
      min-height 200px

  .item
    margin: 10px 0
    float left
</style>
