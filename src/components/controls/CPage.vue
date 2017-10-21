<template>
  <div class="CPage" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--page-->
      <!--基础用法-->
      <div class="block" v-if="config.CAttribute.typeModel === 'pageBasic'">
        <el-pagination
          :small="config.CAttribute.pageSmall"
          :page-size="config.CAttribute.pageSize"
          :current-page="config.CAttribute.pageCurrent"
          layout="prev, pager, next"
          :total="config.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--显示总数-->
      <div class="block" v-if="config.CAttribute.typeModel === 'pageTotal'">
        <el-pagination
          :small="config.CAttribute.pageSmall"
          :page-size="config.CAttribute.pageSize"
          :current-page.sync="config.CAttribute.pageCurrent"
          layout="total, prev, pager, next"
          :total="config.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--调整每页显示条数-->
      <div class="block" v-if="config.CAttribute.typeModel === 'pageItem'">
        <el-pagination
          :small="config.CAttribute.pageSmall"
          :page-size="config.CAttribute.pageSize"
          :current-page.sync="config.CAttribute.pageCurrent"
          layout="sizes, prev, pager, next"
          :total="config.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--直接前往-->
      <div class="block" v-if="config.CAttribute.typeModel === 'pageDirect'">
        <el-pagination
          :current-page="config.CAttribute.pageCurrent"
          :page-size="config.CAttribute.pageSize"
          layout="prev, pager, next, jumper"
          :total="config.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--完整功能-->
      <div class="block" v-if="config.CAttribute.typeModel === 'pageComplete'">
        <el-pagination
          :current-page="config.CAttribute.pageCurrent"
          :page-size="config.CAttribute.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="config.CAttribute.pageTotal">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <!--基础用法-->
      <div class="block" v-if="ControlConfig.CAttribute.typeModel === 'pageBasic'">
        <el-pagination
          :small="ControlConfig.CAttribute.pageSmall"
          :page-size="ControlConfig.CAttribute.pageSize"
          :current-page="ControlConfig.CAttribute.pageCurrent"
          layout="prev, pager, next"
          :total="ControlConfig.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--显示总数-->
      <div class="block" v-if="ControlConfig.CAttribute.typeModel === 'pageTotal'">
        <el-pagination
          :small="ControlConfig.CAttribute.pageSmall"
          :page-size="ControlConfig.CAttribute.pageSize"
          :current-page.sync="ControlConfig.CAttribute.pageCurrent"
          layout="total, prev, pager, next"
          :total="ControlConfig.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--调整每页显示条数-->
      <div class="block" v-if="ControlConfig.CAttribute.typeModel === 'pageItem'">
        <el-pagination
          :small="ControlConfig.CAttribute.pageSmall"
          :page-size="ControlConfig.CAttribute.pageSize"
          :current-page.sync="ControlConfig.CAttribute.pageCurrent"
          layout="sizes, prev, pager, next"
          :total="ControlConfig.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--直接前往-->
      <div class="block" v-if="ControlConfig.CAttribute.typeModel === 'pageDirect'">
        <el-pagination
          :current-page="ControlConfig.CAttribute.pageCurrent"
          :page-size="ControlConfig.CAttribute.pageSize"
          layout="prev, pager, next, jumper"
          :total="ControlConfig.CAttribute.pageTotal">
        </el-pagination>
      </div>
      <!--完整功能-->
      <div class="block" v-if="ControlConfig.CAttribute.typeModel === 'pageComplete'">
        <el-pagination
          :current-page="ControlConfig.CAttribute.pageCurrent"
          :page-size="ControlConfig.CAttribute.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ControlConfig.CAttribute.pageTotal">
        </el-pagination>
      </div>
      </div>
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
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'others',
          CTitleEN: 'page Control', // 英文标题
          CName: 'CPage', // 控件名称
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
            pageSmall: false, // 是否使用小型分页样式
            pageSize: 5, // 分页页数
            pageCurrent: 2, // 当前页数
            pageTotal: 100, // 总条目数
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
    width:200px;
    height:200px;
    background-color rgba(0, 0, 0, 0.8)
</style>
