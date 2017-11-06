<template>
  <div class="CSlider" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-slider
        v-model="config.CAttribute.defaultSliderValue"
        :vertical="config.CAttribute.typeModel === 'vertical'"
        :height="config.CAttribute.height + 'px'"
        :min="config.CAttribute.ableSelectedMin"
        :max="config.CAttribute.ableSelectedMax"
        :step="config.CAttribute.sliderStep === '' ? 1 : config.CAttribute.sliderStep"
        :show-input="config.CAttribute.sliderShowInput"
        :show-input-controls="config.CAttribute.sliderShowInputButton"
        :range="config.CAttribute.sliderRange"
        :show-stops="config.CAttribute.sliderShowStops"
        :show-tooltip="config.CAttribute.sliderShowTooltip">
      </el-slider>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-slider
            v-model="ControlConfig.CAttribute.defaultSliderValue"
            :vertical="ControlConfig.CAttribute.typeModel === 'vertical'"
            :height="ControlConfig.CAttribute.height + 'px'"
            :min="ControlConfig.CAttribute.ableSelectedMin"
            :max="ControlConfig.CAttribute.ableSelectedMax"
            :step="ControlConfig.CAttribute.sliderStep === '' ? 1 : ControlConfig.CAttribute.sliderStep"
            :show-input="ControlConfig.CAttribute.sliderShowInput"
            :show-input-controls="ControlConfig.CAttribute.sliderShowInputButton"
            :range="ControlConfig.CAttribute.sliderRange"
            :show-stops="ControlConfig.CAttribute.sliderShowStops"
            :show-tooltip="ControlConfig.CAttribute.sliderShowTooltip">
          </el-slider>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CSlider`,
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
      let item = JSON.parse(localStorage.getItem('slider'))
      if (item) {
        this.config = item.config
      }
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
    },
    mounted () {
      this.config = this.initConfig
      let item = JSON.parse(localStorage.getItem('slider'))
      if (item) {
        this.config = item.config
      }
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
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '滑块', // 标题
          CTitleEN: 'slider Control', // 英文标题
          CName: 'CSlider', // 控件名称
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
            }
          ],
          CAttribute: {
            type: [{
              value: 'horizontal',
              name: '横向'
            }, {
              value: 'vertical',
              name: '竖向'
            }],
            typeModel: 'horizontal',
            description: '', // 描述
            defaultSliderValue: 0, // 默认值
            ableSelectedMin: 0, // 可选最小值
            ableSelectedMax: 10, // 可选最大值
            sliderStep: 1, // slider步长
            sliderRange: false, // 是否为范围选择
            sliderShowInput: false, // 是否显示输入框
            sliderShowInputButton: true, // 显示输入框的情况下是否显示输入框的按钮
            sliderShowStops: false, // 是否显示间断点
            sliderShowTooltip: true, // 是否显示tooltips
            height: '300' // 高度
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
