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
                  v-model="ControlConfig.CAttribute.timeDefault"
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
                v-model="ControlConfig.CAttribute.defaultRangeFixedTime[0]"
                :picker-options="{
                  start: ControlConfig.CAttribute.timeStart,
                  step: ControlConfig.CAttribute.timeStep,
                  end: ControlConfig.CAttribute.timeEnd
                }"
                :editable="false"
                :clearable="ControlConfig.CAttribute.isShowClearable"
                :size="ControlConfig.CAttribute.sizeModel"
                placeholder="开始时间"></el-time-select>
            </span>
                <span @click="endFixTime">
              <el-time-select
                v-model="ControlConfig.CAttribute.defaultRangeFixedTime[1]"
                :picker-options="{
                  start: ControlConfig.CAttribute.timeStartend,
                  step: ControlConfig.CAttribute.timeStepend,
                  end: ControlConfig.CAttribute.timeEndend
                }"
                :editable="false"
                :clearable="ControlConfig.CAttribute.isShowClearableend"
                :size="ControlConfig.CAttribute.sizeModelend"
                placeholder="结束时间"></el-time-select>
            </span>
              </div>
            </div>
            <div v-else>
              <el-time-picker
                v-model="ControlConfig.CAttribute.timeDefault"
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
          <div v-if="ControlConfig.CAttribute.typeModel === 'date' && isAlive">
            <div v-if="ControlConfig.CAttribute.isHasShortcut &&
              (ControlConfig.CAttribute.dateTypeModel === 'date' ||
              ControlConfig.CAttribute.dateTypeModel === 'daterange' ||
              ControlConfig.CAttribute.dateTypeModel === 'datetimerange')">
              <el-date-picker
                v-model="ControlConfig.CAttribute.timeDefault"
                :size="ControlConfig.CAttribute.sizeModel"
                :type="ControlConfig.CAttribute.dateTypeModel"
                :picker-options="ControlConfig.CAttribute.datePickerShortcuts"
                :range-separator="ControlConfig.CAttribute.rangeSeparator"
                :format="ControlConfig.CAttribute.formatDate"
                :placeholder="ControlConfig.CAttribute.placeholder"></el-date-picker>
            </div>
            <div v-else>
              <el-date-picker
                v-model="ControlConfig.CAttribute.timeDefault"
                :size="ControlConfig.CAttribute.sizeModel"
                :type="ControlConfig.CAttribute.dateTypeModel"
                :range-separator="ControlConfig.CAttribute.rangeSeparator"
                :format="ControlConfig.CAttribute.formatDate"
                :placeholder="ControlConfig.CAttribute.placeholder"></el-date-picker>
            </div>
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
    watch: {
      'config.CAttribute.isHasShortcut' () {
//        console.log('rr33')
        this.isAlive = false
        setTimeout(() => {
          this.isAlive = true
        }, 20)
      },
      'config.CAttribute.dateTypeModel' () {
//        console.log('rr')
        if (this.config.CAttribute.dateTypeModel === 'date') {
          this.config.CAttribute.datePickerShortcuts = {
            shortcuts: [{
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
          }
        } else if (this.config.CAttribute.dateTypeModel === 'daterange' ||
          this.config.CAttribute.dateTypeModel === 'datetimerange') {
          this.config.CAttribute.datePickerShortcuts = {
            shortcuts: [{
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          }
        }
      }
    },
    data () {
      return {
        isAlive: true,
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '日期时间选择器', // 标题
          CTitleEN: 'dateTimePicker Control', // 英文标题
          CName: 'CDateTimePicker', // 控件名称
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
            type: [{
              value: 'time',
              name: '时间选择器'
            }, {
              value: 'date',
              name: '日期选择器'
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
              name: '微型'
            }], // 输入尺寸
            sizeModel: 'small',
            sizeModelend: 'small',
            description: '', // 描述
            timeDefault: '', // 默认值
            timeFixed: false, // 是否是固定时间点
            timeStart: '', // 起始时间
            timeStep: '', // 时间间隔
            timeEnd: '', // 结束时间
            rangeOfFixedEnd: false,
            timeStartend: '', // 起始时间
            timeStepend: '', // 时间间隔
            timeEndend: '', // 结束时间
            defaultRangeFixedTime: [], // 固定时间范围选择默认值
            timeEditable: true, // 文本框可输入
            timeSelectableRange: '00:00:00 - 23:59:59', // 任意时间选择范围
            isRangeSelect: false, // 是否是范围选择
            isHasShortcut: false, // 是否带快捷选项
            formatDate: '', // 格式化
            dateType: [{
              value: 'date',
              name: '日期'
            }, {
              value: 'year',
              name: '年'
            }, {
              value: 'month',
              name: '月'
            }, {
              value: 'week',
              name: '周'
            }, {
              value: 'daterange',
              name: '日期范围'
            }, {
              value: 'datetime',
              name: '日期时间'
            }, {
              value: 'datetimerange',
              name: '日期时间范围'
            }], // 日期选择器类型
            dateTypeModel: 'date', // 日期选择器类型
            rangeSeparator: '-', // 选择范围时的分隔符
            datePickerShortcuts: {shortcuts: [{
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]},
            isShowClearable: true, // 是否显示清除按钮
            isShowClearableend: true, // 是否显示清除按钮
            placeholder: '请输入默认值或者为空' // 控件提示值
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
