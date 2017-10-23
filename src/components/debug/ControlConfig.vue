<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
        <div v-if="index === 'CTitleCN'">
          <p>控件标题</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'labelPositionModel'">
          <p>标题位置</p>
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
        </div>
        <div v-if="index === 'labelWidth' && config.labelPositionModel !== 'top'">
          <p>控件标题宽度</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
        <div v-else-if="index === 'CTitleEN'">
          <p>英文名</p>
          <el-input @change="changeConfig()" v-model="config[index]"></el-input>
        </div>
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
                <el-input v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label"
                          placeholder="选项值" class="input__inner"></el-input>
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
            <div v-else-if="indexIn === 'cascadePropsTitle'">
              <p>标题</p>
              <!--
              <div v-for="(item,index) in config[index].cascadeList">
                <p v-text="item"></p>
              </div>
              -->
              <el-input @change="changeConfig()" placeholder="级联标题"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <div v-else-if="indexIn === 'cascadePlaceholder'">
              <p>控件提示语</p>
              <el-input @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div>
            <!-- End-->
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

            <!--mtw-->
            <div v-else-if="indexIn === 'closable'">
              <!--{{item}}-->
              <div>
                <el-checkbox v-model="config[index][indexIn].closableStatus"></el-checkbox>
                可关闭状态
              </div>
              <div v-if="config[index][indexIn].closableStatus">
                <el-radio-group v-model="config[index][indexIn].transitionModel">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeTransition"
                            :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div v-else-if="indexIn === 'hit'">
              <p>是否描边{{config[index][indexIn]}}</p>
              <el-radio-group v-model="config[index][indexIn].hitStatus">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hitable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
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
            <!--mtw-->
            <div v-else-if="indexIn === 'defaultTagName'">
              <p>标签名</p>
              <el-input @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--tag标签的基础属性-->
            <div v-else-if="indexIn === 'closable'">
              <!--{{item}}-->
              <div>
                <el-checkbox v-model="config[index][indexIn].closableStatus"></el-checkbox>
                可关闭状态
              </div>
              <div v-if="config[index][indexIn].closableStatus">
                <el-radio-group v-model="config[index][indexIn].transitionModel">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeTransition"
                            :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div> <!--tag标签的基础属性-->
            <div v-else-if="indexIn === 'hit'"> <!--tag标签的基础属性-->
              <p>是否描边</p>
              <el-radio-group v-model="config[index][indexIn].hitStatus">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hitAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--tag标签的基础属性-->

            <div v-else-if="indexIn === 'showText'"> <!--进度条的基础属性-->
              <p>是否显示文字</p>
              <el-checkbox v-model="config[index][indexIn].showTextStatus"></el-checkbox>
              <div v-if="config[index][indexIn].showTextStatus && config[index].typeModel === 'line'">
                <p>文字显示位置</p>
                <el-radio-group v-model="config[index][indexIn].textInsideStatus">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].textInside" :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </div>
              <div v-if="config[index].typeModel === 'circle'">
                <p>环形宽度值</p>
                <el-input @change="changeConfig()"
                          v-model.number="config[index][indexIn].width"></el-input>
              </div>
              <p>线形宽度值</p>
              <el-input @change="changeConfig()"
                        v-model.number="config[index][indexIn].strokeWidth"></el-input>
            </div> <!--进度条的基础属性-->
            <div v-else-if="index === 'progressStatus'"> <!--进度条的状态属性-->
              <p>状态</p>
              <el-radio-group v-model="config[index].progressStatusCurrent">
                <el-radio :key="radio.value" v-for="radio in config[index].status" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--进度条的状态属性-->

            <div v-else-if="indexIn === 'badgeValue'"> <!--badge标记的基础值属性-->
              <p>标记值</p>
              <template v-if="config[index].typeModel === 'string' && !config[index].isDot.dotStatus">
                <p>字符串值</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入"
                          v-model="config[index][indexIn].defaultValue"></el-input>
              </template>
              <template v-if="config[index].typeModel === 'number' && !config[index].isDot.dotStatus">
                <p>数字值</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入"
                          v-model.number="config[index][indexIn].defaultValue"></el-input>
                <p>max最大值设置</p>
                <el-input type="input" @change="changeConfig()" placeholder="请输入最大值"
                          v-model.number="config[index][indexIn].max"></el-input>
              </template>
            </div> <!--badge标记的基础值属性-->
            <div v-else-if="indexIn === 'isDot'"> <!--badge标记的is-dot（点）属性-->
              <p>显示类型</p>
              <el-radio-group v-model="config[index][indexIn].dotStatus">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].dotAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--badge标记的is-dot（点）属性-->
            <div v-else-if="indexIn === 'badgeStatus'"> <!--badge标记的状态属性-->
              <p>标记状态</p>
              <el-radio-group v-model="config[index][indexIn].hidden">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hiddenAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--badge标记的状态属性-->

            <div v-else-if="indexIn === 'tabsStatus'"> <!--tabs标签页的状态属性-->
              <p>可增加</p>
              <el-radio-group v-model="config[index][indexIn].addable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].addStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <p>可关闭</p>
              <el-radio-group v-model="config[index][indexIn].closable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <p>可同时增加和关闭</p>
              <el-radio-group v-model="config[index][indexIn].editable">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].editStatus" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--tabs标签页的状态属性-->
            <div v-else-if="indexIn === 'top'">
              <p>控件位置</p>
              <el-input type="input" @change="changeConfig()" placeholder="控件描述(非必填)"
                        v-model="config[index][indexIn]"></el-input>
            </div> <!--Dialog对话框的top属性-->
            <div v-else-if="indexIn === 'title'"> <!--Dialog对话框的title属性-->
              <p>控件标题</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Dialog对话框、Popover的title属性-->
            <div v-else-if="indexIn === 'size'"> <!--Dialog对话框的size属性-->
              <p>控件大小</p>
              <el-radio-group v-model="config[index][indexIn].currentSize">
                <el-radio :key="radio.name" v-for="radio in config[index][indexIn].sizeAble" :label="radio.name">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的size属性-->
            <div v-else-if="indexIn === 'modal'"> <!--Dialog对话框的model属性-->
              <p>是否需要遮罩层</p>
              <el-radio-group v-model="config[index][indexIn].modal">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
              <template v-if="config[index][indexIn].modal">
                <p>遮罩层插入位置</p>
                <el-radio-group v-model="config[index][indexIn].modalPosition.modalPosition">
                  <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalPosition.modalPositionAble"
                            :label="radio.value">
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
              </template>
            </div> <!--Dialog对话框的modal属性-->
            <div v-else-if="indexIn === 'lockScroll'"> <!--Dialog对话框的lockScroll属性-->
              <p>是否Dialog出现时将body滚动锁定</p>
              <el-radio-group v-model="config[index][indexIn].lockScroll">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].lockScrollAble"
                          :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的lockScroll属性-->
            <div v-else-if="indexIn === 'showClose'"> <!--Dialog对话框的showClose属性-->
              <p>是否显示关闭按钮</p>
              <el-radio-group v-model="config[index][indexIn].showClose">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showCloseAble" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Dialog对话框的showClose属性-->

            <div v-else-if="indexIn === 'MessageBoxtitle'">
              <p>控件标题</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的title属性-->
            <div v-else-if="indexIn === 'inputValue'">
              <p>输入框的初始文本</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputValue属性-->
            <div v-else-if="indexIn === 'inputPattern'">
              <p>输入框的校验表达式</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputPattern属性-->
            <div v-else-if="indexIn === 'inputErrorMessage'">
              <p>校验未通过时的提示文本</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的inputPattern属性-->
            <div v-else-if="indexIn === 'showInput'">
              <p>是否显示输入框</p>
              <el-radio-group v-model="config[index][indexIn].showInput">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showInputable" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--弹框MessageBox的showInput属性-->
            <div v-else-if="indexIn === 'confirmButtonText'">
              <p>确定按钮文字</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的confirmButtonText属性-->
            <div v-else-if="indexIn === 'cancelButtonText'">
              <p>取消按钮文字</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--弹框MessageBox的cancelButtonText属性-->

            <div v-else-if="indexIn === 'trigger'"> <!--Popover的trigger属性-->
              <p>触发方式</p>
              <el-radio-group v-model="config[index].triggerModel">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的trigger属性-->
            <div v-else-if="indexIn === 'width'"> <!--Popover弹出框的width属性-->
              <p>控件宽度</p>
              <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的width属性-->
            <div v-else-if="indexIn === 'content'">
              <p>控件内容</p>
              <el-input type="textarea" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的content属性-->
            <div v-else-if="indexIn === 'visibleArrow'"> <!--Popover弹出框的visibleArrow属性-->
              <p>是否显示Tooltip 箭头</p>
              <el-radio-group v-model="config[index][indexIn].visibleArrow">
                <el-radio :key="radio.value" v-for="radio in config[index][indexIn].visibleArrowable"
                          :label="radio.value">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的visibleArrow属性-->
            <div v-else-if="indexIn === 'offset'"> <!--Popover弹出框的offset属性-->
              <p>位置偏移</p>
              <el-input type="input" @change="changeConfig()" v-model.number="config[index][indexIn]"></el-input>
            </div> <!--Popover弹出框的offset属性-->
            <div v-else-if="indexIn === 'placement'"> <!--Popover弹出框的位置属性-->
              <p>控件位置</p>
              <el-radio-group v-model="config[index][indexIn].placement">
                <el-radio :key="radio.name" v-for="radio in config[index][indexIn].placementable" :label="radio.name">
                  {{radio.name}}
                </el-radio>
              </el-radio-group>
            </div> <!--Popover弹出框的位置属性-->
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
        <div v-else-if="index === 'CLayout'">
          <el-radio-group
            v-model="config.layoutModel"
            @change="getLayoutItem()"
          >
            <el-radio
              v-if="config.CLayout"
              v-for="(layout, key) in config.CLayout"
              :key="layout.value"
              :label="layout.value">
              {{layout.name}}
            </el-radio>
          </el-radio-group>
          <div>
            <div v-if="config.layoutModel==='percentLayout' && config.currentLayout">
              {{config.currentLayout.name}}：
              <el-input
                @change="validateLayout(config.currentLayout,config.layoutModel)"
                v-model="config.currentLayout.default"
                :placeholder="config.currentLayout.name"
                :maxlength=3
              ></el-input>
            </div>
            <div v-else-if="config.layoutModel==='pixelLayout' && config.currentLayout">
              {{config.currentLayout.name}}：
              <el-input
                @change="validateLayout(config.currentLayout,config.layoutModel)"
                v-model="config.currentLayout.default"
                :placeholder="config.currentLayout.name"
                :maxlength=3
              ></el-input>
            </div>
            <div v-else-if="config.layoutModel==='flexLayout' && config.currentLayout">
              {{config.currentLayout.name}}：
              <el-input
                @change="validateLayout(config.currentLayout,config.layoutModel)"
                v-model="config.currentLayout.default"
                :placeholder="config.currentLayout.name"
                :maxlength=3
              ></el-input>
            </div>
            <div v-else-if="config.layoutModel==='columnLayout' && config.currentLayout">
              {{config.currentLayout.name}}：
              <el-input
                @change="validateLayout(config.currentLayout,config.layoutModel)"
                v-model="config.currentLayout.default"
                :placeholder="config.currentLayout.name"
                :maxlength=3
              ></el-input>
            </div>
            <!--xyl-->
          </div>
        </div>
        <hr class="hrLine" style="border-top:0; border-right:0;border-left:0; border-bottom:1px solid red">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {layoutJudge} from '@/assets/js/common'

  export default {
    name: 'ControlConfig',
    props: ['config'],
    destroy () {
      console.info(`destroy`)
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
    },
    mounted () {
    },
    methods: {
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
</style>
