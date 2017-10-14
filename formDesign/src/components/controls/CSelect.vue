<template>
  <div class="CSelect" @click="ControlClick">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--初始化组件-->
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <div v-if="ControlConfig.CAttribute.typeModel==='select'">
        <el-select v-model="ControlConfig.CAttribute.defaultSelected">
          <el-option
            v-for="item in ControlConfig.CAttribute.itemAttrSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div v-else>
        <el-select v-model="ControlConfig.CAttribute.defaultSelected">
          <el-option-group
            v-for="group in ControlConfig.CAttribute.itemAttrSelectGroup"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-option-group>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CSelect`,
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
    props: {
      ControlConfig: {
        type: Object
      },
      ControlID: {
        type: String,
        default: null
      }
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
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '选择器', // 标题
          CTitleEN: 'select Control', // 英文标题
          CName: 'CSelect', // 控件名称
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
            description: '', // 描述
            size: [{
              type: [{
                value: 'select',
                name: '选项不分组'
              }, {
                value: 'selectGroup',
                name: '选项分组'
              }], // Checkbox 类型 普通类型和按钮类型
              typeModel: 'select',
              value: 'large',
              name: '大'
            }, {
              value: 'small',
              name: '小'
            }, {
              value: 'mini',
              name: 'mini'
            }], // select尺寸
            sizeModel: 'small',
            itemAttrSelect: [{
              label: '样例1',
              value: '1'
            }, {
              label: '样例2',
              value: '2'
            }],
            itemAttrSelectGroup: [
              {
                label: '组名1',
                options: [{label: '样例1', value: '1-1'}]
              }, {
                label: '组名2',
                options: [{label: '样例2', value: '2-1'}]
              }
            ],
            defaultSelected: '', // 默认选中项
            isDisabled: false // 是否禁用该选项
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
</style>
