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
      <div v-if="ControlConfig.CAttribute.typeModel === 'select'">
        <div v-if="ControlConfig.CAttribute.isSelectRemote">
          <el-select
            v-model="ControlConfig.CAttribute.defaultSelected"
            :size="ControlConfig.CAttribute.sizeModel"
            :multiple="ControlConfig.CAttribute.isMultiple"
            :multiple-limit="ControlConfig.CAttribute.ableSelectedMax"
            :clearable="ControlConfig.CAttribute.isSelectClearable"
            :filterable="ControlConfig.CAttribute.isSelectFilterable"
            :allow-create="ControlConfig.CAttribute.isSelectCreate"
            remote
            :remote-method="RemoteMethod"
            :loading="loading"
            :loading-text="ControlConfig.CAttribute.loadingText"
            :no-match-text="ControlConfig.CAttribute.noMatchText"
            :no-data-text="ControlConfig.CAttribute.noDataText"
            :placeholder="ControlConfig.CAttribute.placeholder">
            <el-option
              v-for="item in options"
              :key="item.label"
              :value="item.label"
              :label="item.showContent"
              :disabled="item.isDisabled">
              <div @click="SelectedChange(item.label)">{{item.showContent}}</div>
            </el-option>
          </el-select>
        </div>
        <div v-else>
          <el-select
            v-model="ControlConfig.CAttribute.defaultSelected"
            :size="ControlConfig.CAttribute.sizeModel"
            :multiple="ControlConfig.CAttribute.isMultiple"
            :multiple-limit="ControlConfig.CAttribute.ableSelectedMax"
            :clearable="ControlConfig.CAttribute.isSelectClearable"
            :filterable="ControlConfig.CAttribute.isSelectFilterable"
            :allow-create="ControlConfig.CAttribute.isSelectCreate"
            :no-match-text="ControlConfig.CAttribute.noMatchText"
            :no-data-text="ControlConfig.CAttribute.noDataText"
            :placeholder="ControlConfig.CAttribute.placeholder">
            <el-option
              v-for="item in ControlConfig.CAttribute.itemAttr"
              :key="item.label"
              :value="item.label"
              :label="item.showContent"
              :disabled="item.isDisabled">
              <div @click="SelectedChange(item.label)">{{item.showContent}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-else>
        <div v-if="ControlConfig.CAttribute.isSelectRemote">
          <el-select
            v-model="ControlConfig.CAttribute.defaultSelected"
            :size="ControlConfig.CAttribute.sizeModel"
            :multiple="ControlConfig.CAttribute.isMultiple"
            :multiple-limit="ControlConfig.CAttribute.ableSelectedMax"
            :clearable="ControlConfig.CAttribute.isSelectClearable"
            :filterable="ControlConfig.CAttribute.isSelectFilterable"
            :allow-create="ControlConfig.CAttribute.isSelectCreate"
            remote
            :remote-method="RemoteMethodGroup"
            :loading="loading"
            :loading-text="ControlConfig.CAttribute.loadingText"
            :no-match-text="ControlConfig.CAttribute.noMatchText"
            :no-data-text="ControlConfig.CAttribute.noDataText"
            :placeholder="ControlConfig.CAttribute.placeholder">
            <el-option-group
              v-for="group in optionsGroup"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.label"
                :value="item.label"
                :label="item.showContent"
                :disabled="item.isDisabled">
                <div @click="SelectedChange(item.label)">{{item.showContent}}</div>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <div v-else>
          <el-select
            v-model="ControlConfig.CAttribute.defaultSelected"
            :size="ControlConfig.CAttribute.sizeModel"
            :multiple="ControlConfig.CAttribute.isMultiple"
            :multiple-limit="ControlConfig.CAttribute.ableSelectedMax"
            :clearable="ControlConfig.CAttribute.isSelectClearable"
            :filterable="ControlConfig.CAttribute.isSelectFilterable"
            :allow-create="ControlConfig.CAttribute.isSelectCreate"
            :no-match-text="ControlConfig.CAttribute.noMatchText"
            :no-data-text="ControlConfig.CAttribute.noDataText"
            :placeholder="ControlConfig.CAttribute.placeholder">
            <el-option-group
              v-for="group in ControlConfig.CAttribute.itemAttrSelectGroup"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.label"
                :value="item.label"
                :label="item.showContent"
                :disabled="item.isDisabled">
                <div @click="SelectedChange(item.label)">{{item.showContent}}</div>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
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
      },
      SelectedChange (label) {
        if (this.config.CAttribute.typeModel === 'select') {
          this.config.CAttribute.itemAttr.forEach((item, index) => {
            if (label === item.label) {
              this.config.CAttribute.currentSelected = index
            }
          })
        } else {
          this.config.CAttribute.itemAttrSelectGroup.forEach((item, indexGroup) => {
            item.options.forEach((option, indexItem) => {
              if (label === option.label) {
                this.config.CAttribute.currentSelectedGroup[0] = indexGroup
                this.config.CAttribute.currentSelectedGroup[1] = indexItem
              }
            })
          })
        }
      },
      RemoteMethodGroup (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.config.CAttribute.itemAttrSelectGroup.map(item => {
              item.options.map(itemOptions => {
                if (itemOptions.label === query) {
                  this.optionsGroup[0] = item
                }
              })
            })
          }, 200)
        } else {
          this.optionsGroup = []
        }
      },
      RemoteMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options = this.config.CAttribute.itemAttr.filter(item => {
              return item.label === query
            })
          }, 20)
        } else {
          this.options = []
        }
      }
    },
    watch: {

    },
    data () {
      return {
        loading: false,
        options: [],
        // [{label: '', showContent: '', isDisabled: false}]}
        optionsGroup: [{label: 'aa', options: [{label: '', showContent: '', isDisabled: false}]}],
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
            type: [{
              value: 'select',
              name: '选项不分组'
            }, {
              value: 'selectGroup',
              name: '选项分组'
            }],
            typeModel: 'select',
            description: '', // 描述
            size: [{
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
            itemAttr: [{
              label: '1',
              showContent: '样例1',
              isDisabled: false // 是否禁用该选项
            }, {
              label: '2',
              showContent: '样例2',
              isDisabled: false // 是否禁用该选项
            }],
            itemAttrSelectGroup: [
              {
                label: '组名1',
                options: [{label: '1-1', showContent: '样例1', isDisabled: false}]
              }, {
                label: '组名2',
                options: [{label: '2-1', showContent: '样例2', isDisabled: false}]
              }
            ],
            placeholder: '', // select提示符
            isMultiple: false, // 是否多选
            ableSelectedMax: 0, // 多选时最多可选项目，默认为0，不限制
            addStatus: false, // 增加Select选项状态
            currentSelected: 0,
            currentSelectedGroup: [0, 0],
            defaultSelected: '', // 默认选中项
            isDisabled: false, // 是否禁用该选项
            isSelectClearable: false, // 单选时是否显示清除选项
            isSelectFilterable: false, // 是否可搜索
            isSelectRemote: false, // 是否可远程搜索
            isSelectCreate: false, // 是否可创建
            loadingText: 'loading', // 远程加载时的文字
            noMatchText: 'no match', // 搜索条件无匹配时的文字
            noDataText: 'no data' // 选项为空时显示的文字
          },
//          CKey: { // 控件值
//            default: '', // 默认值
//            type: '', // 控件值类型
//            keyMethods: '' // 计算控件值方法
//          },
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
</style>
