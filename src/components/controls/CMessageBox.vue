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
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <template>
            <el-button type="text" @click="openMessageBox">点击打开 Message Box</el-button>
          </template>
        </el-form-item>
      </el-form>
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
            h('span', null, this.config.CAttribute.MessageBoxmessage),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: this.config.MessageBoxStatus.showCancelButton.showCancelButton,
          showConfirmButton: this.config.MessageBoxStatus.showConfirmButton.showConfirmButton,
          confirmButtonText: this.config.CAttribute.confirmButtonText,
          cancelButtonText: this.config.CAttribute.cancelButtonText,
          closeOnClickModal: this.config.MessageBoxStatus.closeOnClickModal.closeOnClickModal,
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
            MessageBoxmessage: '请输入',
            description: '' // 描述
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
