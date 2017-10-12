<template>
  <div class="CLayout" @click="commitLayoutConfig()">
    <div @click.stop class="layout" v-if="children.length > 0" v-for="(item,key) in children">
      <draggable
        class="dragBLOCK"
        v-model="children[key]"
        :options="{name:'list',animation: 200,group:{name:'controls'},ghostClass: 'item-block-drag'}"
      >
        <div v-if="children[key].length > 0" v-for="controlItem in children[key]">
          <component
            :ControlConfig="controlItem.config"
            :ControlID='controlItem.id'
            :is="controlItem.component"
            v-model="controlItem.config"
            @getValue="showAttribute($event,controlItem)"
            :children="controlItem.children"
          >
          </component>
        </div>
      </draggable>
      <!--{{children}}-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'

  export default {
    name: `CLayout`,
    components: {
      draggable
    },
    props: {
      children: Array,
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
    watch: {
      'children' (val) {
        // console.error(val)
      }
    },
    methods: {
      commitLayoutConfig () {
        this.$emit(`getValue`, this.config)
      },
      destroyDom () {},
      showAttribute (data, item) {
        console.error(data)
        item.config = data
        this.$emit(`getValue`, data)
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
          CBelong: 'form',
          CTitleCN: '布局控件', // 标题
          CTitleEN: 'layout Control', // 英文标题
          CName: 'CLayout', // 控件名称
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
            height: '', // 高度
            vertical: ['top', 'middle', 'bottom'] // 对齐方式
          },
          CKey: { // 控件值
            default: '', // 默认值
            type: '', // 控件值类型
            keyMethods: '' // 计算控件值方法
          },
          CValidate: {
            status: false,
            chooseStatus: false,
            validateModel: ''
          }
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
  .dragBLOCK
    > div
      margin-bottom 10px

  .CLayout
    extend-click()
    display flex
    padding 11px 15px
    min-height 200px
    border 1px dashed $font-primary

  .layout
    flex 1
    min-height 100px

  .dragBLOCK
    min-height 100px

</style>
