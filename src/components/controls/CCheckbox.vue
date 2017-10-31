<template>
  <div class="CCheckbox" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--初始化组件-->
    </div>
    <div v-else>
      <el-form
        v-if="ControlConfig.CAttribute.typeModel==='checkbox'"
        :label-position="ControlConfig.labelPositionModel"
        :label-width=labelWidthCalc
      >
        <el-form-item :label="ControlConfig.CTitleCN">
          <div v-if="ControlConfig.CAttribute.typeModel==='checkbox' && ControlConfig.CAttribute.showAllCheckbox">
            <extend-checkbox
              :indeterminate="ControlConfig.CAttribute.indeterminateCheckbox"
              v-model="ControlConfig.CAttribute.checkAllCheckbox"
              @change="CheckAllChange"
            >全选
            </extend-checkbox>
          </div>
          <extend-checkbox-group
            :class="[
              !(ControlConfig.CAttribute.showAllCheckbox) ? 'showAll' : ''
            ]"
            v-if="ControlConfig.CAttribute.typeModel==='checkbox'"
            v-model="ControlConfig.CAttribute.defaultCheckboxSelected"
            :min="ControlConfig.CAttribute.ableSelectedMin"
            :max="ControlConfig.CAttribute.ableSelectedMax">
            <extend-checkbox
              @click="SelectedChange(item.label)"
              v-for="(item, index) in ControlConfig.CAttribute.itemAttr"
              :key="item.label"
              :label="item.label"
              :disabled="item.isDisabled">
              {{item.showContent}}
            </extend-checkbox>
          </extend-checkbox-group>
          <extend-checkbox-group
            v-else
            :class="[
              !(ControlConfig.CAttribute.showAllCheckbox) ? 'showAll' : ''
            ]"
            v-model="ControlConfig.CAttribute.defaultCheckboxSelected"
            :size="ControlConfig.CAttribute.sizeModel"
            :text-color="ControlConfig.CAttribute.textColor"
            :fill="ControlConfig.CAttribute.fillColor"
            :min="ControlConfig.CAttribute.ableSelectedMin"
            :max="ControlConfig.CAttribute.ableSelectedMax">
            <extend-checkbox-button
              @click="SelectedChange(item.label)"
              v-for="(item, index) in ControlConfig.CAttribute.itemAttr"
              :key="item.label"
              :label="item.label"
              :disabled="item.isDisabled">
              {{item.showContent}}
            </extend-checkbox-button>
          </extend-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CCheckbox`,
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
      SelectedChange (label) {
        this.config.CAttribute.itemAttr.forEach((item, index) => {
          if (label[label.length - 1] === item.label) {
            this.config.CAttribute.currentSelected = index
          }
        })
      },
      CheckAllChange (event) {
        if (event.target.checked) {
          this.config.CAttribute.defaultCheckboxSelected = this.config.CAttribute.itemAttr.map((item) => {
            return item.label
          })
        }
        this.config.CAttribute.indeterminateCheckbox = false
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
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleCN: '多选框', // 标题
          CTitleEN: 'checkbox Control', // 英文标题
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
          labelWidth: 80,
          CName: 'CCheckbox', // 控件名称
          layoutModel: 'flexLayout',
          currentLayout: null,
          CLayout: [ // 布局
            { // flex 布局
              type: Number,
              name: '自适应',
              default: 1,
              value: 'flexLayout',
              status: true,
              max: 10
            },
            { // 百分比布局
              type: Number,
              name: '百分比',
              default: 100,
              value: 'percentLayout',
              status: false,
              max: 100
            },
            { // 像素布局
              type: Number,
              name: '像素',
              default: 100,
              value: 'pixelLayout',
              status: false,
              max: null
            },
            { // 栅格布局
              type: Number,
              name: '栅格',
              default: 12,
              value: 'columnLayout',
              status: false,
              max: 12
            }
          ],
          CAttribute: {
            type: [{
              value: 'checkbox',
              name: '普通样式'
            }, {
              value: 'button',
              name: '按钮样式'
            }], // Checkbox 类型 普通类型和按钮类型
            typeModel: 'checkbox',
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
            indeterminateCheckbox: true, // 全选样式
            checkAllCheckbox: true, // 默认全选选中
            showAllCheckbox: false, // 是否显示全选选项
            addStatus: false, // 增加Checkbox选项状态
            currentSelected: 0, // 现在选中项的index
            defaultCheckboxSelected: [], // 默认选中项
            textColor: '#fff', // 按钮激活时的文本颜色
            fillColor: '', // 按钮激活时的填充色和边框色（默认继承主题样式：设置default）
            ableSelectedMin: 1, // 可被勾选的 checkbox 的最小数量
            ableSelectedMax: 2 // 可被勾选的 checkbox 的最大数量
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

  .showAll
    margin-top 8px
</style>
