<template>
  <div class="CProgress" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-progress
        :type="config.CAttribute.typeModel"
        :percentage="config.CAttribute.value"
        :status="config.CAttribute.progressStatus.progressStatusCurrent"
        :show-text="config.CAttribute.showText.showTextStatus"
        :text-inside="config.CAttribute.showText.textInsideStatus"
        :stroke-width="config.CAttribute.showText.strokeWidth"
        :width="config.CAttribute.showText.width"
      ></el-progress>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel">
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-progress
            :type="ControlConfig.CAttribute.typeModel"
            :percentage="ControlConfig.CAttribute.value"
            :status="ControlConfig.CAttribute.progressStatus.progressStatusCurrent"
            :show-text="ControlConfig.CAttribute.showText.showTextStatus"
            :text-inside="ControlConfig.CAttribute.showText.textInsideStatus"
            :stroke-width="ControlConfig.CAttribute.showText.strokeWidth"
            :width="ControlConfig.CAttribute.showText.width"
          ></el-progress>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CProgress`,
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
      let item = JSON.parse(localStorage.getItem('progress'))
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
      let item = JSON.parse(localStorage.getItem('progress'))
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
    updated () {
    },
    /* keep-alive 组件激活时调用。 */
    activated () {
    },
    /* keep-alive 组件停用时调用。 */
    deactivated () {
    },
    watch: {
      'config.CAttribute.value': {
        handler () {
          if (this.config.CAttribute.value === '') {
            this.config.CAttribute.value = 0
          }
          var reg = new RegExp('^(\\d|[1-9]\\d|100)$')
          if (!reg.test(this.config.CAttribute.value)) {
            this.config.CAttribute.value = 0
            alert('请输入0-100的整数！')
          }
        },
        deep: true
      },
      'config.CAttribute.showText.width': {
        handler () {
          if (this.config.CAttribute.showText.width === '') {
            this.config.CAttribute.showText.width = 10
            setTimeout(() => {
              this.config.CAttribute.showText.width = 60
            }, 20)
            this.emitConfig()
          }
          if (this.config.CAttribute.showText.width < this.config.CAttribute.showText.strokeWidth) {
            this.config.CAttribute.showText.width = 60
            console.log('')
          }
        },
        deep: true
      },
      'config.CAttribute.showText.strokeWidth': {
        handler () {
          if (this.config.CAttribute.showText.strokeWidth === '') {
            this.config.CAttribute.showText.strokeWidth = 0
            setTimeout(() => {
              this.config.CAttribute.showText.strokeWidth = 1
            }, 20)
            this.emitConfig()
          }
        },
        deep: true
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
          CTitleCN: '进度条', // 标题
          CTitleEN: 'progress Control', // 英文标题
          CName: 'CProgress', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
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
              value: 'line',
              name: '线性'
            }, {
              value: 'circle',
              name: '环形'
            }], // 进度条类型 line、circle
            typeModel: 'line', // 进度条当前类型
            description: '', // 描述
            showText: { // 是否显示进度条文字内容,默认true
              showTextStatus: true,
              textInsideStatus: false,
              textInside: [
                {
                  value: false,
                  name: '进度条外'
                },
                {
                  value: true,
                  name: '进度条内'
                }
              ],  // 进度条显示文字是否内置在进度条内（只在 type=line 时可用）,默认false
              width: 60,  // 环形进度条画布宽度（只在 type=circle 时可用）
              strokeWidth: 6 // 线形宽度，单位 px
            },
            progressStatus: {
              progressStatusCurrent: 'success', // 进度条当前状态
              status: [
                {
                  value: 'success',
                  name: '成功'
                },
                {
                  value: 'exception',
                  name: '异常'
                },
                {
                  value: '',
                  name: '默认'
                }
              ] // 进度条可选状态
            },
            value: 60
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
  .el-progress
    padding-top 2%

  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

  .CDom
    color $font-danger
</style>
