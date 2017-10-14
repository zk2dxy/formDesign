<template>
  <div class="CIcon">
    <el-dialog
      title="选择图标"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
    >
      <div v-if="IconArray != '' && IconArray.length > 0">
        <span @click="choose(icon)" v-for="icon in IconArray" class="chooseIcon" :class="{'active':icon.status}">
          <i class="icon-block" :title="icon.title" :class="`el-icon-`+icon.className"></i>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postIcon(false)">取 消</el-button>
        <el-button type="primary" @click="postIcon(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CIcon`,
    created () {
      this.chooseRes = '' // 清空选择结果集
      this.IconArray = [] // 清空所有选择集
      this.IconArray = this.I // 赋值图标组
    },
    data () {
      return {
        dialogVisible: true,
        chooseRes: '',
        IconArray: []
      }
    },
    destroyed () {
      window.setTimeout(() => {
        this.chooseRes = ''
        for (let key in this.IconArray) {
          this.IconArray[key].status = false
        }
      }, 20)
    },
    methods: {
      handleClose () {
        this.$emit('postIcon', this.chooseRes)
      },
      choose (item) {
        this.chooseRes = ''
        if (!item.status) {
          for (let key in this.IconArray) {
            this.IconArray[key].status = false
          }
          item.status = !item.status
          if (item.status) {
            this.chooseRes = item
          }
        } else {
          item.status = false
        }
      },
      postIcon (status) {
        if (status) {
          if (this.chooseRes === '') {
            this.$message({
              message: '请选择一个图标。',
              type: 'warning'
            })
            return false
          }
        }
        this.$emit('postIcon', this.chooseRes)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .chooseIcon
    &.active
      background $font-primary
      border-radius 5px
      *
        color #ffffff !important
    display inline-block
    .icon-block
      display inline-block
      padding .3rem
      margin .4rem
      font-size 1.2rem
      cursor pointer
</style>
