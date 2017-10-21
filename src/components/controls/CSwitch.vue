<template>
  <div class="CSwitch" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <div v-if="ControlConfig.CAttribute.onSwitchValue || ControlConfig.CAttribute.offSwitchValue">
        <div v-if="ControlConfig.CAttribute.showSwitchTooltip">
          <el-tooltip :content="ControlConfig.CAttribute.defaultSwitchStatus" :placement="ControlConfig.CAttribute.tooltipPosition">
            <extend-switch
              v-model="ControlConfig.CAttribute.defaultSwitchStatus"
              :on-color="ControlConfig.CAttribute.onFillColor"
              :off-color="ControlConfig.CAttribute.offFillColor"
              :on-value="ControlConfig.CAttribute.onSwitchValue"
              :off-value="ControlConfig.CAttribute.offSwitchValue"
              :on-icon-class="ControlConfig.CAttribute.onSwitchIcon"
              :off-icon-class="ControlConfig.CAttribute.offSwitchIcon"
              :width="ControlConfig.CAttribute.width"
              :on-text="ControlConfig.CAttribute.onText"
              :off-text="ControlConfig.CAttribute.offText"
              @change="handleChange"></extend-switch>
          </el-tooltip>
        </div>
        <div v-else>
          <extend-switch
            v-model="ControlConfig.CAttribute.defaultSwitchStatus"
            :on-color="ControlConfig.CAttribute.onFillColor"
            :off-color="ControlConfig.CAttribute.offFillColor"
            :on-value="ControlConfig.CAttribute.onSwitchValue"
            :off-value="ControlConfig.CAttribute.offSwitchValue"
            :on-icon-class="ControlConfig.CAttribute.onSwitchIcon"
            :off-icon-class="ControlConfig.CAttribute.offSwitchIcon"
            :width="ControlConfig.CAttribute.width"
            :on-text="ControlConfig.CAttribute.onText"
            :off-text="ControlConfig.CAttribute.offText"
            @change="handleChange"></extend-switch>
        </div>
      </div>
      <div v-else>
        <extend-switch
          v-model="ControlConfig.CAttribute.defaultSwitchStatus"
          :on-color="ControlConfig.CAttribute.onFillColor"
          :off-color="ControlConfig.CAttribute.offFillColor"
          :on-icon-class="ControlConfig.CAttribute.onSwitchIcon"
          :off-icon-class="ControlConfig.CAttribute.offSwitchIcon"
          :width="ControlConfig.CAttribute.width"
          :on-text="ControlConfig.CAttribute.onText"
          :off-text="ControlConfig.CAttribute.offText"
          @change="handleChange">
        </extend-switch>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CSwitch`,
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
    methods: {
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
      ControlClick () {
        this.emitConfig()
      },
      handleChange () {
        this.config.CAttribute.switchStatus = !this.config.CAttribute.switchStatus
      }
    },
    data () {
      return {
        aa: 'test',
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '开关', // 标题
          CTitleEN: 'switch Control', // 英文标题
          CName: 'CSwitch', // 控件名称
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
            description: '', // 描述
            defaultSwitchStatus: '', // switch
            switchStatus: false, // switch状态
            onText: '', // switch激活时的文本
            onFillColor: '', // switch激活时的填充色（默认继承主题样式：设置default）
            offText: '', // switch关闭时的文本
            offFillColor: '', // switch关闭时的填充色
            offSwitchValue: '', // 关闭时的值
            onSwitchValue: '', // 打开时的值
            showSwitchTooltip: false, // 是否加value提示
            tooltipPosition: 'top', // value提示的位置
            onSwitchIcon: '', // 打开时图标
            offSwitchIcon: '', // 关闭时图标
            width: 58
//            tooltipPositionType: [{
//              value: 'top-start',
//              name: '上左'
//            }, {
//              value: 'top',
//              name: '上边'
//            }, {
//              value: 'top-end',
//              name: '上右'
//            }, {
//              value: 'left-start',
//              name: '左上'
//            }, {
//              value: 'left',
//              name: '左边'
//            }, {
//              value: 'left-end',
//              name: '左下'
//            }, {
//              value: 'right-start',
//              name: '右上'
//            }, {
//              value: 'right',
//              name: '右边'
//            }, {
//              value: 'right-end',
//              name: '右下'
//            }, {
//              value: 'bottom-start',
//              name: '下左'
//            }, {
//              value: 'bottom',
//              name: '下边'
//            }, {
//              value: 'bottom-end',
//              name: '下右'
//            }]
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
              },
              {
                value: '',
                name: '禁用'
              }
            ], // 控件规则集合
            ruleList: [] // 选择集合
          },
          Icon: {
            status: false, // 是否启用icon
            chooseStatus: false, // 是否启用CIcon控件去选择图标
            position: '',
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
  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

</style>
