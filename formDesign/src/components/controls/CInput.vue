<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)">
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <extend-input
        @focus="focusAction()"
        @blur="blurAction()"
        :type="config.CAttribute.typeModel"
        :placeholder="config.CAttribute.placeholder"
        v-model="config.CKey.default"
        :icon="config.Icon.className"
        :position="config.Icon.positionModel"
      >
        <template v-if="config.CAttribute.prepend!=''" slot="prepend"><span v-html="config.CAttribute.prepend"></span>
        </template>
        <template v-if="config.CAttribute.append!=''" slot="append"><span v-html="config.CAttribute.append"></span>
        </template>
      </extend-input>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <extend-input
        @focus="focusAction()"
        @blur="blurAction()"
        :type="ControlConfig.CAttribute.typeModel"
        :placeholder="ControlConfig.CAttribute.placeholder"
        v-model="ControlConfig.CKey.default"
        :icon="ControlConfig.Icon.className"
        :position="ControlConfig.Icon.positionModel"
      >
        <template v-if="ControlConfig.CAttribute.prepend!=''" slot="prepend"><span
          v-html="ControlConfig.CAttribute.prepend"></span></template>
        <template v-if="ControlConfig.CAttribute.append!=''" slot="append"><span
          v-html="ControlConfig.CAttribute.append"></span></template>
      </extend-input>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CInput`,
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
    },
    mounted () {
      // this.config.CValidate = this.VALIDATE
      this.$emit('input', this.config)
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
    },
    updated () {},
    /* keep-alive 组件激活时调用。 */
    activated () {},
    /* keep-alive 组件停用时调用。 */
    deactivated () {},
    watch: {
      'config.CKey.default' (val, old) {
        // console.log(val)
      }
    },
    beforeDestroy () {},
    destroyed () {},
    methods: {
      ControlClick () {
        this.$emit(`getValue`, this.config)
      },
      // 获得焦点事件
      focusAction () {},
      // 失去焦点事件
      blurAction () {
        this.$emit(`getValue`, this.config)
      },
      // 值变更事件
      changeAction () {
        this.$emit(`getValue`, this.config)
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '输入框', // 标题
          CTitleEN: 'input Control', // 英文标题
          CName: 'CInput', // 控件名称
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
            prepend: '', // input 前置头
            append: '', // input 追尾说明
            type: [{
              value: 'input',
              name: '文本框'
            }, {
              value: 'textarea',
              name: '多行文本'
            }], // input 类型 text number......and so on
            typeModel: 'input',
            description: '', // 描述
            placeholder: '请输入默认值或者为空', // 控件提示值
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
