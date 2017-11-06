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
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-badge
            :value="ControlConfig.CAttribute.badgeValue.defaultValue"
            :max="ControlConfig.CAttribute.badgeValue.max"
            :is-dot="ControlConfig.CAttribute.isDot.dotStatus"
            :hidden="ControlConfig.CAttribute.badgeStatus.hidden">
            <el-button size="small">查看</el-button>
          </el-badge>
        </el-form-item>
      </el-form>
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
      let item = JSON.parse(localStorage.getItem('badge'))
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
      let item = JSON.parse(localStorage.getItem('badge'))
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
      'ControlConfig.CAttribute.typeModel' () {
        this.config.CAttribute.badgeValue.defaultValue = ''
      }
    },
    beforeDestroy () {
    },
    destroyed () {
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
    computed: {
      labelWidthCalc () {
        if (this.config.labelWidth) {
          return this.config.labelWidth + 'px'
        }
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
          /* layout setting start */
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
          labelWidth: 80,
          layoutModel: 'percentLayout',
          currentLayout: null,
          /* layout setting start */
          CLayout: [ // 布局
            { // flex 布局
              type: Number,
              name: '自适应',
              default: 1,
              value: 'flexLayout',
              status: false,
              max: 10
            },
            { // 百分比布局
              type: Number,
              name: '百分比',
              default: 100,
              value: 'percentLayout',
              status: true,
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
