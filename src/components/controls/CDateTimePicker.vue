<template>
  <div class="CDateTimePicker" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <div v-if="ControlConfig.CAttribute.typeModel === 'time'">
            <div v-if="ControlConfig.CAttribute.timeFixed">
              <div v-if="!ControlConfig.CAttribute.isRangeSelect">
                <el-time-select
                  v-model="ControlConfig.CKey.default"
                  :picker-options="{
                start: ControlConfig.CAttribute.timeStart,
                step: ControlConfig.CAttribute.timeStep,
                end: ControlConfig.CAttribute.timeEnd
              }"
                  :editable="false"
                  :clearable="ControlConfig.CAttribute.isShowClearable"
                  :size="ControlConfig.CAttribute.sizeModel"
                  :placeholder="ControlConfig.CAttribute.placeholder"></el-time-select>
              </div>
              <div v-else>
            <span @click="startFixTime">
              <el-time-select
                v-model="defaultRangeFixedTime[0]"
                :picker-options="{
                  start: ControlConfig.CAttribute.timeStart,
                  step: ControlConfig.CAttribute.timeStep,
                  end: ControlConfig.CAttribute.timeEnd
                }"
                :editable="false"
                :clearable="ControlConfig.CAttribute.isShowClearable"
                :size="ControlConfig.CAttribute.sizeModel"
                placeholder="开始时间"
                @change="saveDefault"></el-time-select>
            </span>
                <span @click="endFixTime">
              <el-time-select
                v-model="defaultRangeFixedTime[1]"
                :picker-options="{
                  start: ControlConfig.CAttribute.timeStartend,
                  step: ControlConfig.CAttribute.timeStepend,
                  end: ControlConfig.CAttribute.timeEndend
                }"
                :editable="false"
                :clearable="ControlConfig.CAttribute.isShowClearableend"
                :size="ControlConfig.CAttribute.sizeModelend"
                placeholder="结束时间"
                @change="saveDefault"></el-time-select>
            </span>
              </div>
            </div>
            <div v-else>
              <el-time-picker
                @change="timePicker"
                v-model="timeDate"
                :is-range="ControlConfig.CAttribute.isRangeSelect"
                :picker-options="{
                selectableRange: ControlConfig.CAttribute.timeSelectableRange
               }"
                :editable="ControlConfig.CAttribute.timeEditable"
                :clearable="ControlConfig.CAttribute.isShowClearable"
                :size="ControlConfig.CAttribute.sizeModel"
                :placeholder="ControlConfig.CAttribute.placeholder"></el-time-picker>
            </div>
          </div>
          <div v-if="ControlConfig.CAttribute.typeModel === 'date'">
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CDateTimePicker`,
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
      timePicker (value) {
        this.config.CKey.default = value
      },
      saveDefault () {
        this.config.CKey.default = this.defaultRangeFixedTime[0] + this.defaultRangeFixedTime[1]
      },
      startFixTime () {
        this.config.CAttribute.rangeOfFixedEnd = false
      },
      endFixTime () {
        this.config.CAttribute.rangeOfFixedEnd = true
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
        defaultRangeFixedTime: [], // 固定时间范围选择默认值
        timeDate: new Date(),
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '日期时间选择器', // 标题
          CTitleEN: 'dateTimePicker Control', // 英文标题
          CName: 'CDateTimePicker', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '文字左对齐'},
            {value: 'right', name: '文字右对齐'},
            {value: 'top', name: '文字居上对齐'}
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
            type: [{
              value: 'time',
              name: '时间选择器'
            }, {
              value: 'date',
              name: '日期选择器'
            }, {
              value: 'dateTime',
              name: '日期时间选择器'
            }],
            typeModel: 'time',
            size: [{
              value: 'large',
              name: '大'
            }, {
              value: 'small',
              name: '小'
            }, {
              value: 'mini',
              name: 'mini'
            }], // 输入尺寸
            sizeModel: 'small',
            sizeModelend: 'small',
            description: '', // 描述
            timeFixed: false, // 是否是固定时间点
            timeStart: '', // 起始时间
            timeStep: '', // 时间间隔
            timeEnd: '', // 结束时间
            rangeOfFixedEnd: false,
            timeStartend: '', // 起始时间
            timeStepend: '', // 时间间隔
            timeEndend: '', // 结束时间
            timeEditable: true, // 文本框可输入
            timeSelectableRange: '00:00:00 - 23:59:59', // 任意时间选择范围
            isRangeSelect: false, // 是否是范围选择
//            dateFormate: 'HH:mm:ss',
            isShowClearable: true, // 是否显示清除按钮
            isShowClearableend: true, // 是否显示清除按钮
            placeholder: '请输入默认值或者为空', // 控件提示值
            height: '' // 高度
          },
          CKey: { // 控件值
            default: '', // 默认值
            type: '', // 控件值类型
            keyMethods: '' // 计算控件值方法
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
  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

</style>
