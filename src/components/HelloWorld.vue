<template>
  <div class="HelloWorld">
    <div class="leftControlArea" v-if="ControlList!=null" v-for="container in ControlList">
      <draggable
        v-model="container.controls"
        :options="{group:{name:'controls',pull:'clone', put: false}, animation: 0, ghostClass: 'ghost-none', sort:false}"
        :clone="formClone"
      >
        <div
          class="item"
          v-if="container.controls"
          v-for="controlItem in container.controls"
        >
          <div class="singleControl" :key="controlItem.CNameCN">
            <el-button icon="circle-check">
              {{controlItem.CNameCN}}
            </el-button>
            <component
              class="opacity0 hidden"
              :ControlID='controlItem.id'
              v-model="controlItem.config"
              :is="controlItem.component"
            >
            </component>
            <!--{{controlItem}}-->
          </div>
        </div>
      </draggable>
    </div>
    <div class="formContainer">
      <!--布局容器-->
      <draggable
        v-model="list"
        :options="{name:'list',animation: 100,group:{name:'controls'},ghostClass: 'item-block-drag'}"
        style="min-height: 200px;"
        :class=layoutClass
      >
        <div
          v-if="list"
          v-for="controlItem in list"
          class="item"
        >
          <!--
          :class="[
            controlItem.config.layoutModel === 'percentLayout' ? 'layout-percent' : '',
            controlItem.config.layoutModel === 'pixelLayout' ? 'layout-pixel' : '',
            controlItem.config.layoutModel === 'flexLayout' ? 'layout-flex' : '',
            controlItem.config.layoutModel === 'columnLayout' ? 'layout-col' : ''
          ]"
          -->
          <component
            :ControlConfig="controlItem.config"
            :ControlID='controlItem.id'
            :is="controlItem.component"
            v-model="controlItem.config"
            @getValue="showAttribute($event,controlItem)"
            :children="controlItem.children"
            :childrenDefault="controlItem.childrenDefault"
          >
          </component>
        </div>
      </draggable>
      {{list}}
    </div>
    <div class="rightControlArea">
      <control-config
        v-if="Config.CConfig"
        :config="Config.CConfig"
        @changeConfig="changeView"
      ></control-config>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'
  import { calcLayoutClass } from '@/assets/js/common'

  export default {
    components: {
      draggable
    },
    name: `HelloWorld`,
    data () {
      return {
        list: [],
        ControlList: null,
        Config: {
          FConfig: '',
          CConfig: ''
        }
      }
    },
    created () {
      this.loadAllControls()
      // console.error(this.I)
      console.error(calcLayoutClass)
    },
    mounted () {
    },
    watch: {
      list (val, oldVal) {
      }
    },
    methods: {
      destroyDom () {
        // console.error(`destroyDom`)
      },
      formClone (originData) {
        let newObj = this.L.cloneDeep(originData)
        let _uuid = uuid.v4()
        newObj.id = _uuid
        return newObj
      },
      loadAllControls () {
        this.ControlList = {
          form: {
            title: '表单容器',
            name: 'form',
            containerConfig: {
              layout: ['flex', 'pixed', 'percent', 'column'], // 布局配置
              workflow: [], // 工作流配置
              dataOrigin: [], // 数据来源配置
              config: [] // 自身配置
            }, // 容器配置
            controls: [
              {
                CNameCN: '输入框',
                CNameEN: 'input',
                parent: 'form', // 父级对象
                type: 'input', // 类型
                component: 'CInput',
                config: '' // 控件配置,
              },
              {
                CNameCN: '布局控件',
                CNameEN: 'layout',
                parent: 'form', // 父级对象
                type: 'layout', // 类型
                component: 'CLayout',
                config: '', // 控件配置
                children: [[]], // 绑定值props
                childrenDefault: [[]]
              }
            ]
          }
        }
      },
      showAttribute (data, item) {
        this.Config.CConfig = data
      },
      changeView (config) {
        console.warn(`config =>`)
        console.warn(JSON.stringify(config))
      }
    },
    computed: {
      layoutClass () {
        return calcLayoutClass(this.list)
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

  .dragBLOCK
    min-height 200px
    background lightpink
    > div
      margin-bottom 10px

  .HelloWorld
    > div
      float left
      min-height 200px
    .leftControlArea
      width 20%
      margin-right 2.5%
      > div
        display flex
        .singleControl
          flex 0 46%
          margin 0 2%
          *
            width 100%
    .formContainer
      width 55%
    .rightControlArea
      width 20%
      margin-left 2.5%
    .draggable
      min-height 200px

  .item
    margin 20px 0
</style>
