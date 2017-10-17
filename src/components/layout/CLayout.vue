<template>
  <div
    class="CLayout"
    @click="commitLayoutConfig()"
    style="margin:5px;"
  >
    <!--
    :class="[
        config.layoutModel === 'percentLayout' ? 'layout-percent' : '',
        config.layoutModel === 'pixelLayout' ? 'layout-pixel' : '',
        config.layoutModel === 'flexLayout' ? 'layout-flex' : '',
        config.layoutModel === 'columnLayout' ? 'layout-col' : ''
      ]"
    :style="[
        config.layoutModel === 'percentLayout'  && getLayoutValue!==null ? {'width' : getLayoutValue+`%`} : null,
        config.layoutModel === 'pixelLayout'  && getLayoutValue!==null ? {'width' : getLayoutValue+`px`} : null,
        config.layoutModel === 'flexLayout'  && getLayoutValue!==null ? {'flex' : getLayoutValue} : null
      ]"
    -->
    <div
      @click="clickStop($event)"
      class="layout" v-if="children.length > 0"
      v-for="(item,key) in children"
    >
      <draggable
        v-if="children&&childrenDefault"
        class="dragBLOCK"
        v-model="children[key]"
        :options="{name:'list',animation: 100,group:{name:'controls'},ghostClass: 'item-block-drag'}"
      >
        <div
          v-if="(children[key].length > 0)&&(children[0].toString() !== childrenDefault[0].toString())"
          v-for="controlItem in children[key]">
          <component
            :ControlConfig="controlItem.config"
            :ControlID='controlItem.id'
            :is="controlItem.component"
            v-model="controlItem.config"
            @getValue="showAttribute($event,controlItem)"
            :children="controlItem.children"
            :childrenDefault="controlItem.childrenDefault"
          >
            <!--{{controlItem}}-->
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
      childrenDefault: Array,
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
      if (this.children) {
        // console.error(JSON.stringify(this.children))
        // console.error(this.children)
      }
      this.$emit('input', this.config)
    },
    watch: {
      'config.currentLayout' (val) {
        console.error(val)
      }
    },
    methods: {
      clickStop (evt) {
        if (this.children.toString() !== this.childrenDefault.toString()) {
          evt.stopPropagation()
          evt.preventDefault()
        }
      },
      commitLayoutConfig () {
        this.config = this.initConfig
        if (this.ControlConfig) {
          this.config = this.ControlConfig
        }
        if (this.ControlID && (!this.config.ControlID)) {
          this.config.ControlID = this.ControlID
        }
        this.$emit('getValue', this.config)
      },
      destroyDom () {
      },
      showAttribute (data, item) {
        this.$emit('getValue', data)
      },
      emitConfig () {
        this.config = this.initConfig
        if (this.ControlConfig) {
          this.config = this.ControlConfig
        }
        if (this.ControlID && (!this.config.ControlID)) {
          this.config.ControlID = this.ControlID
        }
        this.$emit('getValue', this.config)
      }
    },
    computed: {
      getLayoutValue () {
        if (this.config.CLayout === '') {
          return null
        }
        let value = null
        for (let key in this.config.CLayout) {
          // console.info(this.config)
          if (this.config.CLayout[key].status === false) {
            continue
          } else {
            value = this.config.CLayout[key].default
            break
          }
        }
        // this.$emit('getValue', this.config)
        if (value === null) {
          return value
        } else {
          return value
        }
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

  .layout-flex
    display flex

  .layout-pixel
    display block

  .layout-col
    display block

  .layout-percent
    display block
    > div
      float left

  .dragBLOCK
    margin 10px
    > div
      margin-bottom 10px

  .CLayout
    extend-click()
    padding 5px
    min-height 200px
    border 1px dashed $font-primary

  .layout
    min-height 200px

  .dragBLOCK
    min-height 200px

</style>
