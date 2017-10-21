<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-popover
        ref="popover1"
        :placement="config.CAttribute.placement.placement"
        :title="config.CAttribute.title"
        :width="config.CAttribute.width"
        :trigger="config.CAttribute.triggerModel"
        :content="config.CAttribute.content">
      </el-popover>
      <el-button v-popover:popover1>激活</el-button>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <el-popover
        ref="popover1"
        :placement="ControlConfig.CAttribute.placement.placement"
        :title="ControlConfig.CAttribute.title"
        :width="ControlConfig.CAttribute.width"
        :trigger="ControlConfig.CAttribute.triggerModel"
        :content="ControlConfig.CAttribute.content">
      </el-popover>
      <el-button v-popover:popover1>激活</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CPopover`,
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
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '输入框', // 标题
          CTitleEN: 'Popover Control', // 英文标题
          CName: 'CPopover', // 控件名称
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
            trigger: [{
              value: 'click',
              name: '点击'
            }, {
              value: 'focus',
              name: '聚焦'
            }, {
              value: 'hover',
              name: '悬浮'
            }, {
              value: 'manual',
              name: 'manual'
            }], // Popover 触发方式 click/focus/hover/manual
            triggerModel: 'click',
            title: '提示',
            width: '200', // 宽度
            description: '', // 描述
            content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
            placement: {
              placement: 'top',
              placementable: [
                {
                  value: 'top',
                  name: '上'
                }, {
                  value: 'top-start',
                  name: '上左'
                }, {
                  value: 'top-end',
                  name: '上右'
                }, {
                  value: 'bottom',
                  name: '下'
                }, {
                  value: 'bottom-start',
                  name: '下左'
                }, {
                  value: 'bottom-end',
                  name: '下右'
                }, {
                  value: 'left',
                  name: '左'
                }, {
                  value: 'left-start',
                  name: '左上'
                }, {
                  value: 'left-end',
                  name: '左下'
                }, {
                  value: 'right',
                  name: '右'
                }, {
                  value: 'right-start',
                  name: '右上'
                }, {
                  value: 'right-end',
                  name: '右下'
                }
              ]
            }
          },
          Status: { // 状态
            status: false, // 是否应用状态
            rules: [
              {
                value: 'readonly',
                name: '只读'
              },
              {
                value: '',
                name: '隐藏'
              }
            ], // 控件规则集合
            ruleList: [] // 选择集合
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
