<template>
  <div class="ControlConfig">
    <div v-if="config">
      <el-form>
        <el-form-item>
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
            <!--by pyy-->
            <div v-else-if="index === 'CName'&& (item === 'CRadio' || item === 'CCheckbox' || item === 'CSelect')">
              <p>增加选项</p>
              <el-button type="primary" @click="AddItem()"><i class="el-icon-plus"></i></el-button>
              <el-dialog
                :visible.sync="config.CAttribute.addStatus"
                :show-close="false">
                <h4 slot="title">输入单选项属性：</h4>
                <el-form
                  :model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1]"
                  :rules="rulesAdd"
                  v-if="item === 'CRadio'">
                  <el-form-item prop="label">
                    <el-input v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label" placeholder="选项值" class="input__inner"></el-input>
                  </el-form-item>
                </el-form>
                <div v-if="config.CAttribute.typeModel !== 'selectGroup'">
                  <el-input
                    v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label" placeholder="选项值"
                    class="input__inner"
                    v-if="item !== 'CRadio'"></el-input>
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
            </div>
            <div v-else-if="index === 'CAttribute'">
              <!--{{item}}-->
              <div v-for="(itemIn,indexIn) in item">
                <div v-if="indexIn === 'type'">
                  <p>控件类型</p>
                  <!--<el-input @change="changeConfig()" placeholder="控件类型" v-model="config[index][indexIn]"></el-input>-->
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
                <div v-else-if="indexIn === 'placeholder'">
                  <p>控件提示语</p>
                  <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                            v-model="config[index][indexIn]"></el-input>
                </div>
                <div v-else-if="indexIn === 'prepend' && config.CAttribute.typeModel==='input'">
                  <p>输入框前置追加</p>
                  <el-input @change="changeConfig()" placeholder="输入框前置追加头(非必填)"
                            v-model="config[index][indexIn]"></el-input>
                </div>
                <div v-else-if="indexIn === 'append' && config.CAttribute.typeModel==='input'">
                  <p>输入框尾部增加</p>
                  <el-input @change="changeConfig()" placeholder="输入框尾部增加(非必填)"
                            v-model="config[index][indexIn]"></el-input>
                </div>
                <!--by pyy-->
                <!--radio,checkbox按钮样式尺寸-->
                <div v-else-if="indexIn === 'size' && (config.CAttribute.typeModel==='button' || config.CName === 'CSelect' || config.CName === 'CDateTimePicker')">
                  <p>控件尺寸</p>
                  <div v-if="config.CName === 'CDateTimePicker' && config.CAttribute.rangeOfFixedEnd">
                    <el-radio-group v-model="config[index].sizeModelend">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div v-else>
                    <el-radio-group v-model="config[index].sizeModel">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <!--radio,checkbox按钮样式激活时文本颜色-->
                <div v-else-if="indexIn === 'textColor' && config.CAttribute.typeModel==='button'">
                  <p>激活文本颜色</p>
                  <el-color-picker v-model="config[index].textColor"></el-color-picker>
                </div>
                <!--radio,checkbox按钮样式激活时填充边和边框颜色-->
                <div v-else-if="indexIn === 'fillColor' && config.CAttribute.typeModel==='button'">
                  <p>激活填充和边框颜色</p>
                  <el-color-picker v-model="config[index].fillColor"></el-color-picker>
                </div>
                <div v-else-if="indexIn === 'currentSelected' && config[index].typeModel !== 'selectGroup'">
                  <el-form
                    :model="config[index].itemAttr[itemIn]"
                    :rules="rules">
                    <el-form-item prop="label">
                      <p>控件选项值</p>
                      <el-input v-model="config[index].itemAttr[itemIn].label"
                                @focus="focuseCheckbox"
                                @change="valueChange"></el-input>
                    </el-form-item>
                  </el-form>
                  <p>控件选项显示内容</p>
                  <el-input v-model="config[index].itemAttr[itemIn].showContent"></el-input>
                  <p>删除该选项</p>
                  <el-button type="primary" @click="DeleteItem(itemIn)"><i class="el-icon-delete"></i></el-button>
                  <p>禁用该选项</p>
                  <el-checkbox v-model="config[index].itemAttr[itemIn].isDisabled" label="禁用"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'showAllCheckbox' && config[index].typeModel !== 'button'">
                  <p>显示全选选项</p>
                  <el-checkbox v-model="config[index].showAllCheckbox" label="显示全选"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'ableSelectedMin'">
                  <p>可选最小值</p>
                  <el-input-number v-model="config[index].ableSelectedMin" :min="0"></el-input-number>
                </div>
                <div v-else-if="indexIn === 'ableSelectedMax' && (config.CName !== 'CSelect' || config[index].isMultiple === true)">
                  <p>可选最大值</p>
                  <el-input-number v-model="config[index].ableSelectedMax" :min="0"></el-input-number>
                </div>
                <!--设置select选项属性-->
                <!--设置selectGroup-->
                <div v-else-if="indexIn === 'currentSelectedGroup' && config[index].typeModel === 'selectGroup'">
                  <p>控件选项值</p>
                  <el-input
                    v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].label"
                    @focus="focusSelect"
                    @change="selectValueChange"></el-input>
                  <p>控件选项显示内容</p>
                  <el-input v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].showContent"></el-input>
                  <p>删除该选项</p>
                  <el-button type="primary" @click="DeleteItemSelectGroup(itemIn)"><i class="el-icon-delete"></i></el-button>
                  <p>禁用该选项</p>
                  <el-checkbox v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].isDisabled" label="禁用"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'isMultiple'">
                  <p>多选</p>
                    <el-checkbox v-model="config[index].isMultiple" label="多选" @change="doSelectMultiple"></el-checkbox>
                </div>
                <div v-else-if="config[index].isMultiple === false && indexIn === 'isSelectClearable'">
                  <p>单选时显示清除选项</p>
                  <el-checkbox v-model="config[index].isSelectClearable" label="显示"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'isSelectFilterable'">
                  <p>可搜索</p>
                  <el-checkbox v-model="config[index].isSelectFilterable" label="可搜索"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'isSelectCreate'">
                  <p>可创建条目</p>
                  <el-checkbox v-model="config[index].isSelectCreate" label="可创建" @change="doSelectCreate"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'isSelectRemote'">
                  <p>可远程搜索</p>
                    <el-checkbox v-model="config[index].isSelectRemote" label="可远程" @change="doSelectRemote"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'loadingText' && config[index].isSelectRemote">
                  <p>远程加载时显示</p>
                  <el-input v-model="config[index].loadingText"></el-input>
                </div>
                <div v-else-if="indexIn === 'noMatchText' && config[index].isSelectFilterable">
                  <p>搜索条件无匹配显示</p>
                  <el-input v-model="config[index].noMatchText"></el-input>
                </div>
                <div v-else-if="indexIn === 'noDataText'">
                  <p>选项为空显示</p>
                  <el-input v-model="config[index].noDataText"></el-input>
                </div>
                <!--设置switch属性-->
                <div v-else-if="indexIn === 'switchStatus'">
                  <p>设置开关值</p>
                  <el-checkbox v-model="addSwitchValue"  label="设置"></el-checkbox>
                  <div v-if="itemIn">
                    <div v-if="addSwitchValue">
                      <p>打开时的值</p>
                      <el-input v-model="config[index].onSwitchValue" @change="switchValue"></el-input>
                      <p>增加值提示</p>
                      <el-checkbox v-model="config[index].showSwitchTooltip"></el-checkbox>
                    </div>
                    <p>打开时的文字</p>
                    <el-input v-model="config[index].onText"></el-input>
                    <p>打开时的背景颜色</p>
                    <el-color-picker v-model="config[index].onFillColor"></el-color-picker>
                  </div>
                  <div v-else>
                    <div v-if="addSwitchValue">
                      <p>关闭时的值</p>
                      <el-input v-model="config[index].offSwitchValue" @change="switchValue"></el-input>
                      <p>增加值提示</p>
                      <el-checkbox v-model="config[index].showSwitchTooltip"></el-checkbox>
                    </div>
                    <p>关闭时的文字</p>
                    <el-input v-model="config[index].offText"></el-input>
                    <p>关闭时的背景颜色</p>
                    <el-color-picker v-model="config[index].offFillColor"></el-color-picker>
                  </div>
                </div>
                <!--设置slider-->
                <div v-else-if="indexIn === 'sliderStep'">
                  <el-form
                    :model="config[index]"
                    :rules="rulesSlider">
                    <el-form-item prop="sliderStep">
                      <p>控件步长</p>
                      <el-input v-model.number="config[index].sliderStep"></el-input>
                    </el-form-item>
                    <el-form-item v-if="config[index].typeModel === 'vertical'" prop="height">
                      <p>控件高度</p>
                      <el-input v-model.number="config[index].height"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-else-if="indexIn === 'sliderRange'">
                  <p>范围选择</p>
                  <el-checkbox v-model="config[index].sliderRange" label="范围" @change="rangeChange"></el-checkbox>
                  <div v-if="!config[index].sliderRange">
                    <p>显示输入框</p>
                    <el-checkbox v-model="config[index].sliderShowInput" label="显示"></el-checkbox>
                  </div>
                  <div v-if="config[index].sliderShowInput">
                    <p>显示输入框按钮</p>
                    <el-checkbox v-model="config[index].sliderShowInputButton" label="显示"></el-checkbox>
                  </div>
                </div>
                <div v-else-if="indexIn === 'sliderShowStops'">
                  <p>显示间断点</p>
                  <el-checkbox v-model="config[index].sliderShowStops" label="显示"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'sliderShowTooltip'">
                  <p>显示提示</p>
                  <el-checkbox v-model="config[index].sliderShowTooltip" label="显示"></el-checkbox>
                </div>
                <!--设置datePicker-->
                <div v-else-if="indexIn === 'typeModel' && itemIn === 'time'" >
                  <p>控件为固定时间点</p>
                  <el-checkbox v-model="config[index].timeFixed" label="是"></el-checkbox>
                  <div v-if="config[index].timeFixed">
                    <p>起始时间</p>
                    <el-time-picker
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="请输入起始时间"
                      @change="formatStartTime"
                      format="HH:mm"
                      v-model="startTime"></el-time-picker>
                    <p>时间间隔</p>
                    <el-time-picker
                      v-model="stepTime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      @change="formatStepTime"
                      format="HH:mm"
                      placeholder="请输入间隔时间"></el-time-picker>
                    <p>结束时间</p>
                    <el-time-picker
                      v-model="endTime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      @change="formatEndTime"
                      format="HH:mm"
                      placeholder="请输入间隔时间"></el-time-picker>
                  </div>
                  <div v-if="!config[index].timeFixed">
                    <p>可选择范围</p>
                    <el-time-picker
                      is-range
                      v-model="timeSelectableRange"
                      @change="formateSelectableRange"
                      placeholder="选择时间范围">
                    </el-time-picker>
                  </div>
                  <div>
                    <p>是否为范围选择</p>
                    <el-checkbox v-model="config[index].isRangeSelect" label="是"></el-checkbox>
                  </div>
                </div>
                <div v-else-if="indexIn === 'dateFormate'">
                  <p>日期格式化</p>
                  <el-select
                    v-model="config[index].timeFormate"
                    clearable
                    filterable
                    allow-create
                    placeholder="日期格式化">
                    <el-option v-for="item in formateItems" :key="item" :value="item">{{item}}</el-option>
                  </el-select>
                </div>
                <div v-else-if="indexIn === 'timeEditable' && !config[index].timeFixed">
                  <p>文本框是否可输入</p>
                  <el-checkbox v-model="config[index].timeEditable" label="可输入"></el-checkbox>
                </div>
                <div v-else-if="indexIn === 'isShowClearable'">
                  <p>是否显示清除按钮</p>
                  <div v-if="config[index].rangeOfFixedEnd">
                    <el-checkbox v-model="config[index].isShowClearableend" label="显示"></el-checkbox>
                  </div>
                  <div v-else>
                    <el-checkbox v-model="config[index].isShowClearable" label="显示"></el-checkbox>
                  </div>
                </div>
                <div v-else-if="indexIn === 'defaultSwitchStatus'">
                  <p>默认值</p>
                  {{itemIn}}
                </div>
                <div v-else-if="indexIn === 'defaultCheckboxSelected'">
                  <p>默认值</p>
                  {{itemIn}}
                </div>
                <div v-else-if="indexIn === 'defaultSelected'">
                  <p>默认值</p>
                  {{itemIn}}
                </div>
                <div v-else-if="indexIn === 'width'">
                  <p>输入控件宽度</p>
                  <el-input-number v-model="config[index].width" :min="46"></el-input-number>
                </div>
              </div>
            </div>
            <div v-else-if="index === 'CKey'">
              <!--{{item}}-->
              <div v-for="(itemIn,indexIn) in item">
                <div v-if="indexIn === 'default'">
                  <el-input
                    @change="changeConfig()" placeholder="控件默认值"
                    v-model="config[index][indexIn]"></el-input>
                </div>
              </div>
            </div>
            <div v-else-if="index === 'Status'">
              <!--{{item}}-->
              <div>
                <el-checkbox v-model="item.status"></el-checkbox>
                状态
              </div>
              <div v-if="item.status">
                <el-checkbox-group v-model="config[index].ruleList">
                  <el-checkbox :key="checkbox.value" v-for="checkbox in config[index].rules" :label="checkbox.value">
                    {{checkbox.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-else-if="index === 'Icon'">
              <!--{{item}}-->
              <div>
                <el-checkbox @change="iconStatusChange(item)" v-model="item.status" label="状态"></el-checkbox>
              </div>
              <div v-if="item.status">
                <div>
                  <el-button @click="chooseIcon(item)" type="primary" size="small" icon="edit">选择图标</el-button>
                  <c-icon @postIcon="setIcon" v-if="item.chooseStatus"></c-icon>
                </div>
                <div v-if="item.position!=''&&item.position.length>0&&item.status&&(item.className!='')">
                  <br/>
                  <div>图标放置位置</div>
                  <el-radio-group v-model="item.positionModel">
                    <el-radio v-for="radio in item.position" :key="radio.value" :label="radio.value">
                      {{radio.name}}
                    </el-radio>
                  </el-radio-group>
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
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'ControlConfigPyy',
    props: ['config'],
    created () {},
    methods: {
      changeConfig () { // 变更config 向上传值
        this.$emit('changeConfig', this.config)
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
          this.setSwitchicon()
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
              this.config.CAttribute.itemAttrSelectGroup.push({label: this.selectedGroup.label, options: [this.selectedGroup.options]})
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
      focuseCheckbox () {
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
      setSwitchicon () {
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
      formateSelectableRange (value) {
        this.config.CAttribute.timeSelectableRange = value
      }
    },
    data () {
      return {
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
            { required: true, message: '请输入选项值' },
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
            { required: true, message: '请输入步长' },
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
            { required: true, message: '请输入高度' },
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
  .input__inner
    margin-bottom 14px
</style>
