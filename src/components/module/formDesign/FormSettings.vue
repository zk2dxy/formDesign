<template>
  <div class="ControlConfig">
    <ul class="typeBox">
      <li @click="changeTab('formSetting')" class="items" :class="[
        activeJudge === true ? 'active' : ''
      ]">
        表单属性
      </li>
      <li @click="changeTab('controlSetting')" class="items" :class="[
        activeJudge === false ? 'active' : ''
      ]">
        控件属性
      </li>
    </ul>
    <div class="controlAttribute">
      <!--表单设置 start-->
      <div v-if="activeJudge">
        <el-form class="controlElForm" label-position="right" label-width="70px">
          <el-form-item
            class="lineRow"
            label="设置标题"
          >
            <el-input
              @change="changeFConfig"
              placeholder="请输入标题"
              v-model="fConfig.title"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="lineRow"
            label="设置描述"
          >
            <el-input
              type="textarea"
              placeholder="表单描述"
              v-model="fConfig.description"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div><!--表单设置 ended-->
      <!--控件属性设置 start-->
      <div v-else-if="!activeJudge && config" class="configSetting">
        <div v-for="(item , index) in config">
          <!--标题 start-->
          <div v-if="index === 'CTitleCN'">
            <el-form label-position="left" label-width="70px">
              <el-form-item
                class="lineRow"
                label="控件标题"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件标题"
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--标题ended-->
          <!--英文标题start-->
          <div v-else-if="index === 'CTitleEN'">
            <el-form label-position="left" label-width="70px">
              <el-form-item
                class="lineRow"
                label="英文标题"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件英文标题"
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--英文标题ended-->
          <!--文字对齐方式 start-->
          <div v-else-if="index === 'labelPositionModel'">
            <el-form label-position="top">
              <el-form-item
                class="lineRow"
                label="对齐方式"
              >
                <el-radio-group v-model="config[index]">
                  <el-radio
                    v-if="config.labelPositionValue.length > 0"
                    :key="radio.value"
                    v-for="radio in config.labelPositionValue"
                    :label="radio.value"
                  >
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div><!--文字对齐方式 ended-->
          <!--控件标题宽度 start-->
          <div v-else-if="index === 'labelWidth' && config.labelPositionModel !== 'top'">
            <el-form label-position="right" label-width="70px">
              <el-form-item
                class="lineRow"
                label="标题宽度"
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder='单位像素'
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--控件 标题宽度 ended-->
          <!--增加选项 start-->
          <div v-else-if="index === 'CName'&& (item === 'CRadio' || item === 'CCheckbox' || item === 'CSelect')">
            <el-form label-position="left" label-width="70px">
              <el-form-item
                class="lineRow"
                label="增加选项"
              >
                <el-button type="primary" @click="AddItem()"><i class="el-icon-plus"></i></el-button>
              </el-form-item>
              <el-dialog
                :visible.sync="config.CAttribute.addStatus"
                :show-close="false">
                <h4 slot="title">输入单选项属性：</h4>
                <el-form
                  :model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1]"
                  :rules="rulesAdd"
                  v-if="item === 'CRadio'">
                  <el-form-item prop="label">
                    <el-input v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label"
                              placeholder="选项值" class="input__inner"></el-input>
                  </el-form-item>
                </el-form>
                <div v-if="config.CAttribute.typeModel !== 'selectGroup'">
                  <el-input
                    v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label" placeholder="选项值"
                    class="input__inner"
                    v-if="item !== 'CRadio'"
                  ></el-input>
                  <div class="DivForLine"></div>
                  <el-input
                    v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].showContent"
                    placeholder="选项显示内容"
                  ></el-input>
                </div>
                <div v-if="config.CAttribute.typeModel === 'selectGroup'">
                  <el-select
                    v-model="selectedGroup.label"
                    filterable
                    allow-create
                    placeholder="请选择或新建分组">
                    <el-option
                      v-for="item in config.CAttribute.itemAttrSelectGroup"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"></el-option>
                  </el-select>
                  <el-input
                    v-model="selectedGroup.options.label"
                    placeholder="选项值"></el-input>
                  <el-input
                    v-model="selectedGroup.options.showContent"
                    placeholder="选项显示内容"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="HandleClose('')">取 消</el-button>
                    <el-button type="primary" @click="HandleClose('true')">确 定</el-button>
                  </span>
              </el-dialog>
            </el-form>
          </div><!--增加选项 ended-->
          <!--基本属性 start-->
          <div v-else-if="index === 'CAttribute'">
            <div v-for="(itemIn, indexIn) in item">
              <!--折叠面板标题 start-->
              <div v-if="indexIn === 'currentValue' && config.CAttribute.typeModel === 'collapse'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="面板标题"
                  >
                    <el-input
                      @change="changeConfig()"
                      v-model="config[index].collapseItem[itemIn].title"
                      placeholder="请输入标题"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="面板内容"
                  >
                    <el-input
                      @change="changeConfig()"
                      v-model="config[index].collapseItem[itemIn].content"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div> <!--折叠面板标题 ended-->
              <!--Card卡片 start-->
              <div v-else-if="index === 'cardCurrent'">
                <!--卡片标题 start-->
                <div v-if="config.CAttribute.typeModel === 'cardBasic' || config.CAttribute.typeModel === 'cardImg'">
                  <el-form label-position="right" label-width="70px">
                    <el-form-item
                      class="lineRow"
                      label="卡片标题"
                    >
                      <el-input
                        type="text"
                        @change="changeConfig()"
                        v-model="config[index].cardItemAttribute.cardItem[itemIn].title"
                        placeholder="卡片标题"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div> <!--卡片标题 ended-->
                <!--card 内容条目修改-->
                <div v-for="(cardItem, cardIndex) in item.cardItemAttribute">
                  <div v-if="cardIndex === 'cardContentCurrent' && config.CAttribute.typeModel !== 'cardImg'">
                    <el-form label-position="right" label-width="70px">
                      <el-form-item
                        class="lineRow"
                        label="控件内容"
                      >
                        <el-input type="text"
                                  @change="changeConfig()"
                                  placeholder="控件内容"
                                  v-model="config[index].cardItemAttribute.cardItem[itemIn].contentItem[cardItem].content"
                        >
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <!--添加当前卡片内容条目-->
                    <div>
                      <el-button type="primary" size="medium" @click="addCardItem">添加卡片内容<i class="el-icon-plus"></i>
                      </el-button>
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
                    <el-form label-position="right" label-width="70px">
                      <el-form-item
                        class="lineRow"
                        label="控件时间"
                      >
                        <el-input type="text"
                                  @change="changeConfig()"
                                  placeholder="控件时间"
                                  v-model="config[index].cardItemAttribute.cardItem[itemIn].time"
                        >
                        </el-input>
                      </el-form-item>
                    </el-form>
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
              </div><!--Card卡片 ended-->
              <!--addCollapseStatus start-->
              <div v-else-if="indexIn === 'addCollapseStatus'">
                <el-button type="primary" @click="addItem()"><i class="el-icon-plus"></i></el-button>
                <el-dialog :visible.sync="config.CAttribute.addCollapseStatus" :show-close="false">
                  <h4 slot="title">添加：</h4>
                  <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].name"
                            placeholder="唯一标识符"></el-input>
                  <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].title"
                            placeholder="面板标题"></el-input>
                  <el-input v-model="config.CAttribute.collapseItem[config.CAttribute.collapseItem.length - 1].content"
                            placeholder="面板内容"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="closeCollapseDialog(false)">取 消</el-button>
                    <el-button type="primary" @click="closeCollapseDialog(true)">确 定</el-button>
                  </div>
                </el-dialog>
              </div> <!--addCollapseStatus ended-->
              <!--Loading加载  start-->
              <div v-else-if="indexIn === 'loadingText'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="加载文本"
                  >
                    <el-input type="text" @change="changeConfig()" placeholder="加载文本"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div> <!--Loading加载  ended-->
              <!--page分页  start-->
              <div v-else-if="indexIn === 'pageSmall'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="是否使用小型分页样式"
                  >
                    <el-radio-group v-model="config[index][indexIn]">
                      <el-radio :key="radio.value" v-for="radio in config[index].pageSmallList" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'pageSize'">
                <div v-if="config[index].typeModel === 'pageBasic' ||
                            config[index].typeModel === 'pageTotal' ||
                            config[index].typeModel === 'pageDirect'">
                  <el-form label-position="right" label-width="70px">
                    <el-form-item
                      class="lineRow"
                      label="分页页数"
                    >
                      <el-input type="text" @change="changeConfig()" placeholder="分页页数"
                                v-model.number="config[index][indexIn]"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div v-else-if="indexIn === 'pageCurrent'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="当前页数"
                  >
                    <el-input type="text" @change="changeConfig()" placeholder="当前页数"
                              v-model.number="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'pageTotal'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="总条目数"
                  >
                    <el-input type="text" @change="changeConfig()" placeholder="总条目数"
                              v-model.number="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div> <!--page分页  ended-->
              <!--Cascader 级联  start-->
              <div v-else-if="indexIn === 'showAllLevels'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="是否显示完整路径"
                  >
                    <el-radio-group v-model="config[index].showAllLevelFlag">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'filterableOption'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="是否可搜索选项"
                  >
                    <el-radio-group v-model="config[index].filterable">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'changeOnSelectOption'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="是否允许选择任意一级的选项"
                  >
                    <el-radio-group v-model="config[index].changeOnSelect">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadeSizeOption'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="尺寸"
                  >
                    <el-radio-group v-model="config[index].cascadeSize">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadePropsTitle'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="标题"
                  >
                    <el-input @change="changeConfig()" placeholder="级联标题"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadePlaceholder'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件提示语"
                  >
                    <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <!--Cascader 级联 ended-->
              <!--type属性  start-->
              <div v-if="indexIn === 'type'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件类型"
                  >
                    <el-radio-group v-model="config[index].typeModel">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div> <!--type属性  ended-->
              <div v-else-if="indexIn === 'description'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件描述"
                  >
                    <el-input type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'placeholder'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件提示语"
                  >
                    <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'prepend' && config.CAttribute.typeModel==='input'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="输入框前置追加"
                  >
                    <el-input @change="changeConfig()" placeholder="输入框前置追加头(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'append' && config.CAttribute.typeModel==='input'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="输入框尾部增加"
                  >
                    <el-input @change="changeConfig()" placeholder="输入框尾部增加(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'closable'">
                <el-form label-position="right" label-width="100px">
                  <el-form-item
                    class="lineRow"
                    label="可关闭状态"
                  >
                    <el-checkbox v-model="config[index][indexIn].closableStatus"></el-checkbox>
                  </el-form-item>
                </el-form>
                <div v-if="config[index][indexIn].closableStatus">
                  <el-form label-position="right" label-width="100px">
                    <el-form-item
                      class="lineRow"
                      label="是否应用渐变动画"
                    >
                      <el-radio-group v-model="config[index][indexIn].transitionModel">
                        <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeTransition"
                                  :label="radio.value">
                          {{radio.name}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>
              </div>



            </div>
          </div><!--基本属性 ended-->




          <!--Demo start-->
          <div v-else-if="index === ''">
            <el-form label-position="right" label-width="70px">
              <el-form-item
                class="lineRow"
                label=""
              >
                <el-input
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder=""
                ></el-input>
              </el-form-item>
            </el-form>
          </div><!--Demo ended-->
        </div>
      </div><!--控件属性设置 start-->
      <div v-else-if="!activeJudge && !config">
        <span class="warnSpan">请选择需要编辑的控件</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {layoutJudge} from '@/assets/js/common'

  export default {
    name: 'ControlConfig',
    props: ['config', 'fConfig'],
    destroy () {
      console.info(`destroy`)
    },
    data () {
      return {
        activeSetting: 'formSetting',
        startTime: '',
        stepTime: '',
        endTime: '',
        formateItems: ['HH:mm:ss', 'HH-mm-ss', 'HH/mm/ss'],
        timeSelectableRange: new Date(),
        addSwitchValue: false, // 是否增加switch值
        currentIndex: 0, // 当前选中项在默认值的index(多选)
        selectedGroup: {
          label: '',
          options: {label: '', showContent: '', isDisabled: false}
        },
        rules: {
//          radio和checkbox label值校验
          label: [
            {required: true, message: '请输入选项值'},
            {
              validator: (rules, value, callback) => {
                this.config.CAttribute.itemAttr.forEach((item, index) => {
                  if (item.label === value && index !== this.config.CAttribute.currentSelected) {
                    this.config.CAttribute.itemAttr[this.config.CAttribute.currentSelected].label = ''
                    callback(new Error('选项值不可以重复'))
                  }
                })
                callback()
              }
            }
          ]
        },
        rulesSlider: {
          //          sliderStep值校验
          sliderStep: [
            {required: true, message: '请输入步长'},
            {
              validator: (rules, value, callback) => {
                if (!/^\d+(\.\d+)?$/.test(value)) { // 只能是数字
                  this.config.CAttribute.sliderStep = 1
                  callback(new Error('请输入数字'))
                }
                callback()
              }
            }
          ],
          height: [
            {required: true, message: '请输入高度'},
            {
              validator: (rules, value, callback) => {
                if (!/^\d+(\.\d+)?$/.test(value)) { // 只能是数字
                  this.config.CAttribute.height = 300
                  callback(new Error('请输入数字'))
                }
                callback()
              }
            }
          ]
        },
        rulesAdd: {}
      }
    },
    mounted () {
      if (this.config) {
        this.activeSetting = 'controlSetting'
      }
    },
    computed: {
      activeJudge () {
        if (this.activeSetting === 'formSetting') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      changeTab (values) {
        this.activeSetting = values
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
      validateLayout (layoutItem, layoutType) {
        console.error(`validateLayout`)
        let returnValue = layoutJudge(layoutItem, layoutType)
        if (!returnValue) {
          return
        }
        if (returnValue.msg !== '') {
          this.reverseLayoutValue(returnValue)
          this.$message({
            type: 'error',
            message: returnValue.msg
          })
        }
        // this.$emit('changeConfig', this.config)
      },
      reverseLayoutValue (item) {
        for (let key in this.config.CLayout) {
          if (this.config.CLayout[key].value === item.type) {
            this.config.CLayout[key].default = item.value
            break
          } else {
            continue
          }
        }
      },
      getLayoutItem () {
        for (let key in this.config.CLayout) {
          if (this.config.CLayout[key].value === this.config.layoutModel) {
            this.config.CLayout[key].status = true
            this.config.currentLayout = this.config.CLayout[key]
          } else {
            this.config.CLayout[key].status = false
          }
        }
      },
      changeConfig () {
        this.$emit('changeConfig', this.config)
      },
      changeFConfig () {
        this.$emit('changeFConfig', this.fConfig)
      },
      chooseIcon (item) {
        item.chooseStatus = !item.chooseStatus
        window.iconOBJ = item
      },
      setIcon (chooseRes) {
        if (chooseRes !== '') {
          window.iconOBJ.className = chooseRes.className
          window.iconOBJ.content = chooseRes.content
          window.iconOBJ.title = chooseRes.title
          window.iconOBJ.library = chooseRes.library
          window.iconOBJ.positionModel = 'right'
        }
        // 设置switch的icon by pyy
        if (this.config.CName === 'CSwitch') {
          this.setSwitchIcon()
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
        // console.error(chooseRes)
        if (chooseRes !== '') {
          window.validateOBJ.validateModel = chooseRes
        }
        window.validateOBJ.chooseStatus = false
      },
      validateStatusChange (item) {
        if (!item.status) {
          this.config.CValidate.validateModel = ''
        }
      },
      // by pyy
      AddItem () {
        this.config.CAttribute.addStatus = !this.config.CAttribute.addStatus
        if (this.config.CAttribute.typeModel !== 'selectGroup') {
          this.config.CAttribute.itemAttr.push({label: '', showContent: '', isDisabled: false})
        }
      },
      HandleClose (value) {
        if (value === '') {
          if (this.config.CAttribute.typeModel !== 'selectGroup') {
            this.config.CAttribute.itemAttr.pop()
          } else {
            this.config.CAttribute.itemAttrSelectGroup.pop()
          }
        }
        if (this.config.CAttribute.typeModel === 'selectGroup') {
          for (let i = 0; i < this.config.CAttribute.itemAttrSelectGroup.length; i++) {
            if (this.config.CAttribute.itemAttrSelectGroup[i].label === this.selectedGroup.label) {
              this.config.CAttribute.itemAttrSelectGroup[i].options.push(this.selectedGroup.options)
              setTimeout(() => {
                this.selectedGroup = {
                  label: '',
                  options: {label: '', showContent: '', isDisabled: false}
                }
              }, 20)
              break
            } else if (i === this.config.CAttribute.itemAttrSelectGroup.length - 1) {
              this.config.CAttribute.itemAttrSelectGroup.push({
                label: this.selectedGroup.label,
                options: [this.selectedGroup.options]
              })
              setTimeout(() => {
                this.selectedGroup = {
                  label: '',
                  options: {label: '', showContent: '', isDisabled: false}
                }
              }, 20)
              break
            }
          }
        }
        this.config.CAttribute.addStatus = false
      },
      DeleteItem (index) {
        this.config.CAttribute.itemAttr.splice(index, 1)
        this.config.CAttribute.currentSelected = 0
        this.config.CAttribute.defaultSelected = ''
      },
      // checkbox聚焦
      focusCheckbox () {
        if (this.config.CName === 'CCheckbox') {
          this.config.CAttribute.defaultCheckboxSelected.forEach((item, index) => {
            if (item === this.config.CAttribute.itemAttr[this.config.CAttribute.currentSelected].label) {
              this.currentIndex = index
            }
          })
        }
      },
      // radio,checkbox,select值与绑定值的同步
      valueChange (value) {
        if (this.config.CName === 'CRadio') {
          this.config.CKey.default = value
        } else if (this.config.CName === 'CSelect') {
          this.config.CAttribute.defaultSelected = value
        } else {
          this.config.CAttribute.defaultCheckboxSelected[this.currentIndex] = value
        }
      },
      // select事件
      DeleteItemSelectGroup (arr) {
        this.config.CAttribute.itemAttrSelectGroup[arr[0]].options.splice(arr[1], 1)
        this.config.CAttribute.currentSelectedGroup = [0, 0]
        this.config.CAttribute.defaultSelected = ''
      },
      doSelectMultiple () {
        if (this.config.CAttribute.isMultiple === true) {
          this.config.CAttribute.defaultSelected = []
        } else {
          this.config.CAttribute.defaultSelected = ''
        }
      },
      doSelectCreate () {
        if (this.config.CAttribute.isSelectCreate === true) {
          this.config.CAttribute.isSelectFilterable = true
        }
      },
      doSelectRemote () {
        if (this.config.CAttribute.isSelectRemote === true) {
          this.config.CAttribute.isSelectFilterable = true
        }
      },
      focusSelect () {
        if (this.config.CAttribute.isMultiple) {
          let currentLabel = this.config.CAttribute.itemAttrSelectGroup[this.config.CAttribute.currentSelectedGroup[0]]
            .options[this.config.CAttribute.currentSelectedGroup[1]].label
          this.config.CAttribute.defaultSelected.forEach((item, index) => {
            if (item === currentLabel) {
              this.currentIndex = index
            }
          })
        }
      },
      // selectGroup值改变
      selectValueChange (value) {
        if (!this.config.CAttribute.isMultiple) {
          this.config.CAttribute.defaultSelected = value
        } else {
          this.config.CAttribute.defaultSelected[this.currentIndex] = value
        }
      },
      // switch事件
      switchValue (value) {
        if (value !== '') {
          this.config.CAttribute.defaultSwitchStatus = value
        }
      },
      setSwitchIcon () {
        if (this.config.CAttribute.switchStatus) {
          this.config.CAttribute.onSwitchIcon = 'el-icon-' + this.config.Icon.className
        } else {
          this.config.CAttribute.offSwitchIcon = 'el-icon-' + this.config.Icon.className
        }
      },
      // slider
      rangeChange () {
        if (this.config.CAttribute.sliderRange) {
          this.config.CAttribute.sliderShowInput = false
        }
      },
      // datepicker
      formatStartTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeStartend = value
        } else {
          this.config.CAttribute.timeStart = value
        }
      },
      formatStepTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeStepend = value
        } else {
          this.config.CAttribute.timeStep = value
        }
      },
      formatEndTime (value) {
        if (this.config.CAttribute.rangeOfFixedEnd) {
          this.config.CAttribute.timeEndend = value
        } else {
          this.config.CAttribute.timeEnd = value
        }
      },
      formatSelectableRange (value) {
        this.config.CAttribute.timeSelectableRange = value
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

  .controlAttribute
    position absolute
    top 2.3rem
    left .2rem
    right .2rem
    bottom .2rem
    > div
      padding: .3rem

  .typeBox
    display: flex
    width: 100%
    height 2.35rem
    .items
      &.active
        background-color rgb(102, 175, 233)
        color rgba(255, 255, 255, .9)
      flex 1
      float left
      line-height 1rem
      padding .5rem 0
      text-align center
      overflow hidden
      text-overflow ellipsis
      height 1rem
      border-bottom 1px solid #e1e1e1
      border-right 1px solid #e1e1e1
      cursor pointer
      &:last-child
        border-right none

  .controlElForm, .configSetting
    > div
      margin-bottom .3rem

  .warnSpan
    background $font-danger
    color #fff
    display block
    padding 7px 15px
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px
    font-size $font-normal

  .lineRow
    padding-bottom .3rem
    border-bottom: 1px dashed rgba(102, 175, 233, .5)

  .DivForLine
    height: 0
    margin .3rem 0
    border-bottom 1px solid #e1e1e1
    opacity .3

</style>
