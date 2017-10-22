<template>
  <el-form :label-position="ControlConfig.labelPositionModel" :label-width=labelWidthCalc>
    <el-form-item :label="ControlConfig.CTitleCN">

    </el-form-item>
  </el-form>
</template>
<script>

  data=>

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
  ]

  mounted=>

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
  }

  methods=>

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

  computed=>

  computed: {
    labelWidthCalc () {
      if (this.config.labelWidth) {
        return this.config.labelWidth + 'px'
      }
    }
  }

</script>
