<template>
  <div class="CTag" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <div>
        <el-tag
          :type="config.CAttribute.typeModel"
          :closable="config.CAttribute.closable.closableStatus"
          :close-transition="config.CAttribute.closable.transitionModel"
          :hit="config.CAttribute.hit.hitStatus"
          :color="config.CAttribute.colorTag"
          @close="handleClose">
          {{config.CAttribute.defaultTagName}}
        </el-tag>
      </div>
    </div>
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-tag
            :type="ControlConfig.CAttribute.typeModel"
            :closable="ControlConfig.CAttribute.closable.closableStatus"
            :close-transition="ControlConfig.CAttribute.closable.transitionModel"
            :hit="ControlConfig.CAttribute.hit.hitStatus"
            :color="ControlConfig.CAttribute.colorTag"
            @close="handleClose">
            {{ControlConfig.CAttribute.defaultTagName}}
          </el-tag>
        </el-form-item>
      </el-form>
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
      let item = JSON.parse(localStorage.getItem('tag'))
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
      let item = JSON.parse(localStorage.getItem('tag'))
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
      handleClose () {
        var tagArr = []
        tagArr.push(this.defaultTagName)
        tagArr.splice(tagArr.indexOf(0), 1)
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
        color1: null,
        initConfig: {
          ControlProperties: '',
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '标签', // 标题
          CTitleEN: 'Tag Control', // 英文标题
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
          labelWidth: 80,
          CName: 'CTag', // 控件名称
          layoutModel: 'percentLayout',
          currentLayout: null,
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
            defaultTagName: '标签一',
            type: [{
              value: '',
              name: '默认'
            }, {
              value: 'primary',
              name: '原始'
            }, {
              value: 'gray',
              name: '灰色'
            }, {
              value: 'warning',
              name: '警告'
            }, {
              value: 'danger',
              name: '危险'
            }, {
              value: 'success',
              name: '成功'
            }], // tag 类型： primary，gray，success，warning，danger 或者通过color属性自定义背景色
            typeModel: '',
            colorTag: this.color1,
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
//          position: [{ // 控件位置 (中文显示名称/英文属性名称)
//            name: '左侧',
//            value: 'left'
//          }, {
//            name: '右侧',
//            value: 'right'
//          }],
//          positionModel: '', // 绑定的标签位置,
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
