<template>
  <div class="CRadio" @click="ControlClick()">
    <div v-if="config && (!ControlID)">
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <div v-if="config.CAttribute.typeModel==='radio'">
        <el-radio-group
          v-model="config.CAttribute.defaultSelected"
          :text-color="config.CAttribute.textColor"
          :fill="config.CAttribute.fillColor"
          @change="SelectedChange">
          <template v-for="(item, index) in config.CAttribute.radioAttr">
            <el-radio :label="config.CAttribute.radioAttr[index].label">{{config.CAttribute.radioAttr[index].showContent}}</el-radio>
          </template>
        </el-radio-group>
      </div>
      <div v-else>
        <el-radio-group
          v-model="config.CAttribute.defaultSelected"
          :size="config.CAttribute.sizeModel"
          :text-color="config.CAttribute.textColor"
          :fill="config.CAttribute.fillColor"
          @change="SelectedChange">
          <template v-for="(item, index) in config.CAttribute.radioAttr">
            <el-radio :label="config.CAttribute.radioAttr[index].label">{{config.CAttribute.radioAttr[index].showContent}}</el-radio>
          </template>
        </el-radio-group>
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <div v-if="ControlConfig.CAttribute.typeModel==='radio'">
        <el-radio-group
          v-model="ControlConfig.CAttribute.defaultSelected"
          :text-color="ControlConfig.CAttribute.textColor"
          :fill="ControlConfig.CAttribute.fillColor"
          @change="SelectedChange">
          <template v-for="(item, index) in ControlConfig.CAttribute.radioAttr">
            <el-radio :label="ControlConfig.CAttribute.radioAttr[index].label">{{ControlConfig.CAttribute.radioAttr[index].showContent}}</el-radio>
          </template>
        </el-radio-group>
      </div>
      <div v-else>
        <el-radio-group
          v-model="ControlConfig.CAttribute.defaultSelected"
          :size="ControlConfig.CAttribute.sizeModel"
          :text-color="ControlConfig.CAttribute.textColor"
          :fill="ControlConfig.CAttribute.fillColor"
          @change="SelectedChange">
          <template v-for="(item, index) in ControlConfig.CAttribute.radioAttr">
            <el-radio-button :label="ControlConfig.CAttribute.radioAttr[index].label">{{ControlConfig.CAttribute.radioAttr[index].showContent}}</el-radio-button>
          </template>
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
    },
    mounted () {
      this.$emit('input', this.config)
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
    },
    methods: {
      ControlClick () {
        this.$emit(`getValue`, this.config)
      },
      SelectedChange (label) {
        this.config.CAttribute.radioAttr.forEach((item, index) => {
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
            radioAttr: [{
              label: '1',
              showContent: '样例1'
            }, {
              label: '2',
              showContent: '样例2'
            }],
            addItemStatus: false, // 增加radio选项状态
            currentSelected: 0, // 现在选中项的index
            defaultSelected: '1', // 默认选中项
            textColor: '#fff', // 按钮激活时的文本颜色
            fillColor: '' // 按钮激活时的填充色和边框色（默认继承主题样式：设置default）
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
          CValidate: {  // 对控件内容进行校验？？
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

</style>
