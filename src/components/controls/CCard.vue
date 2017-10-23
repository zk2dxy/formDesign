<template>
  <div class="CCard" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>

    </div>
    <div v-else>

      <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
        <el-form-item :label="ControlConfig.CTitleCN">
          <div
            @click="cardItem(index)"
            v-for="(item, index) in ControlConfig.CAttribute.cardItemAttribute.cardItem"
          >
            <!-- 基础卡片 cardBasic -->
            <div v-if="ControlConfig.CAttribute.typeModel === 'cardBasic'">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{item.title}}</span>
                  <el-button style="float: right;" type="text">操作按钮</el-button>
                </div>
                <div v-for="(itemIn,indexIn) in item.contentItem" class="text item" @click="cardContentItem(indexIn)">
                  {{ itemIn.content }}
                </div>
              </el-card>
            </div>
            <!-- 简单卡片 card-->
            <div v-else-if="ControlConfig.CAttribute.typeModel === 'cardSimple'">
              <el-card class="box-card">
                <div v-for="(itemIn,indexIn) in item.contentItem" class="text item" @click="cardContentItem(indexIn)">
                  {{ itemIn.content }}
                </div>
              </el-card>
            </div>
          </div>

          <!-- 带图片卡片 cardImg -->
          <div class="card-img-item"
               @click="cardItem(index)"
               v-if="ControlConfig.CAttribute.typeModel === 'cardImg'"
               v-for="(item, index) in ControlConfig.CAttribute.cardItemAttribute.cardItem"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.imageUrl" class="image">
              <div style="padding: 14px;">
                <span>{{ item.title }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.time }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CCard`,
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
//      点击卡片
      cardItem (currentIndex) {
        this.config.CAttribute.cardCurrent = currentIndex
      },
//      点击卡片中的内容条目
      cardContentItem (currentIndex) {
        this.config.CAttribute.cardItemAttribute.cardContentCurrent = currentIndex
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
          CTitleCN: 'Card卡片', // 标题
          CTitleEN: 'card Control', // 英文标题
          CName: 'CCard', // 控件名称
          labelPositionModel: 'left',
          labelPositionValue: [
            {value: 'left', name: '文字左对齐'},
            {value: 'right', name: '文字右对齐'},
            {value: 'top', name: '文字居上对齐'}
          ],
          labelWidth: 80,
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
            cardItemAttribute: {
              cardItem: [
                {
                  title: '卡片名称1',
                  contentItem: [
                    {
                      content: '卡片内容条目1-1'
                    },
                    {
                      content: '卡片内容条目1-2'
                    }
                  ],
                  time: '2017-10-18', // 卡片时间
                  imageUrl: 'http://image.woshipm.com/wp-files/2017/10/zhibochanpin-1.png!/both/215x140' // 卡片图片
                }
              ],
              addCardItemFlag: false,
              cardContentCurrent: 0   // 点击当前卡片内容条目的当前值
            },
            cardCurrent: 0, // 点击当前卡片的值
            type: [{
              value: 'cardSimple',
              name: '简单卡片'
            }, {
              value: 'cardImg',
              name: '带图片的卡片'
            }, {
              value: 'cardBasic',
              name: '基础卡片'
            }], // input 类型 text number......and so on
            typeModel: 'cardSimple',
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
    width 100%
    margin-bottom 20px

  .item
    margin-bottom 20px

  .CCard
    width: 100%

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
