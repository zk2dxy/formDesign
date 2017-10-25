<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-popover
        :placement="config.CAttribute.placement.placement"
        :title="config.CAttribute.title"
        :width="config.CAttribute.width"
        :trigger="config.CAttribute.triggerModel"
        :visible-arrow="config.CAttribute.visibleArrow.visibleArrow"
        :content="config.CAttribute.content"
        :transition="config.CAttribute.transition"
        :offset="config.CAttribute.offset">
      </el-popover>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-popover
            v-if="keepAlive"
            ref="popover2"
            :placement="ControlConfig.CAttribute.placement.placement"
            :title="ControlConfig.CAttribute.title"
            :width="ControlConfig.CAttribute.width"
            :trigger="ControlConfig.CAttribute.triggerModel"
            :visible-arrow="ControlConfig.CAttribute.visibleArrow.visibleArrow"
            :content="ControlConfig.CAttribute.content"
            :transition="ControlConfig.CAttribute.transition"
            :offset="ControlConfig.CAttribute.offset">
          </el-popover>
          <el-button v-if="keepAlive" v-popover:popover2>{{ this.ControlConfig.CAttribute.triggerModel
            }} 激活
          </el-button>
        </el-form-item>
      </el-form>
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
      },
      'config.CAttribute.triggerModel' (val) {
        if (this.ControlConfig) {
          this.keepAlive = false
          setTimeout(() => {
            this.keepAlive = true
          }, 20)
        }
      },
      'config.CAttribute.placement.placement' (val) {
        if (this.ControlConfig) {
          this.keepAlive = false
          setTimeout(() => {
            this.keepAlive = true
          }, 20)
        }
      },
      'config.CAttribute.visibleArrow.visibleArrow' (val) {
        if (this.ControlConfig) {
          this.keepAlive = false
          setTimeout(() => {
            this.keepAlive = true
          }, 20)
        }
      }
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    computed: {
      labelWidthCalc () {
        if (this.config.labelWidth) {
          return this.config.labelWidth + 'px'
        }
      }
    },
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
    data () {
      return {
        keepAlive: true,
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '弹出框', // 标题
          CTitleEN: 'Popover Control', // 英文标题
          CName: 'CPopover', // 控件名称
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
              name: '自适应',
              default: 1,
              value: 'flexLayout',
              status: true,
              max: 10
            },
            { // 百分比布局
              type: Number,
              name: '百分比',
              default: 100,
              value: 'percentLayout',
              status: false,
              max: 100
            },
            { // 像素布局
              type: Number,
              name: '像素',
              default: 100,
              value: 'pixelLayout',
              status: false,
              max: null
            },
            { // 栅格布局
              type: Number,
              name: '栅格',
              default: 12,
              value: 'columnLayout',
              status: false,
              max: 12
            }
          ],
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
            }], // Popover 触发方式 click/focus/hover/manual
            triggerModel: 'hover',
            title: '提示',
            width: '200', // 宽度
            description: '', // 描述
            content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
            offset: 0, // 出现位置的偏移量
            placement: {
              placement: 'top',
              placementAble: [
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
            },
            transition: 'fade-in-linear',
            visibleArrow: {
              visibleArrow: true,
              visibleArrowAble: [
                {
                  value: true,
                  name: '是'
                },
                {
                  value: false,
                  name: '否'
                }
              ]
            } // 是否显示 Tooltip 箭头
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
