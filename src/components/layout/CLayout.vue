<template>
  <div
    class="CLayout"
    @click="commitLayoutConfig()"
    :class="[
      noneChild ? 'noneChild' : ''
    ]"
  >
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
        :class="[
          config.layoutModel === 'percentLayout' ? 'layout-percent' : '',
          config.layoutModel === 'pixelLayout' ? 'layout-pixel' : '',
          config.layoutModel === 'flexLayout' ? 'layout-flex' : '',
          config.layoutModel === 'columnLayout' ? 'layout-col' : ''
        ]"
      >
        <component
          class="block"
          v-if="(children[key].length > 0)&&(children[0].toString() !== childrenDefault[0].toString())"
          v-for="controlItem in children[key]"
          :key="controlItem.config.ControlID"
          :ControlConfig="controlItem.config"
          :ControlID='controlItem.id'
          :is="controlItem.component"
          :children="controlItem.children"
          :childrenDefault="controlItem.childrenDefault"
          :formOBJ="formOBJ"
          :formItem="controlItem"
          @changeTAB="changeTabs"
          :style="[
            controlItem.config.layoutModel === 'percentLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`%`} : null,
            controlItem.config.layoutModel === 'pixelLayout'  && controlItem.config.currentLayout !== null ? {'width' : controlItem.config.currentLayout.default+`px`} : null,
            controlItem.config.layoutModel === 'flexLayout'  && controlItem.config.currentLayout !== null ? {'flex' : controlItem.config.currentLayout.default} : null
          ]"
        >
        </component>
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
      },
      formOBJ: {
        type: Object
      },
      formItem: {
        type: Object
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
    watch: {},
    methods: {
      changeTabs (config) {
        this.$emit('changeTAB', config)
      },
      clickStop (evt) {
        if (this.children.toString() !== this.childrenDefault.toString()) {
          evt.stopPropagation()
          evt.preventDefault()
        }
      },
      commitLayoutConfig () {
        this.formOBJ.mutations.selectObj(this.formOBJ, this.formItem)
        this.$emit('changeTAB', this.formItem)
      },
      destroyDom () {
        console.error(`destroyDom`)
      },
      showAttribute (data, item) {
        this.$emit('getValue', data)
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
      noneChild () {
        let _none = false
        if (this.children) {
          if (this.children[0].length === 0) {
            _none = true
          } else {
            _none = false
          }
          return _none
        } else {
          return _none
        }
      },
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
          layoutModel: 'percentLayout',
          currentLayout: null,
          CLayout: [ // 布局
            { // flex 布局
              type: Number,
              name: '自适应布局',
              default: 1,
              value: 'flexLayout',
              status: false,
              max: 10
            },
            { // 百分比布局
              type: Number,
              name: '百分比布局',
              default: 100,
              value: 'percentLayout',
              status: true,
              max: 100
            },
            { // 像素布局
              type: Number,
              name: '像素布局',
              default: 100,
              value: 'pixelLayout',
              status: false,
              max: null
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
    > div
      margin-bottom 10px

  .CLayout
    margin 11px 0
    extend-click()
    padding -1%
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, .6)
    overflow: auto
    overflow-x hidden
    overflow-y hidden

  .dragBLOCK
    padding 10px

  .noneChild
    min-height 100px
    > .layout, .dragBLOCK
      min-height 100px

</style>
