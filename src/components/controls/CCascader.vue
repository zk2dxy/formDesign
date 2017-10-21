<template>
  <div class="CCascader" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>

    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <!--Cascader级联选择器-->
      <div class="block">
        <el-cascader
          :options="ControlConfig.CAttribute.cascadeList"
          :props="ControlConfig.CAttribute.cascadeProps"
          :show-all-levels="ControlConfig.CAttribute.showAllLevelFlag"
          :filterable="ControlConfig.CAttribute.filterable"
          :change-on-select="ControlConfig.CAttribute.changeOnSelect"
          :size="ControlConfig.CAttribute.cascadeSize"
          :placeholder="ControlConfig.CAttribute.cascadePlaceholder"
          v-model="ControlConfig.CAttribute.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CCascader`,
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
//      级联菜单
      handleChange (value) {
        this.config.CAttribute.cascadePropsTitle = value[value.length - 1]
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'others',
          CTitleEN: 'cascader Control', // 英文标题
          CName: 'CCascader', // 控件名称
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
            cascadeList: [{
              value: 'jilianyi',
              label: '级联一',
              children: [{
                value: 'jilian1-1',
                label: '级联1-1',
                children: [{
                  value: 'jilian1-1-1',
                  label: '级联1-1-1'
                }, {
                  value: 'jilian1-1-2',
                  label: '级联1-1-2'
                }]
              }]
            }, {
              value: 'jilianer',
              label: '级联2',
              children: [{
                value: 'jilian2-2',
                label: '级联2-2',
                children: [{
                  value: 'jilian2-2-2',
                  label: '级联2-2-2'
                }, {
                  value: 'jilian2-2-3',
                  label: '级联2-2-3'
                }]
              }]
            }],
            cascadeProps: {
              value: 'value',
              children: 'children'
            },
            cascadePropsTitle: '',
            showAllLevelFlag: true, // 是否显示完整路径
            showAllLevels: [{
              value: true,
              name: '是'
            }, {
              value: false,
              name: '否'
            }],
            filterable: false, // 是否可搜索选项
            filterableOption: [{
              value: true,
              name: '是'
            }, {
              value: false,
              name: '否'
            }],
            changeOnSelect: true, // 是否允许选择任意一级的选项
            changeOnSelectOption: [{
              value: true,
              name: '是'
            }, {
              value: false,
              name: '否'
            }],
            cascadeSize: 'small', // 尺寸
            cascadeSizeOption: [{
              value: 'large',
              name: '大'
            }, {
              value: 'small',
              name: '小型'
            }, {
              value: 'mini',
              name: '超小'
            }],
            cascadePlaceholder: '请选择*****', // 默认文本
            selectedOptions: [],
            description: '', // 描述
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
//    卡片样式
  .box-card
    float left
    width 45%
    margin-bottom 20px
    margin-right 20px
  .item
    margin-bottom 20px
  .CCard
    display inline-block
    width:100%
  .cardImg, .card-category, .card-img-item
    display inline-block
  .card-img-item
    margin-right 20px
    margin-bottom 20px
    > div
        .bottom
          margin-top: 13px
          line-height: 12px
  .button
    padding 0
    float right
</style>
