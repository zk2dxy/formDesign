<template>
  <div class="HelloWorld">
    <div class="leftControlArea" v-if="ControlList!=null" v-for="container in ControlList">
      <draggable
        v-model="container.controls"
        :options="{group:{name:'controls',pull:'clone', put: false},animation: 0,ghostClass: 'ghost-none'}"
        :clone="formClone"
      >
        <div class="item" v-if="container.controls" v-for="controlItem in container.controls">
          <div class="singleControl" :key="controlItem.CNameCN">
            <el-button icon="circle-check">
              {{controlItem.CNameCN}}
            </el-button>
            <component
              class="opacity0 hidden"
              v-model="controlItem.config"
              :is="controlItem.component"
            >
            </component>
          </div>
        </div>
      </draggable>
    </div>
    <div class="formContainer">
      <draggable
        v-model="list"
        :options="{name:'list',animation: 200,group:{name:'controls'},ghostClass: 'item-block-drag'}"
        style="min-height: 200px;"
      >
        <div v-if="list" v-for="controlItem in list" class="item">
          <component
            :ControlConfig="controlItem.config"
            :ControlID='controlItem.id'
            :is="controlItem.component"
            v-model="controlItem.config"
            @getValue="showAttribute"
          >
          </component>
        </div>
      </draggable>
      {{list}}
    </div>
    <div class="rightControlArea">
      <control-config-pyy v-if="Config.CConfig" :config="Config.CConfig" @changeConfig="changeView"></control-config-pyy>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  import uuid from 'node-uuid'

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
    },
    mounted () {},
    watch: {
      list (val, oldVal) {}
    },
    methods: {
      destroyDom () {
        // console.error(`destroyDom`)
      },
      formClone (originData) {
        let newObj = this.L.cloneDeep(originData)
        newObj.id = uuid.v4()
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
                CNameCN: '单选框',
                CNameEN: 'radio',
                parent: 'form', // 父级对象
                type: 'radio', // 类型
                component: 'CRadio',
                config: '' // 控件配置,
              }, {
                CNameCN: '多选框',
                CNameEN: 'checkbox',
                parent: 'form', // 父级对象
                type: 'checkbox', // 类型
                component: 'CCheckbox',
                config: '' // 控件配置,
              }, {
                CNameCN: '选择器',
                CNameEN: 'select',
                parent: 'form', // 父级对象
                type: 'select', // 类型
                component: 'CSelect',
                config: '' // 控件配置,
              }
            ]
          }
        }
      },
      showAttribute (config) {
        this.Config.CConfig = config
        this.destroyDom()
      },
      changeView (config) {
        // console.error(config)
      }
    },
    computed: {}
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
        float left
        display block

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
