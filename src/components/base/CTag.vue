<template>
  <div class="CTag" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <div v-if="config.CAttribute.typeModel==='tag'">
        <el-tag
          :type="config.CAttribute.typeDefaultSelect"
          :closable="config.CAttribute.closable.closableStatus"
          :close-transition="config.CAttribute.closable.transitionModel"
          :hit="config.CAttribute.hit.hitStatus"
          @close="handleClose">
          {{config.CAttribute.defaultTagName}}
        </el-tag>
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <div v-if="ControlConfig.CAttribute.typeModel==='tag'">
        <el-tag
          :type="ControlConfig.CAttribute.typeDefaultSelect"
          :closable="ControlConfig.CAttribute.closable.closableStatus"
          :close-transition="ControlConfig.CAttribute.closable.transitionModel"
          :hit="ControlConfig.CAttribute.hit.hitStatus"
          @close="handleClose">
          {{ControlConfig.CAttribute.defaultTagName}}
        </el-tag>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CTag`,
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
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
      this.$emit('input', this.config)
    },
    methods: {
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
      ControlClick () {
        this.emitConfig()
      },
      handleClose () {
        var tagArr = []
        tagArr.push(this.defaultTagName)
        tagArr.splice(tagArr.indexOf(0), 1)
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '标签', // 标题
          CTitleEN: 'Tag Control', // 英文标题
          CName: 'CTag', // 控件名称
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
            defaultTagName: '标签一',
            type: [{
              value: '',
              name: '默认标签'
            }, {
              value: 'primary',
              name: '原始标签'
            }, {
              value: 'gray',
              name: '灰色标签'
            }, {
              value: 'warning',
              name: '警告标签'
            }, {
              value: 'danger',
              name: '危险标签'
            }, {
              value: 'success',
              name: '成功标签'
            }], // tag 类型： primary，gray，success，warning，danger 或者通过color属性自定义背景色
            typeModel: 'tag',
            typeDefaultSelect: '',
            description: '', // 描述
            closable: { // 状态
              closableStatus: false,  // 是否可关闭 (默认false）
              transitionModel: false,  // 是否禁用渐变动画 (默认false）
              closeTransition: [
                {
                  value: true,
                  name: '禁用渐变动画'
                },
                {
                  value: false,
                  name: '使用渐变动画'
                }
              ]
            },
            hit: {
              hitStatus: true,
              hitable: [
                {
                  value: true,
                  name: '是'
                },
                {
                  value: false,
                  name: '否'
                }
              ]
            } // 是否有边框描边 (默认false）
          },
          position: [{ // 控件位置 (中文显示名称/英文属性名称)
            name: '左侧',
            value: 'left'
          }, {
            name: '右侧',
            value: 'right'
          }],
          positionModel: '', // 绑定的标签位置,
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
  .radio
    margin-right 14px
</style>
