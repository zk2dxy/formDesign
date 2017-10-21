<template>
  <div class="formDesign" ref="formDesign">
    <div class="leftControls" ref="leftControls">

    </div>
    <div class="container" ref="container">

    </div>
    <div class="rightFormSettings" ref="rightFormSettings">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'
  import { calcLayoutClass } from '@/assets/js/common'

  export default {
    name: `formDesign`,
    components: {
      draggable
    },
    created () {
      this.loadAllControls()
    },
    mounted () {
      console.info(uuid)
      console.info(calcLayoutClass)
    },
    updated () {},
    /* keep-alive 组件激活时调用。 */
    activated () {},
    /* keep-alive 组件停用时调用。 */
    deactivated () {},
    beforeDestroy () {},
    destroyed () {},
    watch: {},
    methods: {
      loadAllControls () {
        this.ControlList = {
          form: {
            title: '表单容器',
            name: 'form',
            containerConfig: {
              workflow: [], // 工作流配置
              dataOrigin: [], // 数据来源配置
              config: [] // 自身配置
            }, // 容器配置
            controls: {
              base: {
                name: '',
                children: []
              },
              controls: {
                name: '基础控件',
                children: [{
                  CNameCN: '输入框',
                  CNameEN: 'input',
                  parent: 'form', // 父级对象
                  type: 'input', // 类型
                  component: 'CInput',
                  config: '' // 控件配置,
                }, {
                  CNameCN: '单选框',
                  CNameEN: 'radio',
                  parent: 'form', // 父级对象
                  type: 'radio', // 类型
                  component: 'CRadio',
                  config: '' // 控件配置,
                }]
              },
              extend: {
                name: '',
                children: []
              },
              layout: {
                name: '',
                children: []
              }
            }
          }
        }
      },
      showAttribute (data, item) {
        this.Config.CConfig = data
      },
      changeView (config) {}
    },
    computed: {},
    data () {
      return {
        list: [],
        ControlList: null,
        Config: {
          FConfig: '',
          CConfig: ''
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .leftControls
    width 18%
    position absolute
    top 1%
    bottom 1%
    left 1%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)

  .container
    width 60%
    position absolute
    top 1%
    bottom 1%
    left 20%
    right 20%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)

  .rightFormSettings
    position absolute
    width 18%
    top 1%
    bottom 1%
    right 1%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, 1)
</style>
