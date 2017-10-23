<template>
  <div class="CRadio" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <div v-if="config.CAttribute.typeModel==='radio'">
        <el-radio-group
          v-model="config.CKey.default">
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
          v-model="config.CKey.default"
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
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <el-radio-group
            v-if="ControlConfig.CAttribute.typeModel==='radio'"
            v-model="ControlConfig.CKey.default">
            <!--增加span修改禁用状态-->
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
          <el-radio-group
            v-else
            v-model="ControlConfig.CKey.default"
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
        </el-form-item>
      </el-form>
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
      this.config = this.initConfig
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
      this.getChildrenLayoutValue()
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
        this.config.CAttribute.itemAttr.forEach((item, index) => {
          if (label === item.label) {
            this.config.CAttribute.currentSelected = index
          }
        })
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
    computed: {
      labelWidthCalc () {
        if (this.config.labelWidth) {
          return this.config.labelWidth + 'px'
        }
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '单选框', // 标题
          CTitleEN: 'radio Control', // 英文标题
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '文字左对齐'},
            {value: 'right', name: '文字右对齐'},
            {value: 'top', name: '文字居上对齐'}
          ],
          labelWidth: 80,
          CName: 'CRadio', // 控件名称
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
