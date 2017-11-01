<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-tabs
        v-model="config.CAttribute.editableTabsValue"
        :type="config.CAttribute.typeModel"
        :closable="config.CAttribute.tabsStatus.closable"
        :editable="config.CAttribute.tabsStatus.editable"
        :addable="config.CAttribute.tabsStatus.addable"
        @edit="handleTabsEdit">
        <extend-tab-pane
          :key="item.name"
          v-for="(item, index) in config.CAttribute.editableTabs"
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
        v-model="ControlConfig.CAttribute.editableTabsValue"
        :type="ControlConfig.CAttribute.typeModel"
        :closable="ControlConfig.CAttribute.tabsStatus.closable"
        :editable="ControlConfig.CAttribute.tabsStatus.editable"
        :addable="ControlConfig.CAttribute.tabsStatus.addable"
        @edit="handleTabsEdit">
        <extend-tab-pane
          :key="item.name"
          v-for="(item, index) in ControlConfig.CAttribute.editableTabs"
          :label="item.title"
          :ref="Selection"
          :click="clickAction"
          :name="item.name">
          {{item.content}}
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
      },
      formOBJ: {
        type: Object
      },
      formItem: {
        type: Object
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
      if (this.config.CAttribute.editableTabs.length > 0) {
        this.config.CAttribute.editableTabsValue = this.config.CAttribute.editableTabs[0].name
      }
      this.getChildrenLayoutValue()
      this.$emit('input', this.config)
    },
    updated () {
    },
    /* keep-alive 组件激活时调用。 */
    activated () {
    },
    /* keep-alive 组件停用时调用。 */
    deactivated () {
    },
    watch: {
      'config.CKey.default' (val, old) {
        // console.log(val)
      }
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      ControlClick () {
        this.formOBJ.mutations.selectObj(this.formOBJ, this.formItem)
        this.$emit('changeTAB', this.formItem)
      },
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          this.config.CAttribute.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          })
          this.config.CAttribute.editableTabsValue = newTabName
        }
        if (action === 'remove') {
          let tabs = this.config.CAttribute.editableTabs
          let activeName = this.config.CAttribute.editableTabsValue
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
          this.config.CAttribute.editableTabsValue = activeName
          this.config.CAttribute.editableTabs = tabs.filter(tab => tab.name !== targetName)
        }
      },
      handleSelectionChange (val) {
        this.Selection = val
        // console.log(123456)
        // console.log(this.Selection)
        // console.log(this.config.CAttribute.editableTabs)
      },
      clickAction (index) {
        console.warn(`ControlConfig`)
        // console.error(index)
      },
      getChildrenLayoutValue () {
        this.config.currentLayout = null
        if (this.config.CLayout === '') {
          return
        }
        for (let key in this.config.CLayout) {
          if (this.config.CLayout[key].status === false) {
            continue
          } else {
            this.config.currentLayout = this.config.CLayout[key]
            break
          }
        }
      }
    },
    computed: {
      labelWidthCalc () {
        if (this.config.labelWidth) {
          return this.config.labelWidth + 'px'
        }
      }
    },
    data () {
      return {
        tabIndex: 0,
        Selection: '', // 选中项
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '标签页', // 标题
          CTitleEN: 'tabs Control', // 英文标题
          CName: 'CTabs', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
          labelWidth: 80,
          layoutModel: 'flexLayout',
          currentLayout: null,
          CLayout: [ // 布局
            { // flex 布局
              type: Number,
              name: '自适应布局',
              default: 1,
              value: 'flexLayout',
              status: true,
              max: 10
            },
            { // 百分比布局
              type: Number,
              name: '百分比布局',
              default: 100,
              value: 'percentLayout',
              status: false,
              max: 100
            },
            { // 像素布局
              type: Number,
              name: '像素布局',
              default: 100,
              value: 'pixelLayout',
              status: false,
              max: null
            },
            { // 栅格布局
              type: Number,
              name: '栅格布局',
              default: 12,
              value: 'columnLayout',
              status: false,
              max: 12
            }
          ],
          CAttribute: {
            editableTabsValue: '',
            editableTabs: [{
              title: '用户管理',
              name: '1',
              content: '123'
            }, {
              title: '配置管理',
              name: '2',
              content: '456'
            }],
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
