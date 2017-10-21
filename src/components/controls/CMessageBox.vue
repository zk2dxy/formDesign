<template>
  <div class="CInput" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <template>
        <el-button type="text" @click="openMessageBox">点击打开 Message Box</el-button>
      </template>

    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <template>
        <el-button type="text" @click="openMessageBox">点击打开 Message Box</el-button>
      </template>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CMessageBox`,
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
      'config.CKey.default' (val, old) {
        // console.log(val)
      }
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      ControlClick () {
        this.emitConfig()
      },
      // 获得焦点事件
      focusAction () {
        this.emitConfig()
      },
      // 失去焦点事件
      blurAction () {
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
      openMessageBox () {
        const h = this.$createElement
        this.$msgbox({
          title: this.config.CAttribute.MessageBoxtitle,
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', {style: 'color: red'}, 'VNode')
          ]),
          showCancelButton: this.config.MessageBoxStatus.showCancelButton.showCancelButton,
          showConfirmButton: this.config.MessageBoxStatus.showConfirmButton.showConfirmButton,
          confirmButtonText: this.config.CAttribute.confirmButtonText,
          cancelButtonText: this.config.CAttribute.cancelButtonText,
          closeOnClickModal: this.config.MessageBoxStatus.closeOnClickModal.closeOnClickModal,
          showInput: this.config.CAttribute.showInput.showInput,
          inputValue: this.config.CAttribute.inputValue,
          inputPattern: this.config.CAttribute.inputPattern,
          inputErrorMessage: this.config.CAttribute.inputErrorMessage,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 200)
              }, 800)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: this.config.CAttribute.typeModel,
            message: 'action: ' + action
          })
        }, () => {
        })
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '弹框', // 标题
          CTitleEN: 'MessageBox Control', // 英文标题
          CName: 'CMessageBox', // 控件名称
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
            type: [{
              value: 'success',
              name: '成功'
            }, {
              value: 'info',
              name: '信息'
            }, {
              value: 'warning',
              name: '警告'
            }, {
              value: 'error',
              name: '错误'
            }], // MessageBox 类型 success/info/warning/error
            typeModel: 'info',
            MessageBoxtitle: '提示',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            description: '', // 描述
            showInput: {
              showInput: false,
              showInputable: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 是否显示输入框
            inputValue: '', // 输入框的初始文本
            inputPattern: '', // 输入框的校验表达式
            inputErrorMessage: '' // 校验未通过时的提示文本
          },
          MessageBoxStatus: { // 状态
            showConfirmButton: {
              showConfirmButton: true,
              showConfirmButtonable: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 是否显示确定按钮
            showCancelButton: {
              showCancelButton: true,
              showCancelButtonable: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 是否取消确定按钮
            closeOnClickModal: {
              closeOnClickModal: true,
              closeOnClickModalable: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            } // 是否可通过点击遮罩关闭 MessageBox
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
