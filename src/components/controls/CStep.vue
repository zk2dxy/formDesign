<template>
  <div class="CStep" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--step-->
      <extend-steps
        :space="config.CAttribute.stepSpace"
        :direction="config.CAttribute.stepDirection"
        :active="config.CAttribute.stepActive"
        :show-single-status="config.CAttribute.showSingleStatus"
        :process-status="config.CAttribute.stepStatusProcess"
        :finish-status="config.CAttribute.stepStatusSuccess"
        :align-center="config.CAttribute.stepAlignCenter"
        :center="config.CAttribute.StepCenter">
        <extend-step
          v-for="(item,index) in config.CAttribute.stepList"
          :key="item.title"
          @handleClickStep="handleClickStep"
          :description="item.description"
          :icon="item.icon"
          :title="item.title"></extend-step>
      </extend-steps>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <!--step-->
      <extend-steps
        :space="ControlConfig.CAttribute.stepSpace"
        :direction="ControlConfig.CAttribute.stepDirection"
        :active="ControlConfig.CAttribute.stepActive"
        :show-single-status="ControlConfig.CAttribute.showSingleStatus"
        :process-status="ControlConfig.CAttribute.stepStatusProcess"
        :finish-status="ControlConfig.CAttribute.stepStatusSuccess"
        :align-center="ControlConfig.CAttribute.stepAlignCenter"
        :center="ControlConfig.CAttribute.StepCenter">
        <extend-step
          v-for="(item,index) in ControlConfig.CAttribute.stepList"
          :key="item.title"
          @handleClickStep="handleClickStep"
          :description="item.description"
          :icon="item.icon"
          :title="item.title"></extend-step>
      </extend-steps>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CStep`,
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
    watch: {},
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
//      steps点击事件
      handleClickStep (index) {
        this.config.CAttribute.stepCurrentValue = index
        this.config.CAttribute.stepIcon = false
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
          CBelong: 'others',
          CTitleCN: 'step步骤条', // 标题
          CTitleEN: 'step Control', // 英文标题
          CName: 'CStep', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '文字左对齐'},
            {value: 'right', name: '文字右对齐'},
            {value: 'top', name: '文字居上对齐'}
          ],
          labelWidth: 100,
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
            stepList: [{
              title: '步骤一',
              description: '',
              icon: ''
            }, {
              title: '步骤二',
              description: '',
              icon: ''
            }, {
              title: '步骤三',
              description: '',
              icon: ''
            }, {
              title: '步骤四',
              description: '',
              icon: ''
            }],
            stepCurrentValue: '', // 点击的当前值
            stepActive: 2,  // 设置当前激活步骤
            showSingleStatus: false,  // 是否只显示当前状态
            stepSpace: 100, // 设置每个step的间距，不填写表示自适应
            stepAlignCenter: false,  // 标题描述是否居中对齐
            StepCenter: false,  // 组件是否居中显示
            stepDirection: 'horizontal',  // 显示方向
            stepIcon: false, // 是否使用图标
            stepIconStatus: false, // 是否启用选择图标
            stepDirectionOption: [{
              name: '水平方向',
              value: 'horizontal'
            }, {
              name: '垂直方向',
              value: 'vertical'
            }],
            stepStatusProcess: 'process',  // 设置当前默认步骤状态
            stepProcessOption: [{
              value: 'wait',
              name: '等待'
            }, {
              value: 'process',
              name: '当前'
            }, {
              value: 'finish',
              name: '完成'
            }, {
              value: 'error',
              name: '错误'
            }, {
              value: 'success',
              name: '成功'
            }], // 设置当前步骤状态
            stepStatusSuccess: 'finish',  // 设置结束默认步骤状态
            stepSuccessOption: [{
              value: 'wait',
              name: '等待'
            }, {
              value: 'process',
              name: '当前'
            }, {
              value: 'finish',
              name: '完成'
            }, {
              value: 'error',
              name: '错误'
            }, {
              value: 'success',
              name: '成功'
            }], // 设置结束步骤状态
            description: '', // 描述
            height: '', // 高度
            vertical: ['top', 'middle', 'bottom'] // 对齐方式
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
  @import "~assets/css/stylus/mixin"
  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

  .CDom
    color $font-danger
</style>
