<template>
  <div class="CInput">
    <el-input @click="" @focus="" @change="" @blur=""></el-input>
    <i class="icon icon-home"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CInput`,
    // 控件配置、表单配置、数据来源配置
    props: [`ControlConfig`, `FormConfig`, `OriginDataConfig`],
    data () {
      return {
        config: {
          layout: { // 布局
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
          attribute: {
            type: '', // 类型
            title: '', // 标题
            description: '', // 描述
            placeholder: '', // 控件提示值
            height: '', // 高度
            vertical: '' // 对齐方式
          },
          controlValue: { // 控件值
            default: '', // 默认值
            type: '', // 控件值类型
            keyMethods: '' // 计算控件值方法
          },
          validate: {
            maxLength: 255, // 最大长度
            minLength: 1, // 最小长度,
            regexp: '' // 正则表达式
          },
          status: { // 状态
            rule: false, // 是否应用状态
            rules: [] // 控件规则集合
          },
          icon: {
            status: false,
            name: '',
            position: ''
          }
        }
      }
    },
    created () {},
    mounted () {},
    updated () {},
    /* keep-alive 组件激活时调用。 */
    activated () {},
    /* keep-alive 组件停用时调用。 */
    deactivated () {},
    watch: {},
    beforeDestroy () {},
    destroyed () {},
    methods: {
      // 获得焦点事件
      focusAction () {
        console.error(`focusAction`)
      },
      // 失去焦点事件
      blurAction () {
        console.error(`blurAction`)
      },
      // 值变更事件
      changeAction () {
        console.error(`changeAction`)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
</style>
