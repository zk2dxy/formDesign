<template>
  <div class="CPage" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--page-->
      <el-form :label-position="config.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="config.CTitleCN">
          <!--基础用法-->
          <el-pagination
            v-if="config.CAttribute.typeModel === 'pageBasic'"
            :class="config.CAttribute.pageAlign"
            :small="config.CAttribute.pageSmall"
            :page-size="config.CAttribute.pageSize"
            :current-page="config.CAttribute.pageCurrent"
            layout="prev, pager, next"
            :total="config.CAttribute.pageTotal">
          </el-pagination>
          <!--显示总数-->
          <el-pagination
            v-if="config.CAttribute.typeModel === 'pageTotal'"
            :class="config.CAttribute.pageAlign"
            :small="config.CAttribute.pageSmall"
            :page-size="config.CAttribute.pageSize"
            :current-page.sync="config.CAttribute.pageCurrent"
            layout="total, prev, pager, next"
            :total="config.CAttribute.pageTotal">
          </el-pagination>
          <!--调整每页显示条数-->
          <el-pagination
            v-if="config.CAttribute.typeModel === 'pageItem'"
            :class="config.CAttribute.pageAlign"
            :small="config.CAttribute.pageSmall"
            :page-size="config.CAttribute.pageSize"
            :current-page.sync="config.CAttribute.pageCurrent"
            layout="sizes, prev, pager, next"
            :total="config.CAttribute.pageTotal">
          </el-pagination>
          <!--直接前往-->
          <el-pagination
            v-if="config.CAttribute.typeModel === 'pageDirect'"
            :class="config.CAttribute.pageAlign"
            :small="config.CAttribute.pageSmall"
            :current-page="config.CAttribute.pageCurrent"
            :page-size="config.CAttribute.pageSize"
            layout="prev, pager, next, jumper"
            :total="config.CAttribute.pageTotal">
          </el-pagination>
          <!--完整功能-->
          <el-pagination
            v-if="config.CAttribute.typeModel === 'pageComplete'"
            :class="config.CAttribute.pageAlign"
            :small="config.CAttribute.pageSmall"
            :current-page="config.CAttribute.pageCurrent"
            :page-size="config.CAttribute.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="config.CAttribute.pageTotal">
          </el-pagination>
        </el-form-item>
      </el-form>
    </div>
    <!--else-->
    <div v-else>
      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <!--基础用法-->
          <el-pagination
            v-if="ControlConfig.CAttribute.typeModel === 'pageBasic'"
            :class="ControlConfig.CAttribute.pageAlign"
            :small="ControlConfig.CAttribute.pageSmall"
            :page-size="ControlConfig.CAttribute.pageSize"
            :current-page="ControlConfig.CAttribute.pageCurrent"
            layout="prev, pager, next"
            :total="ControlConfig.CAttribute.pageTotal">
          </el-pagination>
          <!--显示总数-->
          <el-pagination
            v-if="ControlConfig.CAttribute.typeModel === 'pageTotal'"
            :class="ControlConfig.CAttribute.pageAlign"
            :small="ControlConfig.CAttribute.pageSmall"
            :page-size="ControlConfig.CAttribute.pageSize"
            :current-page.sync="ControlConfig.CAttribute.pageCurrent"
            layout="total, prev, pager, next"
            :total="ControlConfig.CAttribute.pageTotal">
          </el-pagination>
          <!--调整每页显示条数-->
          <el-pagination
            v-if="ControlConfig.CAttribute.typeModel === 'pageItem'"
            :class="ControlConfig.CAttribute.pageAlign"
            :small="ControlConfig.CAttribute.pageSmall"
            :page-size="ControlConfig.CAttribute.pageSize"
            :current-page.sync="ControlConfig.CAttribute.pageCurrent"
            layout="sizes, prev, pager, next"
            :total="ControlConfig.CAttribute.pageTotal">
          </el-pagination>
          <!--直接前往-->
          <el-pagination
            v-if="ControlConfig.CAttribute.typeModel === 'pageDirect'"
            :class="ControlConfig.CAttribute.pageAlign"
            :small="ControlConfig.CAttribute.pageSmall"
            :current-page="ControlConfig.CAttribute.pageCurrent"
            :page-size="ControlConfig.CAttribute.pageSize"
            layout="prev, pager, next, jumper"
            :total="ControlConfig.CAttribute.pageTotal">
          </el-pagination>
          <!--完整功能-->
          <el-pagination
            v-if="ControlConfig.CAttribute.typeModel === 'pageComplete'"
            :class="ControlConfig.CAttribute.pageAlign"
            :small="ControlConfig.CAttribute.pageSmall"
            :current-page="ControlConfig.CAttribute.pageCurrent"
            :page-size="ControlConfig.CAttribute.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ControlConfig.CAttribute.pageTotal">
          </el-pagination>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CPage`,
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
    computed: {
      labelWidthCalc () {
        if (this.config.labelWidth) {
          return this.config.labelWidth + 'px'
        }
      }
    },
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
          CBelong: 'others',
          CTitleCN: '分页控件',
          CTitleEN: 'page Control', // 英文标题
          CName: 'CPage', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '左对齐'},
            {value: 'right', name: '右对齐'},
            {value: 'top', name: '居上对齐'}
          ],
          labelWidth: 80,
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
            pageSmall: false, // 是否使用小型分页样式
            pageSize: 5, // 分页页数
            pageCurrent: 2, // 当前页数
            pageTotal: 100, // 总条目数
            pageAlign: 'left', // 对齐方式
            pageAlignOption: [{
              value: 'left',
              name: '左对齐'
            }, {
              value: 'center',
              name: '居中对齐'
            }, {
              value: 'right',
              name: '右对齐'
            }], // 对齐方式列表
            pageSmallList: [{
              name: '是',
              value: true
            }, {
              name: '否',
              value: false
            }],
            type: [{
              value: 'pageBasic',
              name: '基础分页'
            }, {
              value: 'pageTotal',
              name: '显示总数'
            }, {
              value: 'pageItem',
              name: '调整每页显示条数'
            }, {
              value: 'pageDirect',
              name: '直接前往'
            }, {
              value: 'pageComplete',
              name: '完整功能'
            }], // input 类型 text number......and so on
            typeModel: 'pageBasic',
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

  //    loading
  .loading
    width: 200px;
    height: 200px;
    background-color rgba(0, 0, 0, 0.8)

  .el-pagination
    padding-top 3px
  .el-pagination.left
    text-align left
  .el-pagination.center
    text-align center
  .el-pagination.right
    text-align right
</style>
