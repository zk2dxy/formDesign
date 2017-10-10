<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    size ? 'el-input--' + size : '',
    {
      'is-disabled': disabled,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="el-input__inner" style="padding:0; position: relative; height: auto">
        <!-- input 图标 -->
        <slot name="icon">
          <i class="el-input__icon"
             :class="[
            'el-icon-' + icon,
            onIconClick ? 'is-clickable' : '',
            position !== '' ? (position === 'right' ? 'inner_right' : 'inner_left') : ''
          ]"
             v-if="icon"
             @click="handleIconClick">
          </i>
        </slot>
        <input
          style="border:none"
          v-if="type !== 'textarea'"
          class="el-input__inner"
          v-bind="$props"
          :autocomplete="autoComplete"
          :value="currentValue"
          ref="input"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          :class="[
            position !== '' ? (position === 'right' ? 'inner_right' : 'inner_left') : ''
          ]"
        />
        <i
          class="el-input__icon el-icon-loading" v-if="validating"
        ></i>
      </div>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="el-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur">
    </textarea>
  </div>
</template>
<script>
  import emitter from 'element-ui/src/mixins/emitter'
  import calcTextareaHeight from './calcTextareaHeight'
  import merge from 'element-ui/src/utils/merge'

  export default {
    name: 'ExtendInput',

    componentName: 'ExtendInput',

    mixins: [emitter],

    data () {
      return {
        currentValue: this.value,
        textareaCalcStyle: {}
      }
    },

    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      onIconClick: Function,
      position: {
        type: String,
        default: 'right'
      }
    },

    computed: {
      validating () {
        return this.$parent.validateState === 'validating'
      },
      textareaStyle () {
        return merge({}, this.textareaCalcStyle, {resize: this.resize})
      }
    },

    watch: {
      'value' (val, oldValue) {
        this.setCurrentValue(val)
      }
    },

    methods: {
      handleBlur (event) {
        this.$emit('blur', event)
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue])
        }
      },
      inputSelect () {
        this.$refs.input.select()
      },
      resizeTextarea () {
        if (this.$isServer) return
        var {autosize, type} = this
        if (!autosize || type !== 'textarea') return
        const minRows = autosize.minRows
        const maxRows = autosize.maxRows

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
      },
      handleFocus (event) {
        this.$emit('focus', event)
      },
      handleInput (event) {
        const value = event.target.value
        this.$emit('input', value)
        this.setCurrentValue(value)
        this.$emit('change', value)
      },
      handleIconClick (event) {
        if (this.onIconClick) {
          this.onIconClick(event)
        }
        this.$emit('click', event)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return
        this.$nextTick(_ => {
          this.resizeTextarea()
        })
        this.currentValue = value
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value])
        }
      }
    },

    created () {
      this.$on('inputSelect', this.inputSelect)
    },

    mounted () {
      this.resizeTextarea()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/variable.styl"
  input
    &.inner_right
      padding-right 35px
      padding-left 10px
    &.inner_left
      padding-right 10px
      padding-left 35px

  i
    &.inner_right
      right 0
      left inherit
    &.inner_left
      right inherit
      left 0
</style>
