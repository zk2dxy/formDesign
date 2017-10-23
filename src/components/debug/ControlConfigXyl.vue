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
            <!-- create by Arlene start-->
            <!--Collapse折叠面板-->
            <div v-if="indexIn === 'currentValue' && config.CAttribute.typeModel === 'collapse'">
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
            <!--Card卡片-->
            <div v-else-if="indexIn === 'cardCurrent'">
              <!--卡片标题-->
              <div v-if="config.CAttribute.typeModel === 'cardBasic' || config.CAttribute.typeModel === 'cardImg'">
                <p>控件标题</p>
                <el-input type="text"
                          @change="changeConfig()"
                          placeholder="控件标题"
                          v-model="config[index].cardItemAttribute.cardItem[itemIn].title"
                ></el-input>
              </div>
              <!--card 内容条目修改-->
              <div v-for="(cardItem, cardIndex) in item.cardItemAttribute">
                <div v-if="cardIndex === 'cardContentCurrent' && config.CAttribute.typeModel !== 'cardImg'">
                  <p>控件内容</p>
                  <el-input type="text"
                            @change="changeConfig()"
                            placeholder="控件内容"
                            v-model="config[index].cardItemAttribute.cardItem[itemIn].contentItem[cardItem].content"
                  >
                  </el-input>
                  <!--添加当前卡片内容条目-->
                  <div>
                    <el-button type="primary" size="medium" @click="addCardItem">添加卡片内容<i class="el-icon-plus"></i></el-button>
                    <el-dialog :visible.sync="config[index].cardItemAttribute.addCardItemFlag" :show-close="false">
                      <h4 slot="title">添加：</h4>
                      <el-input
                        placeholder="卡片内容"
                        v-model.trim="item.cardItemAttribute.cardItem[itemIn].contentItem[item.cardItemAttribute.cardItem[itemIn].contentItem.length - 1].content"></el-input>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="closeCardDialog(false)">取 消</el-button>
                        <el-button type="primary" @click="closeCardDialog(true)">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </div>
                <div v-if="cardIndex === 'cardContentCurrent' && config.CAttribute.typeModel === 'cardImg'">
                  <div>
                    <p>控件时间</p>
                    <el-input type="text"
                              @change="changeConfig()"
                              placeholder="控件时间"
                              v-model="config[index].cardItemAttribute.cardItem[itemIn].time"
                    >
                    </el-input>
                  </div>
                  <div>
                    <div class="card-modify-img">
                      <el-upload class="avatar-uploader"
                                 :action="cardUploadImgUrl"
                                 :show-file-list="false"
                                 :on-success="handleAvatarSuccess">
                        <img :src="cardImageUrl" class="avatar" style="display: none;">
                        <el-button type="primary" size="medium">修改当前卡片图片<i class="el-icon-edit"></i></el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="indexIn === 'addCollapseStatus'">
              <el-button type="primary" @click="addItem()">添加面板条目<i class="el-icon-plus"></i></el-button>
              <el-dialog :visible.sync="config.CAttribute.addCollapseStatus" :show-close="false">
                <h4 slot="title">添加：</h4>
                <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].name" placeholder="唯一标识符"></el-input>
                <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].title" placeholder="面板标题"></el-input>
                <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].content" placeholder="面板内容"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="closeCollapseDialog(false)">取 消</el-button>
                  <el-button type="primary" @click="closeCollapseDialog(true)">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <!--Loading加载-->
            <div v-else-if="indexIn === 'loadingText'">
              <p>加载文本</p>
              <el-input type="text" @change="changeConfig()" placeholder="加载文本"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <!--page分页-->
            <div v-else-if="indexIn === 'pageSmall'">
              <p>是否使用小型分页样式</p>
              <el-radio-group v-model="config[index][indexIn]">
                <el-radio :key="radio.value" v-for="radio in config[index].pageSmallList" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'pageSize'">
              <div v-if="config[index].typeModel === 'pageBasic' ||
                            config[index].typeModel === 'pageTotal' ||
                            config[index].typeModel === 'pageDirect'">
                <p>分页页数</p>
                <el-input type="text" @change="changeConfig()" placeholder="分页页数"
                          v-model.number="config[index][indexIn]"></el-input>
              </div>

            </div>
            <div v-else-if="indexIn === 'pageCurrent'">
              <p>当前页数</p>
              <el-input type="text" @change="changeConfig()" placeholder="当前页数"
                        v-model.number="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'pageTotal'">
              <p>总条目数</p>
              <el-input type="text" @change="changeConfig()" placeholder="总条目数"
                        v-model.number="config[index][indexIn]"></el-input>
            </div>
            <!--Cascader 级联-->
            <div v-else-if="indexIn === 'showAllLevels'">
              <p>是否显示完整路径</p>
              <el-radio-group v-model="config[index].showAllLevelFlag">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'filterableOption'">
              <p>是否可搜索选项</p>
              <el-radio-group v-model="config[index].filterable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'changeOnSelectOption'">
              <p>是否允许选择任意一级的选项</p>
              <el-radio-group v-model="config[index].changeOnSelect">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'cascadeSizeOption'">
              <p>尺寸</p>
              <el-radio-group v-model="config[index].cascadeSize">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'cascadePlaceholder'">
              <p>控件提示语</p>
              <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <!--upload上传-->
            <div v-else-if="indexIn === 'uploadCurrent'">
              <div>
                <p>上传说明</p>
                <el-input type="text" @change="changeConfig()" placeholder="上传说明"
                          v-model="config[index].uploadFileDesc"></el-input>
              </div>
              <div v-if="config[index].typeModel === 'uploadClick' ||
                         config[index].typeModel === 'uploadAvatar' ||
                         config[index].typeModel === 'uploadDrag' ||
                         config[index].typeModel === 'uploadManual'">
                <p>是否显示已上传文件列表</p>
                <el-radio-group v-model="config[index].uploadShowFileFlag">
                  <el-radio :key="radio.optionFlag" v-for="radio in config[index].uploadShowFileList[itemIn].option" :label="radio.optionFlag">
                    {{radio.label}}
                  </el-radio>
                </el-radio-group>
              </div>
              <!--<div>-->
              <!--<p>是否启用拖拽上传</p>-->
              <!--<el-radio-group v-model="config[index].uploadDrag">-->
              <!--<el-radio :key="radio.dragFlag" v-for="radio in config[index].uploadDragList[itemIn].drag" :label="radio.dragFlag">-->
              <!--{{radio.label}}-->
              <!--</el-radio>-->
              <!--</el-radio-group>-->
              <!--</div>-->
              <div v-if="config[index].typeModel !== 'uploadAvatar'">
                <p>是否支持多选文件</p>
                <el-radio-group v-model="config[index].uploadMultiple">
                  <el-radio :key="radio.multipleFlag" v-for="radio in config[index].uploadMultipleList[itemIn].multiple" :label="radio.multipleFlag">
                    {{radio.label}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <!-- End-->
            <div v-else-if="indexIn === 'type'">
              <p>控件类型</p>
              <el-radio-group v-model="config[index].typeModel">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="indexIn === 'description'">
              <p>控件描述</p>
              <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
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
        <div v-else-if="index === 'CKey'">
          <!--{{item}}-->
          <div v-for="(itemIn,indexIn) in item">
            <div v-if="indexIn === 'default'">
              <p>默认值</p>
              <el-input @change="changeConfig()" placeholder="控件默认值"
                        v-model="config[index][indexIn]"></el-input>
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
    data () {
      return {
        cardImageUrl: '',
        cardUploadImgUrl: 'https://jsonplaceholder.typicode.com/posts/'
      }
    },
    methods: {
      changeConfig () {
        this.$emit('changeConfig', this.config)
      },
      chooseIcon (item) {
        item.chooseStatus = !item.chooseStatus
        window.iconOBJ = item
      },
//      添加collapse条目
      addItem () {
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
        this.config.CAttribute.collapseItem.push({name: '', title: '', content: ''})
      },
//      关闭collapse对话框
      closeCollapseDialog ($flag) {
        if ($flag === false) {
          this.config.CAttribute.collapseItem.pop()
        }
        this.config.CAttribute.addCollapseStatus = !this.config.CAttribute.addCollapseStatus
      },
//      添加card内容条目
      addCardItem () {
        let parentAttribute = this.config.CAttribute
        let currentVal = parentAttribute.cardCurrent
        parentAttribute.cardItemAttribute.addCardItemFlag = !parentAttribute.cardItemAttribute.addCardItemFlag
        parentAttribute.cardItemAttribute.cardItem[currentVal].contentItem.push({content: ''})
      },
//      关闭card对话框
      closeCardDialog ($flag) {
        let parentAttribute = this.config.CAttribute
        let currentVal = parentAttribute.cardCurrent
        if ($flag === false) {
          parentAttribute.cardItemAttribute.cardItem[currentVal].contentItem.pop()
        }
        parentAttribute.cardItemAttribute.addCardItemFlag = !parentAttribute.cardItemAttribute.addCardItemFlag
      },
//      修改card图片
      handleAvatarSuccess (res, file) {
        this.cardImageUrl = URL.createObjectURL(file.raw)
        this.config.CAttribute.cardUploadFlag = true
        this.config.CAttribute.cardItemAttribute.cardItem[this.config.CAttribute.cardCurrent].imageUrl = this.cardImageUrl
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
