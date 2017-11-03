<template>
  <div class="ControlsManage">
    <div class="controlsManageTitle">
      <span class="navText">控件管理平台</span>
      <!--<el-button size="small" @click="doSave">保存</el-button>-->
    </div>
    <div class="controlsLib">
      <el-tabs type="border-card">
        <el-tab-pane
          v-for="item in controls"
          :key="item.name"
          :label="item.name">
          <div
            class="heightPanel">
            <template v-for="itemChildren in item.children">
              <el-button
                class="controlsButton"
                icon="circle-check"
                @click="doSelectChange(itemChildren)">
                {{itemChildren.CNameCN}}
              </el-button>
              <component
                class="opacity0 hidden"
                :ControlID='itemChildren.id'
                v-model="itemChildren.config"
                :is="itemChildren.component"
              ></component>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="editAttribute">
      <div class="title">
        编辑控件属性
        <span class="button">
          <el-button
            type="primary"
            @click="doSave(updatedComponent.CNameEN)">应用</el-button>
        </span>
      </div>
      <div v-if="updatedComponent">
        <el-scrollbar
          class="list-items-scroll"
          wrap-class="list-items-scroll-wrapper"
          view-class="el-select-dropdown__list"
        >
          <controls-manage-settings
            class="ShowAttribute"
            @addDelete="addDelete"
            @subDelete="subDelete"
            :config="updatedComponent.config">
          </controls-manage-settings>
        </el-scrollbar>
      </div>
      <div v-else class="blankText">
        请选择控件
      </div>
    </div>
    <div class="controlsPreview">
      <div class="hrClass"></div>
      <div class="title">控件预览</div>
      <div
        v-if="updatedComponent"
        class="PreviewComponent">
        <el-scrollbar
          class="list-items-scroll"
          wrap-class="list-items-scroll-wrapper"
          view-class="el-select-dropdown__list"
        >
          <component
            :ControlConfig="updatedComponent.config"
            :ControlID="updatedComponent.id"
            :ManageStatus="true"
            :is="updatedComponent.component"
            v-model="updatedComponent.config"
            :children="updatedComponent.children"
            :childrenDefault="updatedComponent.childrenDefault"
          ></component>
        </el-scrollbar>
      </div>
      <div v-else class="blankText">
        请选择控件
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import uuid from 'node-uuid'
  import ControlsManageSettings from './ControlsManageSettings'
  export default {
    name: `ControlsManage`,
    data () {
      return {
        updatedComponent: null, // 控件属性
        deleteAttribute: {}, // 不可编辑的属性
        deletedComponentAttribute: null,
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
    },
    components: {
      ControlsManageSettings
    },
    created () {
      let init = JSON.parse(localStorage.getItem('deleteAttribute'))
      if (init) {
        this.deleteAttribute = init
      }
    },
    methods: {
      addDelete (value) {
        let key = this.updatedComponent.config.CName
        if (!this.deleteAttribute[key]) {
          this.$set(this.deleteAttribute, key, [])
          this.deleteAttribute[key].push(value)
        } else if (this.deleteAttribute[key].indexOf(value) === -1) {
          this.deleteAttribute[key].push(value)
        }
      },
      subDelete (value) {
        let key = this.updatedComponent.config.CName
        let index = this.deleteAttribute[key].indexOf(value)
        this.deleteAttribute[key].splice(index, 1)
      },
      doSelectChange (item) {
        let updateData = JSON.parse(localStorage.getItem(item.CNameEN))
        if (updateData) {
          this.updatedComponent = updateData
        } else {
          let newObj = this.L.cloneDeep(item)
          let _uuid = uuid.v4()
          newObj.id = _uuid
          this.updatedComponent = newObj
        }
//        let newObj = this.L.cloneDeep(item)
//        let _uuid = uuid.v4()
//        newObj.id = _uuid
//        this.updatedComponent = newObj
      },
      doSave (key) {
        if (window.localStorage) {
          localStorage.setItem('deleteAttribute', JSON.stringify(this.deleteAttribute))
          let updateData = JSON.stringify(this.updatedComponent)
          localStorage.setItem(key, updateData)
        } else {
          alert('do not support localStorage')
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .ControlsManage
    overflow hidden
  .controlsManageTitle
    position relative
    padding-left 15px
    width 100%
    height 40px
    background-color $font-primary
    .navText
      line-height 40px
      font-size $font-huge
      color $font-none
  .controlsLib
    position relative
    width 25%
    .heightPanel
      height 750px
      .controlsButton
        width 120px
        margin-left 20px
        text-align left
        margin-bottom 10px
  .controlsPreview
    position relative
    left 26%
    bottom 220px
    height 20%
    width 74%
    .title
      position absolute
      font-size $font-large
      width 100%
      top 15px
    .PreviewComponent
      position relative
      margin-top 50px
    .blankText
      position absolute
      left 50%
      top 50%
  .editAttribute
    position absolute
    left 26%
    top 48px
    bottom  2% + 20px
    width 74%
    .title
      position relative
      font-size $font-large
      width 74%
      top 5px
      font-weight bold
      padding-bottom 50px
      .button
        position absolute
        right 20px
        font-size $font-normal
        color $font-default
    .ShowAttribute
      position relative
      height 500px
    .blankText
      position absolute
      left 50%
      top 50%
  .hrClass
    position relative
    height 2px
    top 0
    background-color $font-primary
</style>
