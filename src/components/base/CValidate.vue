<template>
  <div class="CValidate">
    <el-dialog
      title="选择验证规则"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
    >
      <div v-if="regArray != '' && regArray.length > 0">
        <el-checkbox-group v-model="checkList">
          <el-checkbox @change="chooseValidate(validate)"
                       v-for="validate in regArray"
                       :key="validate.property"
                       :label="validate.property"
          >
            {{validate.name}}
          </el-checkbox>
        </el-checkbox-group>
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
    props: {
      getValidate: {
        type: Object
      }
    },
    created () {
      this.chooseRes = this.getValidate.validateModel
      this.regArray = []
      this.regArray = this.VALIDATE
      let validateModel = this.getValidate.validateModel
      for (let i in validateModel) {
        this.checkList.push(validateModel[i].property)
        validateModel[i].status = true
      }
    },
    data () {
      return {
        dialogVisible: true,
        chooseRes: '',
        regArray: [],
        checkList: []
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
        this.getValidate.chooseStatus = false
      },
      chooseValidate (item) {
        item.status = !item.status
        let RES = []
        for (let key in this.regArray) {
          if (this.regArray[key].status === true) {
            RES.push(this.regArray[key])
          }
        }
//        console.error(RES)
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
          } else {
            this.$emit('postValidate', this.chooseRes)
          }
        } else {
          this.dialogVisible = false
          this.getValidate.chooseStatus = false
        }
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
