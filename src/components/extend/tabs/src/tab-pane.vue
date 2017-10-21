<template>
  <div class="el-tab-pane" v-show="active">
    <slot @click="handleClick"></slot>
  </div>
</template>
<script>
  export default {
    name: 'ExtendTabPane',

    componentName: 'ExtendTabPane',

    props: {
      label: String,
      labelContent: Function,
      name: String,
      closable: Boolean,
      disabled: Boolean,
      click: Function
    },

    data () {
      return {
        index: null
      }
    },

    methods: {
      handleClick (event) {
        console.error(66666)
        // console.warn(`tab-pane handleClick`)
        // this.$emit('click', event)
      }
    },

    computed: {
      isClosable () {
        return this.closable || this.$parent.closable
      },
      active () {
        return this.$parent.currentName === (this.name || this.index)
      }
    },

    mounted () {
      this.$parent.addPanes(this)
    },

    destroyed () {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removePanes(this)
    },

    watch: {
      label () {
        this.$parent.$forceUpdate()
      }
    }
  }
</script>
