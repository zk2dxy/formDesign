<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-tabs
        v-model="editableTabsValue"
        :type="config.CAttribute.typeModel"
        :closable="config.CAttribute.tabsStatus.closable"
        :editable="config.CAttribute.tabsStatus.editable"
        :addable="config.CAttribute.tabsStatus.addable"
        @edit="handleTabsEdit">
        <extend-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
          :ref="Selection"
          :click="clickAction">
          {{item.content}}
        </extend-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <el-tabs
        v-model="editableTabsValue"
        :type="ControlConfig.CAttribute.typeModel"
        :closable="ControlConfig.CAttribute.tabsStatus.closable"
        :editable="ControlConfig.CAttribute.tabsStatus.editable"
        :addable="ControlConfig.CAttribute.tabsStatus.addable"
        @edit="handleTabsEdit">
        <extend-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :ref="Selection"
          :click="clickAction"
          :name="item.name">
          {{item.content}}+`12345`
        </extend-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CTabs`,
    props: {
      ControlConfig: {
        type: Object
      },
      ControlID: {
        type: String,
        default: null
      }
    },
    created () {
      this.config = this.initConfig
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
    },
    mounted () {
      this.config = this.initConfig
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
      this.$emit('input', this.config)
    },
    updated () {},
    /* keep-alive 组件激活时调用。 */
    activated () {},
    /* keep-alive 组件停用时调用。 */
    deactivated () {},
    watch: {
      'config.CKey.default' (val, old) {
        // console.log(val)
      }
    },
    beforeDestroy () {},
    destroyed () {},
    methods: {
      ControlClick () {
        this.emitConfig()
      },
      // 获得焦点事件
      focusAction () {
        this.emitConfig()
      },
      // 失去焦点事件
      blurAction () {
        this.emitConfig()
      },
      // 值变更事件
      changeAction () {
        this.emitConfig()
      },
      emitConfig () {
        this.config = this.initConfig
        if (this.ControlConfig) {
          this.config = this.ControlConfig
        }
        if (this.ControlID && (!this.config.ControlID)) {
          this.config.ControlID = this.ControlID
        }
        this.$emit(`getValue`, this.config)
      },
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          })
          this.editableTabsValue = newTabName
        }
        if (action === 'remove') {
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          }
          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        }
      },
      handleSelectionChange (val) {
        this.Selection = val
        // console.log(123456)
        // console.log(this.Selection)
        // console.log(this.editableTabs)
      },
      clickAction (index) {
        console.warn(`ControlConfig`)
        // console.error(index)
      }
    },
    data () {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: '用户管理',
          name: '1',
          content: '123'
        }, {
          title: '配置管理',
          name: '2',
          content: '456'
        }],
        tabIndex: 2,
        Selection: '', // 选中项
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '标签页', // 标题
          CTitleEN: 'tabs Control', // 英文标题
          CName: 'CTabs', // 控件名称
          CLayout: { // 布局
            percentLayout: { // 百分比布局
              type: Number,
              default: 100,
              status: true
            },
            pixelLayout: { // 像素布局
              type: Number,
              default: 100,
              status: true
            },
            flexLayout: { // flex 布局
              type: Number,
              default: 1,
              status: false
            },
            columnLayout: { // 栅格布局
              type: Number,
              default: 12,
              status: false
            }
          },
          CAttribute: {
            type: [{
              value: '',
              name: '默认'
            }, {
              value: 'card',
              name: '选项卡'
            }, {
              value: 'border-card',
              name: '卡片化'
            }], // tabs 类型 card、border-card
            typeModel: '',
            description: '', // 描述
            tabsStatus: { // 状态
              closable: false, // 标签是否可关闭
              addable: false, // 标签是否可增加
              editable: false, // 标签是否同时可关闭和增加
              closeStatus: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ],
              addStatus: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ],
              editStatus: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            },
            TabPaneAttributes: {
              label: '', // this.item.title
              name: '', // this.item.name
              content: '' // this.item.content
            }
          },
          Icon: {
            status: false, // 是否启用icon
            chooseStatus: false, // 是否启用CIcon控件去选择图标
            position: [{ // 控件位置 (中文显示名称/英文属性名称)
              name: '左侧',
              value: 'left'
            }, {
              name: '右侧',
              value: 'right'
            }],
            positionModel: '', // 绑定的图标位置
            className: '', // 类名
            content: '', // 图标content
            title: '', // 图标标题
            library: '' // 图标库
          },
          CValidate: {
            status: false,
            chooseStatus: false,
            validateModel: ''
          },
          methodDB: [{
            name: '提交', // 中文名称（Example）
            methodName: 'save', // 英文名称 (Example)
            action: '/form/saveAction' // postAction(接口名称)
          }]
        },
        currentConfig: null,
        config: null,
        validate: ''
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

  .CDom
    color $font-danger
</style>
