<template>
  <div class="CTimePicker" @click="showAttr()">
    <div v-if="config && (!ControlID)">
      <div class="title">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'CTimePicker',
    props: {
      ControlConfig: {
        type: Object
      },
      ControlID: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        initConfig: {
          ControlId: '',
          CBelong: 'form',
          CTitleCN: '时间选择器', // 标题
          CTitleEN: 'TimePicker', // 英文标题
          CName: 'CTimePicker',
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
          }，
          CAttribute: {
            editable: true, // 文本框是否可输入
            clearable: true, // 是否显示清楚按钮
            fixTime: false // 是否为固定
          }
        }
      }
    }
  }
</script>
