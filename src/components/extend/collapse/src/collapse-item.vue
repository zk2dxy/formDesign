<template>
  <div class="el-collapse-item" :class="{'is-active': isActive}">
    <div class="el-collapse-item__header" @click="handleHeaderClick">
      <i class="el-collapse-item__header__arrow el-icon-arrow-right"></i>
      <slot name="title">
        {{title}}
      </slot>
      <i class="header-icon"
         :class="[
            'el-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
         v-if="icon"
         @click="handleIconClick">
      </i>
    </div>
    <el-collapse-transition>
      <div class="el-collapse-item__wrap" v-show="isActive">
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
  import ElCollapseTransition from './collapse-transition'
  import Emitter from '@/components/extend/emitter'
  export default {
    name: 'ExtendCollapseItem',
    componentName: 'ExtendCollapseItem',
    mixins: [Emitter],
    components: { ElCollapseTransition },
    data () {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0
      }
    },
    props: {
      title: String,
      name: {
        type: [String, Number],
        default () {
          return this._uid
        }
      },
      onIconClick: Function,
      icon: String
    },
    computed: {
      isActive () {
        return this.$parent.activeNames.indexOf(this.name) > -1
      }
    },
    watch: {
      'isActive' (value) {
      }
    },
    methods: {
      handleHeaderClick () {
        this.dispatch('ExtendCollapse', 'item-click', this)
        this.$emit('click', this)
      },
      handleIconClick (event) {
        if (this.onIconClick) {
          this.onIconClick(event)
        }
        this.$emit('click', event)
      }
    },
    mounted () {
    }
  }
</script>
