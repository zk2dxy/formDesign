<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
        <div v-if="index === 'CTitleCN'">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CTitleEN'">
          <p>英文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CAttribute'">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === 'currentValue'">
              <div>
                <p>面板标题</p>
                <el-input @change="changeConfig()" v-model="config[index].collapseItem[itemIn].title"></el-input>
              </div>
              <div>
                <p>面板内容</p>
                <el-input @change="changeConfig()" v-model="config[index].collapseItem[itemIn].content"></el-input>
              </div>
              <!--<div>-->
                <!--<p>唯一标识符</p>-->
                <!--<el-input @change="changeConfig()" v-model="config[index].collapseItem[itemIn].name"></el-input>-->
              <!--</div>-->
            </div>
            <div v-else-if="indexIn === 'description'">
              <p>控件描述</p>
              <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'addCollapseStatus'">
              <el-button type="primary" @click="addItem()"><i class="el-icon-plus"></i></el-button>
              <el-dialog :visible.sync="config.CAttribute.addCollapseStatus" :show-close="false">
                <h4 slot="title">添加：</h4>
                <el-input class="collapseItemIput" v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].name" placeholder="唯一标识符"></el-input>
                <el-input class="collapseItemIput" v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].title" placeholder="面板标题"></el-input>
                <el-input class="collapseItemIput" v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].content" placeholder="面板内容"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="closeCollapseDialog(false)">取 消</el-button>
                  <el-button type="primary" @click="closeCollapseDialog(true)">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
        <div v-else-if="index === 'Icon'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="iconStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
          </div>
          <div v-if="item.status">
            <div>
              <el-button @click="chooseIcon(item)" type="primary" size="small" icon="edit">添加图标</el-button>
              <c-icon @postIcon="setIcon" v-if="item.chooseStatus"></c-icon>
            </div>
          </div>
        </div>
        <div v-else-if="index === 'CValidate'">
          <!--{{item}}-->
          <div>
            <el-checkbox @change="validateStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
          </div>
          <div v-if="item.status">
            <div>
              <el-button @click="chooseValidate(item)" type="primary" size="small" icon="edit">选择验证规则</el-button>
              <c-validate @postValidate="setValidate" v-if="item.chooseStatus"></c-validate>
            </div>
          </div>
        </div>
        <hr class="hrLine" style="border-top:0; border-right:0;border-left:0; border-bottom:1px solid red">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'ControlConfigXyl',
    props: ['config'],
    destroy () {
      console.info(`destroy`)
    },
    methods: {
      changeConfig () {
        this.$emit('changeConfig', this.config)
      },
      chooseIcon (item) {
        item.chooseStatus = !item.chooseStatus
        window.iconOBJ = item
      },
//      添加条目
      addItem () {
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
        this.config.CAttribute.collapseItem.push({name: '', title: '', content: ''})
      },
//      关闭对话框
      closeCollapseDialog ($flag) {
        if ($flag === false) {
          this.config.CAttribute.collapseItem.pop()
        }
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
      },
      setIcon (chooseRes) {
        if (chooseRes !== '') {
          window.iconOBJ.className = chooseRes.className
          window.iconOBJ.content = chooseRes.content
          window.iconOBJ.title = chooseRes.title
          window.iconOBJ.library = chooseRes.library
          window.iconOBJ.positionModel = 'right'
        }
        window.iconOBJ.chooseStatus = false
      },
      iconStatusChange (item) {
        if (!item.status) {
          item.className = ''
          item.content = ''
          item.title = ''
          item.library = ''
          this.config.CAttribute.positionModel = ''
        }
      },
      chooseValidate (item) {
        item.chooseStatus = !item.chooseStatus
        window.validateOBJ = item
      },
      setValidate (chooseRes) {
        console.error(chooseRes)
        if (chooseRes !== '') {
          window.validateOBJ.validateModel = chooseRes
        }
        window.validateOBJ.chooseStatus = false
      },
      validateStatusChange (item) {
        if (!item.status) {
          this.config.CValidate.validateModel = ''
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .ControlConfig
    p
      padding 0
      margin 0
      margin-bottom 5px
    .collapseItemInput
      margin-bottom 10px
</style>
