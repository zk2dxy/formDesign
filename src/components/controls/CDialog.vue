<template>
  <div class="CInput" @click="ControlClick()" style="padding:5px">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <el-button type="text" @click="config.CAttribute.dialogVisible = true">打开Dialog</el-button>
      <el-dialog
        :title="config.CAttribute.title"
        :top="config.CAttribute.top"
        :visible.sync="config.CAttribute.dialogVisible"
        :dialogSize="config.CAttribute.dialogSize.currentSize"
        :modal="config.CAttribute.modal.modal"
        :modal-append-to-body="config.CAttribute.modal.modalPosition.modalPosition"
        :lock-scroll="config.CAttribute.lockScroll.lockScroll"
        :show-close="config.CAttribute.showClose.showClose"
        :close-on-click-modal="true"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="config.CAttribute.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="config.CAttribute.dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--<div v-else>-->
    <!--<div class="title">-->
    <!--{{ControlConfig.CTitleCN}}-->
    <!--</div>-->
    <!--<el-button type="text" @click="ControlConfig.CAttribute.dialogVisible = true">打开Dialog</el-button>-->
    <!--<el-dialog-->
    <!--:title="ControlConfig.CAttribute.title"-->
    <!--:top="ControlConfig.CAttribute.top"-->
    <!--:visible.sync="ControlConfig.CAttribute.dialogVisible-->
    <!--:size="ControlConfig.CAttribute.size.currentSize"-->
    <!--:modal="ControlConfig.CAttribute.modal.modal"-->
    <!--:modal-append-to-body="ControlConfig.CAttribute.modal.modalPosition.modalPosition"-->
    <!--:lock-scroll="ControlConfig.CAttribute.lockScroll.lockScroll"-->
    <!--:show-close="ControlConfig.CAttribute.showClose.showClose"-->
    <!--:before-close="handleClose">-->
    <!--<span>这是一段信息</span>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="ControlConfig.CAttribute.dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="ControlConfig.CAttribute.dialogVisible = false">确 定</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CDialog`,
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
        this.formOBJ.mutations.selectObj(this.formOBJ, this.formItem)
        this.$emit('changeTAB', this.formItem)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '对话框', // 标题
          CTitleEN: 'Dialog Control', // 英文标题
          CName: 'CDialog', // 控件名称
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
            dialogVisible: false,
            title: '提示',
            top: '10%',
            dialogSize: {
              currentSize: 'tiny',
              sizeAble: [
                {
                  value: true,
                  name: 'tiny'
                },
                {
                  value: true,
                  name: 'small'
                },
                {
                  value: true,
                  name: 'large'
                },
                {
                  value: true,
                  name: 'full'
                }
              ]
            },
            description: '', // 描述
            modal: {
              modal: true,
              modalPosition: {
                modalPosition: false,
                modalPositionAble: [
                  {
                    value: false,
                    name: '遮罩层插入至Dialog父元素上'
                  },
                  {
                    value: true,
                    name: '遮罩层是否插入至body元素上'
                  }
                ]
              },
              modalAble: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 遮罩层
            lockScroll: {
              lockScroll: false,
              lockScrollAble: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 是否Dialog出现时将body滚动锁定
            showClose: {
              showClose: true,
              showCloseAble: [
                {
                  value: false,
                  name: '否'
                },
                {
                  value: true,
                  name: '是'
                }
              ]
            }, // 显示关闭按钮
            closeDialog: { // 关闭方式,未完成A
              closeDialog: []
            }
          },
          CKey: { // 控件值
            default: '', // 默认值
            type: '', // 控件值类型
            keyMethods: '' // 计算控件值方法
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
