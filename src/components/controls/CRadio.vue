<template>
  <div class="CRadio" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <div v-if="config.CAttribute.typeModel==='radio'">
        <el-radio-group
          v-model="config.CAttribute.defaultRadioSelected">
            <span class="radio"
                 @click="SelectedChange(item.label)"
                 v-for="(item, index) in config.CAttribute.itemAttr"
                 :key="item.label">
              <el-radio
                :label="item.label"
                :disabled="item.isDisabled">
                {{item.showContent}}</el-radio>
            </span>
        </el-radio-group>
      </div>
      <div v-else>
        <el-radio-group
          v-model="config.CAttribute.defaultRadioSelected"
          :size="config.CAttribute.sizeModel"
          :text-color="config.CAttribute.textColor"
          :fill="config.CAttribute.fillColor">
          <span class="radio"
               @click="SelectedChange(item.label)"
               v-for="(item, index) in config.CAttribute.itemAttr"
               :key="item.label">
            <el-radio-button
              :label="item.label"
              :disabled="item.isDisabled">
              {{item.showContent}}</el-radio-button>
          </span>
        </el-radio-group>
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <div v-if="ControlConfig.CAttribute.typeModel==='radio'">
        <el-radio-group
          v-model="ControlConfig.CAttribute.defaultRadioSelected">
            <!--增加div修改禁用状态-->
            <span class="radio"
                  @click="SelectedChange(item.label)"
                  v-for="(item, index) in ControlConfig.CAttribute.itemAttr"
                  :key="item.label">
              <el-radio
                :label="item.label"
                :disabled="item.isDisabled"
                @click="SelectedChange(item.label)">
                {{item.showContent}}</el-radio>
            </span>
        </el-radio-group>
      </div>
      <div v-else>
        <el-radio-group
          v-model="ControlConfig.CAttribute.defaultRadioSelected"
          :size="ControlConfig.CAttribute.sizeModel"
          :text-color="ControlConfig.CAttribute.textColor"
          :fill="ControlConfig.CAttribute.fillColor"
          @change="SelectedChange">
            <span class="radio"
                  @click="SelectedChange(item.label)"
                  v-for="(item, index) in ControlConfig.CAttribute.itemAttr"
                  :key="item.label">
              <el-radio-button
                :label="item.label"
                :disabled="item.isDisabled"
                @click="SelectedChange(item.label)">
                {{item.showContent}}</el-radio-button>
            </span>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CRadio`,
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
      SelectedChange (label) {
        console.log('dfasf')
        this.config.CAttribute.itemAttr.forEach((item, index) => {
          if (label === item.label) {
            this.config.CAttribute.currentSelected = index
          }
        })
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '单选框', // 标题
          CTitleEN: 'radio Control', // 英文标题
          CName: 'CRadio', // 控件名称
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
              value: 'radio',
              name: '普通单选框'
            }, {
              value: 'button',
              name: '按钮样式'
            }], // radio 类型 普通类型和按钮类型
            typeModel: 'radio',
            description: '', // 描述
            size: [{
              value: 'large',
              name: '大'
            }, {
              value: 'small',
              name: '小'
            }], // 按钮尺寸
            sizeModel: 'small',
            itemAttr: [{
              label: '1',
              showContent: '样例1',
              isDisabled: false // 是否禁用该选项
            }, {
              label: '2',
              showContent: '样例2',
              isDisabled: false // 是否禁用该选项
            }],
            addStatus: false, // 增加radio选项状态
            currentSelected: 0, // 现在选中项的index
            defaultRadioSelected: '1', // 默认选中项
            textColor: '#fff', // 按钮激活时的文本颜色
            fillColor: '', // 按钮激活时的填充色和边框色（默认继承主题样式：设置default）
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
              },
              {
                value: '',
                name: '禁用'
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
  .radio
    margin-right 14px
</style>
