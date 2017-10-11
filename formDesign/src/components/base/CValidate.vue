<template>
  <div class="CValidate">
    <el-dialog
      title="选择验证规则"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
    >
      <div v-if="regArray != '' && regArray.length > 0">
        <el-checkbox @change="chooseValidate(validate)" v-for="validate in regArray" :key="validate.property" :label="validate.property">
          {{validate.name}}
        </el-checkbox>
      </div>
      {{chooseRes}}
      <span slot="footer" class="dialog-footer">
        <el-button @click="postValidate(false)">取 消</el-button>
        <el-button type="primary" @click="postValidate(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `CValidate`,
    created () {
      this.chooseRes = ''
      this.regArray = []
      this.regArray = this.VALIDATE
    },
    data () {
      return {
        dialogVisible: true,
        chooseRes: '',
        regArray: []
      }
    },
    destroyed () {
      window.setTimeout(() => {
        this.chooseRes = ''
        for (let key in this.regArray) {
          this.regArray[key].status = false
        }
      }, 20)
    },
    methods: {
      handleClose () {
        this.$emit('postValidate', this.chooseRes)
      },
      chooseValidate (item) {
        console.error(item)
        item.status = !item.status
        let RES = []
        for (let key in this.regArray) {
          if (this.regArray[key].status === true) {
            RES.push(this.regArray[key])
          }
        }
        console.error(RES)
        this.chooseRes = RES
      },
      postValidate (status) {
        if (status) {
          if (this.chooseRes === '') {
            this.$message({
              message: '请选择验证规则。',
              type: 'warning'
            })
            return false
          }
        }
        this.$emit('postValidate', this.chooseRes)
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
