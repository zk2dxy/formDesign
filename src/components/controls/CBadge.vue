<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-badge
        :value="config.CAttribute.badgeValue.defaultValue"
        :max="config.CAttribute.badgeValue.max"
        :is-dot="config.CAttribute.isDot.dotStatus"
        :hidden="config.CAttribute.badgeStatus.hidden">
        <el-button size="small">查看</el-button>
      </el-badge>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <el-badge
        :value="ControlConfig.CAttribute.badgeValue.defaultValue"
        :max="ControlConfig.CAttribute.badgeValue.max"
        :is-dot="ControlConfig.CAttribute.isDot.dotStatus"
        :hidden="ControlConfig.CAttribute.badgeStatus.hidden">
        <el-button size="small">查看</el-button>
      </el-badge>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CBadge`,
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
      'config.CAttribute.typeModel': {
        handler () {
          this.config.CAttribute.badgeValue.defaultValue = ''
        },
        deep: true
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
          CTitleCN: '标记', // 标题
          CTitleEN: 'badge Control', // 英文标题
          CName: 'CBadge', // 控件名称
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
              value: 'string',
              name: '字符串'
            }, {
              value: 'number',
              name: '数字值'
            }], // badge值类型 string、number、dot
            typeModel: 'number', // badge当前类型
            description: '', // 描述
            isDot: {
              dotStatus: false,
              dotAble: [
                {
                  value: false,
                  name: '数值'
                },
                {
                  value: true,
                  name: '小圆点'
                }
              ]
            },
            badgeValue: {
              defaultValue: '',
              max: 99
            },
            badgeStatus: { // 状态
              hidden: false, // 是否应用状态
              hiddenAble: [
                {
                  value: false,
                  name: '显示'
                },
                {
                  value: true,
                  name: '隐藏'
                }
              ]
            }
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
