<template>
  <div class="CLayout" @click.stop="commitLayoutConfig()">
    <div class="layout" v-if="children.length > 0" v-for="(item,key) in children">
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
          >
          </component>
        </div>
      </draggable>
      {{children}}
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
      children: Array
    },
    created () {
      // console.error('CLayout Created')
    },
    watch: {
      'children' (val) {
        console.error(val)
      }
    },
    methods: {
      commitLayoutConfig () {
        console.info(`commitLayoutConfig`)
      },
      destroyDom () {},
      showAttribute (data, item) {
        console.error('item.config=>')
        console.error(item.config)
        console.error('Layout config=>')
        console.error(data)
        item.config = data
        this.destroyDom()
        this.$emit(`getValue`, data)
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
        Config: {
          FConfig: '',
          CConfig: ''
        },
        config: null
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .dragBLOCK
    background red
    > div
      margin-bottom 10px

  .CLayout
    display flex
    padding 11px 15px
    min-height 200px
    border 1px dashed $font-primary

  .layout
    flex 1
    min-height 200px

  .dragBLOCK
    min-height 200px

</style>
