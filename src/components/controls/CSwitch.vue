<template>
  <div class="CSwitch" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-tooltip
        v-if="(config.CAttribute.onSwitchValue || config.CAttribute.offSwitchValue) && config.CAttribute.showSwitchTooltip"
        :content="config.CAttribute.defaultSwitchStatus"
        :placement="config.CAttribute.tooltipPosition">
        <extend-switch
          v-model="config.CAttribute.defaultSwitchStatus"
          :on-color="config.CAttribute.onFillColor"
          :off-color="config.CAttribute.offFillColor"
          :on-value="config.CAttribute.onSwitchValue"
          :off-value="config.CAttribute.offSwitchValue"
          :on-icon-class="config.CAttribute.onSwitchIcon"
          :off-icon-class="config.CAttribute.offSwitchIcon"
          :width="config.CAttribute.width"
          :on-text="config.CAttribute.onText"
          :off-text="config.CAttribute.offText"
          @change="handleChange"></extend-switch>
      </el-tooltip>
      <extend-switch
        v-else-if="config.CAttribute.onSwitchValue || config.CAttribute.offSwitchValue"
        v-model="config.CAttribute.defaultSwitchStatus"
        :on-color="config.CAttribute.onFillColor"
        :off-color="config.CAttribute.offFillColor"
        :on-value="config.CAttribute.onSwitchValue"
        :off-value="config.CAttribute.offSwitchValue"
        :on-icon-class="config.CAttribute.onSwitchIcon"
        :off-icon-class="config.CAttribute.offSwitchIcon"
        :width="config.CAttribute.width"
        :on-text="config.CAttribute.onText"
        :off-text="config.CAttribute.offText"
        @change="handleChange"></extend-switch>
      <extend-switch
        v-else
        v-model="config.CAttribute.defaultSwitchStatus"
        :on-color="config.CAttribute.onFillColor"
        :off-color="config.CAttribute.offFillColor"
        :on-icon-class="config.CAttribute.onSwitchIcon"
        :off-icon-class="config.CAttribute.offSwitchIcon"
        :width="config.CAttribute.width"
        :on-text="config.CAttribute.onText"
        :off-text="config.CAttribute.offText"
        @change="handleChange">
      </extend-switch>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-tooltip
            v-if="(ControlConfig.CAttribute.onSwitchValue || ControlConfig.CAttribute.offSwitchValue) && ControlConfig.CAttribute.showSwitchTooltip"
            :content="ControlConfig.CAttribute.defaultSwitchStatus"
            :placement="ControlConfig.CAttribute.tooltipPosition">
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
          <extend-switch
            v-else-if="ControlConfig.CAttribute.onSwitchValue || ControlConfig.CAttribute.offSwitchValue"
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
          <extend-switch
            v-else
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
        </el-form-item>
      </el-form>
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
      this.getChildrenLayoutValue()
      this.$emit('input', this.config)
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
        this.formOBJ.mutations.selectObj(this.formOBJ, this.formItem)
        this.$emit('changeTAB', this.formItem)
      },
      handleChange () {
        this.config.CAttribute.switchStatus = !this.config.CAttribute.switchStatus
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
        aa: 'test',
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '开关', // 标题
          CTitleEN: 'switch Control', // 英文标题
          CName: 'CSwitch', // 控件名称
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
