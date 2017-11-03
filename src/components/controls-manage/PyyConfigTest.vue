<template>
  <div class="ControlConfig">
    <ul class="typeBox">
      <li @click="changeTab('formSetting')" class="items" :class="[
        activeJudge === true ? 'active' : ''
      ]">
        表单属性
      </li>
      <li @click="changeTab('controlSetting',true)" class="items" :class="[
        activeJudge === false ? 'active' : ''
      ]">
        控件属性
      </li>
    </ul>
    <div class="controlAttribute">
      <!--表单设置 start-->
      <div v-if="activeJudge">
        <!--选择字段-->
        <el-form
          v-if="selectControl && !tabStatus"
          class="controlElForm"
          label-position="right"
          label-width="70px"
        >
          <el-form-item
            v-if="properties"
            class="lineRow"
            label="选择字段"
          >
            <el-cascader
              v-model="propertyArray"
              style="display: block"
              :options="properties.states"
              :props="defaultProps"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <!--设置标题-->
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
        <!--未指定的字段-->
        <el-form class="controlElForm" label-position="top">
          <el-form-item
            v-if="properties.states"
            label="未指定属性"
            class="propertiesNoneParent"
          >
            <div class="propertiesDiv">
              <el-tag
                v-for="property in properties.states"
                v-if="!property.disabled"
                type="danger"
                class="propertiesNone"
                :key="property.edmpCode"
              >
                {{property.edmpName}}
              </el-tag>
            </div>
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
                  v-if="deleteArr.indexOf('CTitleCN') === -1"
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件标题"
                ></el-input>
                <span v-else>{{config[index]}}</span>
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
                  v-if="deleteArr.indexOf('CTitleEN') === -1"
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder="请输入控件英文标题"
                ></el-input>
                <span v-else>{{config[index]}}</span>
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
                <el-radio-group
                  v-model="config[index]"
                  v-if="deleteArr.indexOf('labelPositionModel') === -1">
                  <el-radio
                    v-if="config.labelPositionValue.length > 0"
                    :key="radio.value"
                    v-for="radio in config.labelPositionValue"
                    :label="radio.value"
                  >
                    {{radio.name}}
                  </el-radio>
                </el-radio-group>
                <span v-else>
                  <template v-for="item in config.labelPositionValue">
                    <span v-if="item.value === config[index]"> {{item.name}} </span>
                  </template>
                </span>
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
                  v-if="deleteArr.indexOf('labelWidth') === -1"
                  @change="changeConfig()"
                  v-model="config[index]"
                  placeholder='单位像素'
                ></el-input>
                <span v-else>{{config[index]}}</span>
              </el-form-item>
            </el-form>
          </div><!--控件 标题宽度 ended-->
          <!--增加选项 start-->
          <div v-else-if="index === 'CName'&& (item === 'CRadio' || item === 'CCheckbox' || item === 'CSelect')">
            <el-form label-position="left" label-width="70px" v-if="deleteArr.indexOf('CName') === -1">
              <el-form-item
                class="lineRow"
                label="增加选项"
              >
                <el-button
                  type="primary"
                  @click="AddItem()"><i class="el-icon-plus"></i></el-button>
              </el-form-item>
              <el-dialog
                :visible.sync="config.CAttribute.addStatus"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
                <h4 slot="title">输入单选项属性：</h4>
                <el-form
                  :model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1]"
                  :rules="rulesAdd"
                  v-if="item === 'CRadio'">
                  <el-form-item prop="label">
                    <el-input v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label"
                              placeholder="选项值" class="inputSetting"></el-input>
                  </el-form-item>
                </el-form>
                <div v-if="config.CAttribute.typeModel !== 'selectGroup'">
                  <el-input
                    v-model="config.CAttribute.itemAttr[config.CAttribute.itemAttr.length-1].label" placeholder="选项值"
                    class="inputSetting"
                    v-if="item !== 'CRadio'"
                  ></el-input>
                  <div class="DivForLine"></div>
                  <el-input
                    class="inputSetting"
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
                      v-if="deleteArr.indexOf('collapseTitle') === -1"
                      @change="changeConfig()"
                      v-model="config[index].collapseItem[itemIn].title"
                      placeholder="请输入标题"
                    ></el-input>
                    <span v-else>{{config[index].collapseItem[itemIn].title}}</span>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="面板内容"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('collapseContent') === -1"
                      @change="changeConfig()"
                      v-model="config[index].collapseItem[itemIn].content"
                      placeholder="请输入内容"
                    ></el-input>
                    <span v-else>{{config[index].collapseItem[itemIn].content}}</span>
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
                <el-form label-position="right" label-width="70px" v-if="deleteArr.indexOf('addCollapseStatus') === -1">
                  <el-form-item
                    class="lineRow"
                    label="增加选项"
                  >
                    <el-button type="primary" @click="addItem()"><i class="el-icon-plus"></i></el-button>
                  </el-form-item>
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
                </el-form>
              </div> <!--addCollapseStatus ended-->
              <!--Loading加载  start-->
              <div v-else-if="indexIn === 'loadingText'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="加载文本"
                  >
                    <el-input type="text" @change="changeConfig()" placeholder="加载文本"
                              v-if="deleteArr.indexOf('loadingText') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div> <!--Loading加载  ended-->


              <!--page分页  start-->
              <div v-else-if="indexIn === 'pageSmall'">
                <el-form label-position="right" label-width="154px">
                  <el-form-item
                    class="lineRow"
                    label="是否使用小型分页样式"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('pageSmall') === -1"
                      v-model="config[index][indexIn]">
                      <el-radio :key="radio.value" v-for="radio in config[index].pageSmallList" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index][indexIn]">是</template>
                      <template v-else>否</template>
                    </span>
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
                                v-if="deleteArr.indexOf('pageSize') === -1"
                                v-model.number="config[index][indexIn]"></el-input>
                      <span v-else>{{config[index][indexIn]}}</span>
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
                              v-if="deleteArr.indexOf('pageCurrent') === -1"
                              v-model.number="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
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
                              v-if="deleteArr.indexOf('pageTotal') === -1"
                              v-model.number="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div> <!--page分页  ended-->


              <!--Cascader 级联  start-->
              <div v-else-if="indexIn === 'showAllLevels'">
                <el-form label-position="right" label-width="125px">
                  <el-form-item
                    class="lineRow"
                    label="是否显示完整路径"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('showAllLevels') === -1"
                      v-model="config[index].showAllLevelFlag">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <tempalte v-if="config[index].showAllLevelFlag">是</tempalte>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'filterableOption'">
                <el-form label-position="right" label-width="110px">
                  <el-form-item
                    class="lineRow"
                    label="是否可搜索选项"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('filterableOption') === -1"
                      v-model="config[index].filterable">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index].filterable">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'changeOnSelectOption'">
                <el-form label-position="right" label-width="166px">
                  <el-form-item
                    class="lineRow"
                    label="是否允许选择任一级选项"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('changeOnSelectOption') === -1"
                      v-model="config[index].changeOnSelect">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index].changeOnSelect">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadeSizeOption'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件尺寸"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('cascadeSizeOption') === -1"
                      v-model="config[index].cascadeSize">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-for="item in config[index][indexIn]">
                        <span v-if="item.value === config[index].cascadeSize"> {{item.name}} </span>
                      </template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadePropsTitle'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件标题"
                  >
                    <el-input @change="changeConfig()" placeholder="级联标题"
                              v-if="deleteArr.indexOf('cascadePropsTitle') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cascadePlaceholder'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件提示"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('cascadePlaceholder') === -1"
                      @change="changeConfig()" placeholder="控件描述(非必填)"
                      v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <!--Cascader 级联 ended-->


              <!--type属性  start-->
              <div v-if="indexIn === 'type'">
                <el-form label-position="top" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件类型"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('type') === -1"
                      v-model="config[index].typeModel">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value" class="type">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-for="item in config[index][indexIn]">
                        <span v-if="item.value === config[index].typeModel"> {{item.name}} </span>
                      </template>
                    </span>
                  </el-form-item>
                </el-form>
              </div> <!--type属性  ended-->
              <div v-else-if="indexIn === 'placeholder'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件提示"
                  >
                    <el-input @change="changeConfig()" placeholder="请输入默认值或者为空"
                              v-if="deleteArr.indexOf('placeholder') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'prepend' && config.CAttribute.typeModel==='input'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="前置追加"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('prepend') === -1"
                      @change="changeConfig()" placeholder="输入框前置追加头(非必填)"
                      v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'append' && config.CAttribute.typeModel==='input'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="尾部增加"
                  >
                    <el-input @change="changeConfig()" placeholder="输入框尾部增加(非必填)"
                              v-if="deleteArr.indexOf('append') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'description'">
                <el-form label-position="top" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件描述"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('description') === -1"
                      type="textarea" @change="changeConfig()" placeholder="控件描述(非必填)"
                      v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>


              <!--radio,checkbox按钮  start-->
              <div
                v-else-if="indexIn === 'size' && (config.CAttribute.typeModel==='button' || config.CName === 'CSelect' || config.CName === 'CDateTimePicker'|| config.CName === 'CButton')">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件尺寸"
                  >
                    <div v-if="config.CName === 'CDateTimePicker' && config.CAttribute.timeFixed && config.CAttribute.isRangeSelect && config.CAttribute.rangeOfFixedEnd">
                      <el-form-item>
                        <el-radio-group
                          v-if="deleteArr.indexOf('size') === -1"
                          v-model="config[index].sizeModelend">
                          <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                            {{radio.name}}
                          </el-radio>
                        </el-radio-group>
                        <span v-else>
                          <template v-for="item in config[index][indexIn]">
                            <span v-if="item.value === config[index].sizeModelend"> {{item.name}} </span>
                          </template>
                        </span>
                      </el-form-item>
                    </div>
                    <div v-else>
                      <el-form-item>
                        <el-radio-group
                          v-if="deleteArr.indexOf('size') === -1"
                          v-model="config[index].sizeModel">
                          <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                            {{radio.name}}
                          </el-radio>
                        </el-radio-group>
                        <span v-else>
                          <template v-for="item in config[index][indexIn]">
                            <span v-if="item.value === config[index].sizeModel"> {{item.name}} </span>
                          </template>
                        </span>
                      </el-form-item>
                    </div>
                  </el-form-item>
                </el-form>
              </div> <!--radio,checkbox按钮样式尺寸  ended-->
              <div v-else-if="indexIn === 'textColor' && config.CAttribute.typeModel==='button'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="激活文本颜色"
                  >
                    <el-color-picker
                      v-if="deleteArr.indexOf('textColor') === -1"
                      v-model="config[index].textColor"></el-color-picker>
                    <div v-else class="showColor" :style="{'background-color': config[index].textColor}"></div>
                  </el-form-item>
                </el-form>
              </div> <!--radio,checkbox按钮样式激活时文本颜色  ended-->
              <div v-else-if="indexIn === 'fillColor' && config.CAttribute.typeModel==='button'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="激活填充和边框颜色"
                  >
                    <el-color-picker
                      v-if="deleteArr.indexOf('fillColor') === -1"
                      v-model="config[index].fillColor"></el-color-picker>
                    <div v-else class="showColor" :style="{'background-color': config[index].fillColor}"></div>
                  </el-form-item>
                </el-form>
              </div> <!--radio,checkbox按钮样式激活时填充边和边框颜色  ended-->
              <div v-else-if="indexIn === 'currentSelected' && config[index].typeModel !== 'selectGroup'">
                <el-form
                  :model="config[index].itemAttr[itemIn]"
                  :rules="rules">
                  <el-form-item
                    class="lineRow"
                    prop="label"
                    label="控件选项值">
                    <el-input
                      v-if="deleteArr.indexOf('currentSelectedLabel') === -1"
                      v-model="config[index].itemAttr[itemIn].label"
                      @focus="focusCheckbox"
                      @change="valueChange"></el-input>
                    <span v-else>{{config[index].itemAttr[itemIn].label}}</span>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="显示内容"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('currentSelectedShowcontent') === -1"
                      v-model="config[index].itemAttr[itemIn].showContent"></el-input>
                    <span v-else>{{config[index].itemAttr[itemIn].showContent}}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="deleteArr.indexOf('delete') === -1"
                    class="lineRow"
                    label="删除选项"
                  >
                    <el-button
                      type="primary"
                      @click="DeleteItem(itemIn)">
                      <i class="el-icon-delete"></i></el-button>

                  </el-form-item>
                  <el-form-item
                    v-if="deleteArr.indexOf('isDisabled') === -1"
                    class="lineRow"
                    label="禁用选项"
                  >
                    <el-checkbox v-model="config[index].itemAttr[itemIn].isDisabled" label="禁用"></el-checkbox>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'showAllCheckbox' && config[index].typeModel !== 'button'">
                <el-form label-position="right" label-width="80px">
                  <el-form-item
                    class="lineRow"
                    label="全选选项"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('showAllCheckbox') === -1"
                      v-model="config[index].showAllCheckbox"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].showAllCheckbox">显示</template>
                      <template v-else>隐藏</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'ableSelectedMin'">
                <el-form label-position="right" label-width="86px">
                  <el-form-item
                    class="lineRow"
                    label="可选最小值"
                  >
                    <el-input-number
                      v-if="deleteArr.indexOf('ableSelectedMin') === -1"
                      v-model="config[index].ableSelectedMin" :min="0"></el-input-number>
                    <span v-else>{{config[index].ableSelectedMin}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div
                v-else-if="indexIn === 'ableSelectedMax' && (config.CName !== 'CSelect' || config[index].isMultiple === true)">
                <el-form label-position="right" label-width="86px">
                  <el-form-item
                    class="lineRow"
                    label="可选最大值"
                  >
                    <el-input-number
                      v-if="deleteArr.indexOf('ableSelectedMax') === -1"
                      v-model="config[index].ableSelectedMax" :min="0"></el-input-number>
                    <span v-else>{{config[index].ableSelectedMax}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'currentSelectedGroup' && config[index].typeModel === 'selectGroup'">
                <el-form label-position="right" label-width="90px">
                  <el-form-item
                    class="lineRow"
                    label="控件选项值"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('currentSelectedGroupLabel') === -1"
                      v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].label"
                      @focus="focusSelect"
                      @change="selectValueChange"></el-input>
                    <span v-else>{{config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].label}}</span>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="显示内容"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('currentSelectedGroupShowcontent') === -1"
                      v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].showContent"></el-input>
                    <span v-else>{{config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].showContent}}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="deleteArr.indexOf('DeleteSelectGroup') === -1"
                    class="lineRow"
                    label="删除选项"
                  >
                    <el-button type="primary" @click="DeleteItemSelectGroup(itemIn)"><i class="el-icon-delete"></i>
                    </el-button>
                  </el-form-item>
                  <el-form-item
                    v-if="deleteArr.indexOf('isDisabledGroup') === -1"
                    class="lineRow"
                    label="禁用选项"
                  >
                    <el-checkbox v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].isDisabled"
                                 label="禁用"></el-checkbox>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isMultiple'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="多选"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('isMultiple') === -1"
                      v-model="config[index].isMultiple" label="多选" @change="doSelectMultiple"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].isMultiple">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="config[index].isMultiple === false && indexIn === 'isSelectClearable'">
                <el-form label-position="right" label-width="150px">
                  <el-form-item
                    class="lineRow"
                    label="单选时显示清除选项"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('isSelectClearable') === -1"
                      v-model="config[index].isSelectClearable"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].isSelectClearable">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isSelectFilterable'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="可搜索"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('isSelectFilterable') === -1"
                      v-model="config[index].isSelectFilterable"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].isSelectFilterable">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isSelectCreate'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="创建条目"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('isSelectCreate') === -1"
                      v-model="config[index].isSelectCreate" @change="doSelectCreate"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].isSelectCreate">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isSelectRemote'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="远程搜索"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('isSelectRemote') === -1"
                      v-model="config[index].isSelectRemote" @change="doSelectRemote"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].isSelectRemote">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                  <el-form-item
                    v-if="config[index].isSelectRemote"
                    class="lineRow"
                    label="远程加载时显示"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('selectLoadingText') === -1"
                      v-model="config[index].loadingText"></el-input>
                    <span v-else>{{config[index].loadingText}}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="config[index].isSelectFilterable"
                    class="lineRow"
                    label="搜索条件无匹配显示"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('noMatchText') === -1"
                      v-model="config[index].noMatchText"></el-input>
                    <span v-else>{{config[index].noMatchText}}</span>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="选项为空显示"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('noDataText') === -1"
                      v-model="config[index].noDataText"></el-input>
                    <span v-else>{{config[index].noDataText}}</span>
                  </el-form-item>
                </el-form>
              </div>

              <!--设置switch属性  start-->
              <div v-else-if="indexIn === 'switchStatus'">
                <el-form label-position="right" label-width="86px">
                  <el-form-item
                    class="lineRow"
                    label="设置开关值"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('addSwitchValue') === -1"
                      v-model="addSwitchValue"></el-checkbox>
                    <span v-else>
                      <template v-if="addSwitchValue">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                  <div v-if="itemIn">
                    <div v-if="addSwitchValue">
                      <el-form-item
                        class="lineRow"
                        label="打开时的值"
                      >
                        <el-input
                          v-if="deleteArr.indexOf('onSwitchValue') === -1"
                          v-model="config[index].onSwitchValue" @change="switchValue"></el-input>
                        <span v-else>{{config[index].onSwitchValue}}</span>
                      </el-form-item>
                      <el-form-item
                        class="lineRow"
                        label="增加值提示"
                      >
                        <el-checkbox
                          v-if="deleteArr.indexOf('showSwitchTooltip') === -1"
                          v-model="config[index].showSwitchTooltip"></el-checkbox>
                        <span v-else>
                          <template v-if="config[index].showSwitchTooltip">是</template>
                          <template v-else>否</template>
                        </span>
                      </el-form-item>
                    </div>
                    <el-form-item
                      class="lineRow"
                      label="打开时文字"
                    >
                      <el-input
                        v-if="deleteArr.indexOf('onText') === -1"
                        v-model="config[index].onText"></el-input>
                      <span v-else>{{config[index].onText}}</span>
                    </el-form-item>
                    <el-form-item
                      class="lineRow"
                      label="打开时背景"
                    >
                      <el-color-picker
                        v-if="deleteArr.indexOf('onFillColor') === -1"
                        v-model="config[index].onFillColor"></el-color-picker>
                      <div v-else class="showColor" :style="{'background-color': config[index].onFillColor}"></div>
                    </el-form-item>
                  </div>
                  <div v-else>
                    <div v-if="addSwitchValue">
                      <el-form-item
                        class="lineRow"
                        label="关闭时的值"
                      >
                        <el-input
                          v-if="deleteArr.indexOf('offSwitchValue') === -1"
                          v-model="config[index].offSwitchValue" @change="switchValue"></el-input>
                        <span v-else>{{config[index].offSwitchValue}}</span>
                      </el-form-item>
                      <el-form-item
                        class="lineRow"
                        label="增加值提示"
                      >
                        <el-checkbox
                          v-if="deleteArr.indexOf('showSwitchTooltip') === -1"
                          v-model="config[index].showSwitchTooltip"></el-checkbox>
                        <span v-else>
                          <template v-if="config[index].showSwitchTooltip">是</template>
                          <template v-else>否</template>
                        </span>
                      </el-form-item>
                    </div>
                    <el-form-item
                      class="lineRow"
                      label="关闭时文字"
                    >
                      <el-input
                        v-if="deleteArr.indexOf('offText') === -1"
                        v-model="config[index].offText"></el-input>
                      <span v-else>{{config[index].offText}}</span>
                    </el-form-item>
                    <el-form-item
                      class="lineRow"
                      label="关闭时背景"
                    >
                      <el-color-picker
                        v-if="deleteArr.indexOf('offFillColor') === -1"
                        v-model="config[index].offFillColor"></el-color-picker>
                      <div v-else class="showColor" :style="{'background-color': config[index].offFillColor}"></div>
                    </el-form-item>
                  </div>
                </el-form>
              </div> <!--设置switch属性  ended-->


              <!--设置slider  start-->
              <div v-else-if="indexIn === 'sliderStep'">
                <el-form label-position="right" label-width="86px" :model="config[index]" :rules="rulesSlider">
                  <el-form-item
                    prop="sliderStep"
                    class="lineRow"
                    label="控件步长"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('sliderStep') === -1"
                      v-model.number="config[index].sliderStep"></el-input>
                    <span v-else>{{config[index].sliderStep}}</span>
                  </el-form-item>
                  <el-form-item
                    v-if="config[index].typeModel === 'vertical'"
                    prop="height"
                    class="lineRow"
                    label="控件高度"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('sliderHeight') === -1"
                      v-model.number="config[index].height"></el-input>
                    <span v-else>{{config[index].height}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'sliderRange'">
                <el-form label-position="right" label-width="86px">
                  <el-form-item
                    class="lineRow"
                    label="范围选择"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('sliderRange') === -1"
                      v-model="config[index].sliderRange" label="范围" @change="rangeChange"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].sliderRange">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                  <div v-if="!config[index].sliderRange">
                    <el-form-item
                      class="lineRow"
                      label="显示输入框"
                    >
                      <el-checkbox
                        v-if="deleteArr.indexOf('sliderShowInput') === -1"
                        v-model="config[index].sliderShowInput"></el-checkbox>
                      <span v-else>
                        <template v-if="config[index].sliderShowInput">是</template>
                        <template v-else>否</template>
                      </span>
                    </el-form-item>
                  </div>
                  <div v-if="config[index].sliderShowInput">
                    <el-form-item
                      class="lineRow"
                      label="显示按钮"
                    >
                      <el-checkbox
                        v-if="deleteArr.indexOf('sliderShowInputButton') === -1"
                        v-model="config[index].sliderShowInputButton"></el-checkbox>
                      <span v-else>
                        <template v-if="config[index].sliderShowInputButton">是</template>
                        <template v-else>否</template>
                      </span>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'sliderShowStops'">
                <el-form label-position="right" label-width="86px">
                  <el-form-item
                    class="lineRow"
                    label="显示间断点"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('sliderShowStops') === -1"
                      v-model="config[index].sliderShowStops"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].sliderShowStops">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'sliderShowTooltip'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="显示提示"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('sliderShowStops') === -1"
                      v-model="config[index].sliderShowTooltip"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].sliderShowStops">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div> <!--设置slider  ended-->


              <!--设置datePicker  start-->
              <div v-else-if="indexIn === 'typeModel' && itemIn === 'time'">
                <el-form label-position="right" label-width="84px">
                  <el-form-item
                    class="lineRow"
                    label="固定时间点"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('timeFixed') === -1"
                      v-model="config[index].timeFixed"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].timeFixed">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                  <div v-if="config[index].timeFixed">
                    <el-form-item
                      class="lineRow"
                      label="起始时间"
                    >
                      <el-time-picker
                        v-if="deleteArr.indexOf('startTime') === -1"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="请输入起始时间"
                        @change="formatStartTime"
                        format="HH:mm"
                        v-model="startTime"></el-time-picker>
                      <span v-else>
                        <template v-if="config[index].rangeOfFixedEnd">{{config[index].timeStartend}}</template>
                        <template v-else>{{config[index].timeStart}}</template>
                      </span>
                    </el-form-item>
                    <el-form-item
                      class="lineRow"
                      label="时间间隔"
                    >
                      <el-time-picker
                        v-if="deleteArr.indexOf('stepTime') === -1"
                        v-model="stepTime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        @change="formatStepTime"
                        format="HH:mm"
                        placeholder="请输入间隔时间"></el-time-picker>
                      <span v-else>
                        <template v-if="config[index].rangeOfFixedEnd">{{config[index].timeStepend}}</template>
                        <template v-else>{{config[index].timeStep}}</template>
                      </span>
                    </el-form-item>
                    <el-form-item
                      class="lineRow"
                      label="结束时间"
                    >
                      <el-time-picker
                        v-if="deleteArr.indexOf('endTime') === -1"
                        v-model="endTime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        @change="formatEndTime"
                        format="HH:mm"
                        placeholder="请输入结束时间"></el-time-picker>
                      <span v-else>
                        <template v-if="config[index].rangeOfFixedEnd">{{config[index].timeEndend}}</template>
                        <template v-else>{{config[index].timeEnd}}</template>
                      </span>
                    </el-form-item>
                  </div>
                  <div v-if="!config[index].timeFixed">
                    <el-form-item
                      class="lineRow"
                      label="可选择范围"
                    >
                      <el-time-picker
                        v-if="deleteArr.indexOf('timeSelectableRange') === -1"
                        is-range
                        v-model="timeSelectableRange"
                        @change="formatSelectableRange"
                        placeholder="选择时间范围">
                      </el-time-picker>
                      <span v-else>{{config[index].timeSelectableRange}}</span>
                    </el-form-item>
                  </div>
                </el-form>
                <div>
                  <el-form label-position="right" label-width="112px">
                    <el-form-item
                      class="lineRow"
                      label="是否为范围选择"
                    >
                      <el-checkbox
                        v-if="deleteArr.indexOf('isRangeSelect') === -1"
                        v-model="config[index].isRangeSelect"></el-checkbox>
                      <span v-else>
                          <template v-if="config[index].isRangeSelect">是</template>
                          <template v-else>否</template>
                        </span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div v-else-if="indexIn === 'typeModel' && itemIn === 'date'">
                <el-form label-position="right" label-width="70px">
                  <div v-if="config[index].dateTypeModel === 'date' ||
                    config[index].dateTypeModel === 'daterange' ||
                    config[index].dateTypeModel === 'datetimerange'">
                    <el-form-item
                      class="lineRow"
                      label="是否带快捷选项"
                    >
                      <el-checkbox
                        v-if="deleteArr.indexOf('isHasShortcut') === -1"
                        v-model="config[index].isHasShortcut"></el-checkbox>
                      <span v-else>
                        <template v-if="config[index].isHasShortcut">是</template>
                        <template v-else>否</template>
                      </span>
                    </el-form-item>
                  </div>
                  <el-form-item
                    class="lineRow"
                    label="选择类型"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('dateTypeModel') === -1"
                      v-model="config[index].dateTypeModel">
                      <el-radio :key="radio.value" v-for="radio in config[index].dateType" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-for="item in config[index].dateType">
                        <template v-if="item.value === config[index].dateTypeModel">{{item.name}}</template>
                      </template>
                    </span>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="格式化"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('formatDate') === -1"
                      v-model="config[index].formatDate" placeholder="年yyyy月MM日dd小时HH分mm秒ss"></el-input>
                    <span v-else>{{config[index].formatDate}}</span>
                  </el-form-item>
                  <div
                    v-if="config[index].dateTypeModel === 'daterange' || config[index].dateTypeModel ===  'datetimerange'">
                    <el-form-item
                      class="lineRow"
                      label="选择范围时的分隔符"
                    >
                      <el-input
                        v-if="deleteArr.indexOf('rangeSeparator') === -1"
                        v-model="config[index].rangeSeparator"></el-input>
                      <span v-else>{{config[index].rangeSeparator}}</span>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'timeEditable' && !config[index].timeFixed">
                <el-form label-position="right" label-width="130px">
                  <el-form-item
                    class="lineRow"
                    label="文本框是否可输入"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('timeEditable') === -1"
                      v-model="config[index].timeEditable"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index].timeEditable">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isShowClearable'">
                <el-form label-position="right" label-width="130px">
                  <el-form-item
                    class="lineRow"
                    label="是否显示清除按钮"
                  >
                    <div v-if="config[index].rangeOfFixedEnd">
                      <el-checkbox
                        v-if="deleteArr.indexOf('isShowClearableend') === -1"
                        v-model="config[index].isShowClearableend"></el-checkbox>
                      <span v-else>
                        <template v-if="config[index].isShowClearableend">是</template>
                        <template v-else>否</template>
                      </span>
                    </div>
                    <div v-else>
                      <el-checkbox
                        v-if="deleteArr.indexOf('isShowClearable') === -1"
                        v-model="config[index].isShowClearable"></el-checkbox>
                      <span v-else>
                        <template v-if="config[index].isShowClearable">是</template>
                        <template v-else>否</template>
                      </span>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'defaultSwitchStatus'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="设默认值"
                  >
                    {{itemIn}}
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'defaultCheckboxSelected'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="设默认值"
                  >
                    {{itemIn}}
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'defaultSelected'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="设默认值"
                  >
                    {{itemIn}}
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'width' && config.CName === 'CSwitch'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件宽度"
                  >
                    <el-input-number v-model="config[index].width" :min="46"></el-input-number>
                  </el-form-item>
                </el-form>
              </div> <!--设置datePicker  ended-->


              <!--tag标签的属性 start-->
              <div v-else-if="indexIn === 'defaultTagName'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="标签名称"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('defaultTagName') === -1"
                      @change="changeConfig()"
                      v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'closable'">
                <el-form label-position="right" label-width="90px">
                  <el-form-item
                    class="lineRow"
                    label="可关闭状态"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('closable') === -1"
                      v-model="config[index][indexIn].closableStatus"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index][indexIn].closableStatus">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
                <div v-if="config[index][indexIn].closableStatus">
                  <el-form label-position="top" label-width="100px">
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
              <div v-else-if="indexIn === 'hit'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="是否描边"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('hit') === -1"
                      v-model="config[index][indexIn].hitStatus">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hitable" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index][indexIn].hitStatus">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'colorTag'">
                <div class="block">
                  <el-form label-position="right" label-width="70px">
                    <el-form-item
                      class="lineRow"
                      label="选背景色"
                    >
                      <el-color-picker
                        v-if="deleteArr.indexOf('colorTag') === -1"
                        v-model="config[index][indexIn]"></el-color-picker>
                      <div v-else class="showColor" :style="{'background-color': config[index][indexIn]}"></div>
                    </el-form-item>
                  </el-form>
                </div>
              </div> <!--tag标签的属性 ended-->


              <!--进度条的属性  start-->
              <div v-else-if="indexIn === 'value'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="设百分比"
                  >
                    <el-input @change="changeConfig()"
                              v-model.number="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'showText'">
                <el-form label-position="right" label-width="100px" class="left">
                  <el-form-item
                    class="lineRow"
                    label="是否显示文字"
                  >
                    <el-checkbox
                      v-if="deleteArr.indexOf('showTextStatus') === -1"
                      v-model="config[index][indexIn].showTextStatus"></el-checkbox>
                    <span v-else>
                      <template v-if="config[index][indexIn].showTextStatus">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                  <div v-if="config[index][indexIn].showTextStatus && config[index].typeModel === 'line'">
                    <el-form-item
                      class="lineRow"
                      label="文字显示位置"
                    >
                      <el-radio-group
                        v-if="deleteArr.indexOf('textInsideStatus') === -1"
                        v-model="config[index][indexIn].textInsideStatus">
                        <el-radio :key="radio.value" v-for="radio in config[index][indexIn].textInside" :label="radio.value">
                          {{radio.name}}
                        </el-radio>
                      </el-radio-group>
                      <span v-else>
                        <template v-for="item in config[index][indexIn].textInside">
                          <template v-if="item.value === config[index][indexIn].textInsideStatus">
                            {{item.name}}
                          </template>
                        </template>
                      </span>
                    </el-form-item>
                  </div>
                  <div v-if="config[index].typeModel === 'circle'">
                    <el-form-item
                      class="lineRow"
                      label="设环形宽度值"
                    >
                      <el-input @change="changeConfig()"
                                v-if="deleteArr.indexOf('textInsideStatus') === -1"
                                v-model.number="config[index][indexIn].circleWidth"></el-input>
                      <span v-else>{{config[index][indexIn].circleWidth}}</span>
                    </el-form-item>
                  </div>
                  <el-form-item
                    class="lineRow"
                    label="设线形宽度值"
                  >
                    <el-input @change="changeConfig()"
                              v-if="deleteArr.indexOf('strokeWidth') === -1"
                              v-model.number="config[index][indexIn].strokeWidth"></el-input>
                    <span v-else>{{config[index][indexIn].strokeWidth}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'progressStatus'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件状态"
                  >
                    <el-radio-group v-model="config[index][indexIn].progressStatusCurrent">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].status" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div> <!--进度条的属性  ended-->


              <!--badge标记的属性  start-->
              <div v-else-if="indexIn === 'badgeValue'">
                <el-form label-position="right" label-width="70px">
                  <div v-if="config[index].typeModel === 'string' && !config[index].isDot.dotStatus">
                    <el-form-item
                      class="lineRow"
                      label="字符串值"
                    >
                      <el-input type="input" @change="changeConfig()" placeholder="请输入"
                                v-if="deleteArr.indexOf('stringDefaultValue') === -1"
                                v-model="config[index][indexIn].defaultValue"></el-input>
                      <span v-else>{{config[index][indexIn].defaultValue}}</span>
                    </el-form-item>
                  </div>
                  <div v-if="config[index].typeModel === 'number' && !config[index].isDot.dotStatus">
                    <el-form-item
                      class="lineRow"
                      label="数字值"
                    >
                      <el-input type="input" @change="changeConfig()" placeholder="请输入"
                                v-if="deleteArr.indexOf('numberDefaultValue') === -1"
                                v-model.number="config[index][indexIn].defaultValue"></el-input>
                      <span v-else>{{config[index][indexIn].defaultValue}}</span>
                    </el-form-item>
                    <el-form-item
                      class="lineRow"
                      label="最大值"
                    >
                      <el-input type="input" @change="changeConfig()" placeholder="请输入最大值"
                                v-if="deleteArr.indexOf('max') === -1"
                                v-model.number="config[index][indexIn].max"></el-input>
                      <span v-else>{{config[index][indexIn].max}}</span>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'isDot'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="显示类型"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('isDot') === -1"
                      v-model="config[index][indexIn].dotStatus">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].dotAble" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-for="item in config[index][indexIn].dotAble">
                        <span v-if="item.value === config[index][indexIn].dotStatus"> {{item.name}} </span>
                      </template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'badgeStatus'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="标记状态"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('badgeStatus') === -1"
                      v-model="config[index][indexIn].hidden">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].hiddenAble" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index][indexIn].hidden">隐藏</template>
                      <template v-else>显示</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div> <!--badge标记的属性  ended-->


              <!--tabs标签页的属性  start-->
              <div v-else-if="indexIn === 'tabsStatus'">
                <el-form label-position="top" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="可增加"
                  >
                    <el-radio-group v-model="config[index][indexIn].addable">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].addStatus" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="可关闭"
                  >
                    <el-radio-group v-model="config[index][indexIn].closable">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].closeStatus" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    class="lineRow"
                    label="可同时增加和关闭"
                  >
                    <el-radio-group v-model="config[index][indexIn].editable">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].editStatus" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div> <!--tabs标签页的属性  ended-->


              <!--Dialog对话框的属性  start-->
              <div v-else-if="indexIn === 'top'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件位置"
                  >
                    <el-input type="input" @change="changeConfig()" placeholder="控件描述(非必填)"
                              v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'title'"> <!--Dialog对话框、Popover的title属性-->
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件标题"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('title') === -1"
                      type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'dialogSize'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件大小"
                  >
                    <el-radio-group v-model="config[index][indexIn].currentSize">
                      <el-radio :key="radio.name" v-for="radio in config[index][indexIn].sizeAble" :label="radio.name">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'modal'"> <!--Dialog对话框的model属性-->
                <el-form label-position="right" label-width="120px">
                  <el-form-item
                    class="lineRow"
                    label="是否需要遮罩层"
                  >
                    <el-radio-group v-model="config[index][indexIn].modal">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalAble" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="config[index][indexIn].modal">
                    <el-form-item
                      class="lineRow"
                      label="遮罩层插入位置"
                    >
                      <el-radio-group v-model="config[index][indexIn].modalPosition.modalPosition">
                        <el-radio :key="radio.value" v-for="radio in config[index][indexIn].modalPosition.modalPositionAble"
                                  :label="radio.value">
                          {{radio.name}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'lockScroll'"> <!--Dialog对话框的lockScroll属性-->
                <el-form label-position="right" label-width="130px">
                  <el-form-item
                    class="lineRow"
                    label="Dialog出现时锁定body滚动"
                  >
                    <el-radio-group v-model="config[index][indexIn].lockScroll">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].lockScrollAble"
                                :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'showClose'"> <!--Dialog对话框的showClose属性-->
                <el-form label-position="right" label-width="120px">
                  <el-form-item
                    class="lineRow"
                    label="是否显示关闭按钮"
                  >
                    <el-radio-group v-model="config[index][indexIn].showClose">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].showCloseAble" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div> <!--Dialog对话框的属性  ended-->


              <!--弹框MessageBox的属性  start-->
              <div v-else-if="indexIn === 'MessageBoxtitle'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件标题"
                  >
                    <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'confirmButtonText'">
                <el-form label-position="right" label-width="90px">
                  <el-form-item
                    class="lineRow"
                    label="确定按钮文字"
                  >
                    <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'cancelButtonText'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="取消按钮文字"
                  >
                    <el-input type="input" @change="changeConfig()" v-model="config[index][indexIn]"></el-input>
                  </el-form-item>
                </el-form>
              </div> <!--弹框MessageBox的属性  ended-->


              <!--Popover弹出框的属性  start-->
              <div v-else-if="indexIn === 'trigger'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="触发方式"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('triggerModel') === -1"
                      v-model="config[index].triggerModel">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-for="item in config[index][indexIn]">
                        <template v-if="item.value === config[index].triggerModel">{{item.name}}</template>
                      </template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'width'"> <!--Popover弹出框的width属性-->
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件宽度"
                  >
                    <el-input type="input" @change="changeConfig()"
                              v-if="deleteArr.indexOf('width') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'content'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件内容"
                  >
                    <el-input type="textarea" @change="changeConfig()"
                              v-if="deleteArr.indexOf('content') === -1"
                              v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'visibleArrow'"> <!--Popover弹出框的visibleArrow属性-->
                <el-form label-position="right" label-width="138px">
                  <el-form-item
                    class="lineRow"
                    label="是否显示Tooltip箭头"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('visibleArrow') === -1"
                      v-model="config[index][indexIn].visibleArrow">
                      <el-radio :key="radio.value" v-for="radio in config[index][indexIn].visibleArrowAble"
                                :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>
                      <template v-if="config[index][indexIn].visibleArrow">是</template>
                      <template v-else>否</template>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'offset'"> <!--Popover弹出框的offset属性-->
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="位置偏移"
                  >
                    <el-input type="input" @change="changeConfig()"
                              v-if="deleteArr.indexOf('offset') === -1"
                              v-model.number="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else-if="indexIn === 'placement'"> <!--Popover弹出框的位置属性-->
                <el-form label-position="top" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="控件位置"
                  >
                    <el-radio-group
                      v-if="deleteArr.indexOf('placement') === -1"
                      v-model="config[index][indexIn].placement">
                      <el-radio :key="radio.name" v-for="radio in config[index][indexIn].placementAble" :label="radio.name">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div> <!--Popover弹出框的属性  ended-->
            </div>
          </div><!--基本属性 ended-->

          <!--CKey属性  start-->
          <div v-else-if="index === 'CKey'">
            <div v-for="(itemIn, indexIn) in item">
              <div v-if="indexIn === 'default'">
                <el-form label-position="right" label-width="70px">
                  <el-form-item
                    class="lineRow"
                    label="设默认值"
                  >
                    <el-input
                      v-if="deleteArr.indexOf('CKey') === -1"
                      @change="changeConfig()" placeholder="控件默认值"
                      v-model="config[index][indexIn]"></el-input>
                    <span v-else>{{config[index][indexIn]}}</span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div> <!--CKey属性  ended-->

          <!--Status属性  start-->
          <div v-else-if="index === 'Status'">
            <el-form label-position="right" label-width="70px">
              <el-form-item
                class="lineRow"
                label="控件状态"
              >
                <el-checkbox
                  v-if="deleteArr.indexOf('Status') === -1"
                  v-model="item.status"></el-checkbox>
                <span v-else>
                  <template v-for="item in config[index].rules">
                    <template v-for="itemList in config[index].ruleList">
                      <span v-if="item.value === itemList"> {{item.name}} </span>
                    </template>
                  </template>
                </span>
              </el-form-item>
              <div v-if="item.status">
                <el-form-item class="lineRow"  v-if="deleteArr.indexOf('Status') === -1">
                  <el-checkbox-group v-model="config[index].ruleList">
                    <el-checkbox :key="checkbox.value" v-for="checkbox in config[index].rules" :label="checkbox.value">
                      {{checkbox.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-form>
          </div> <!--Status属性  ended-->

          <!--Icon属性  start-->
          <div v-else-if="index === 'Icon'">
            <el-form label-position="right" label-width="70px" v-if="deleteArr.indexOf('Icon') === -1">
              <el-form-item
                class="lineRow"
                label="控件图标"
              >
                <el-checkbox @change="iconStatusChange(item)" v-model="item.status"></el-checkbox>
              </el-form-item>
              <div v-if="item.status">
                <el-form-item>
                  <el-button @click="chooseIcon(item)" type="primary" size="small" icon="edit">选择图标</el-button>
                  <c-icon @postIcon="setIcon" v-if="item.chooseStatus"></c-icon>
                </el-form-item>
                <div v-if="item.position!=''&&item.position.length>0&&item.status&&(item.className!='')">
                  <el-form-item>
                    <br/>
                    <div>图标放置位置</div>
                    <el-radio-group v-model="item.positionModel">
                      <el-radio v-for="radio in item.position" :key="radio.value" :label="radio.value">
                        {{radio.name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div> <!--Icon属性  ended-->

          <!--CValidate属性  start-->
          <div v-else-if="index === 'CValidate'">
            <el-form label-position="right" label-width="70px" v-if="deleteArr.indexOf('CValidate') === -1">
              <el-form-item
                class="lineRow"
                label="控件验证"
              >
                <el-checkbox
                  @change="validateStatusChange(item)" v-model="item.status"></el-checkbox>
              </el-form-item>
              <div v-if="item.status">
                <el-form-item>
                  <el-button @click="chooseValidate(item)" type="primary" size="small" icon="edit">选择验证规则</el-button>
                  <c-validate @postValidate="setValidate" v-if="item.chooseStatus"></c-validate>
                </el-form-item>
              </div>
            </el-form>
          </div> <!--CValidate属性  ended-->

          <!--CLayout属性  start-->
          <div v-else-if="index === 'CLayout'">
            <el-form label-position="top" label-width="70px">
              <el-form-item class="lineRow" label="布局">
                <el-radio-group
                  v-if="deleteArr.indexOf('CLayout') === -1"
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
                <span v-else>
                  <template v-for="item in config.CLayout">
                    <span v-if="item.value === config.layoutModel"> {{item.name}} </span>
                  </template>
                </span>
              </el-form-item>

              <el-form-item class="lineRow">
                <div v-if="config.layoutModel==='percentLayout' && config.currentLayout">
                  {{config.currentLayout.name}}：
                  <el-input
                    v-if="deleteArr.indexOf('percentLayout') === -1"
                    @change="validateLayout(config.currentLayout,config.layoutModel)"
                    v-model="config.currentLayout.default"
                    :placeholder="config.currentLayout.name"
                    :maxlength=3
                  ></el-input>
                  <span v-else>{{config.currentLayout.default}}</span>
                </div>
                <div v-else-if="config.layoutModel==='pixelLayout' && config.currentLayout">
                  {{config.currentLayout.name}}：
                  <el-input
                    v-if="deleteArr.indexOf('pixelLayout') === -1"
                    @change="validateLayout(config.currentLayout,config.layoutModel)"
                    v-model="config.currentLayout.default"
                    :placeholder="config.currentLayout.name"
                    :maxlength=3
                  ></el-input>
                  <span v-else>{{config.currentLayout.default}}</span>
                </div>
                <div v-else-if="config.layoutModel==='flexLayout' && config.currentLayout">
                  {{config.currentLayout.name}}：
                  <el-input
                    v-if="deleteArr.indexOf('flexLayout') === -1"
                    @change="validateLayout(config.currentLayout,config.layoutModel)"
                    v-model="config.currentLayout.default"
                    :placeholder="config.currentLayout.name"
                    :maxlength=3
                  ></el-input>
                  <span v-else>{{config.currentLayout.default}}</span>
                </div>
                <div v-else-if="config.layoutModel==='columnLayout' && config.currentLayout">
                  {{config.currentLayout.name}}：
                  <el-input
                    v-if="deleteArr.indexOf('columnLayout') === -1"
                    @change="validateLayout(config.currentLayout,config.layoutModel)"
                    v-model="config.currentLayout.default"
                    :placeholder="config.currentLayout.name"
                    :maxlength=3
                  ></el-input>
                  <span v-else>{{config.currentLayout.default}}</span>
                </div>
              </el-form-item>
              <!--xyl-->
            </el-form>
          </div> <!--CLayout属性  ended-->

          <!--Demo start-->
          <!--<div v-else-if="index === ''">-->
          <!--<el-form label-position="right" label-width="70px">-->
          <!--<el-form-item-->
          <!--class="lineRow"-->
          <!--label=""-->
          <!--&gt;-->
          <!--<el-input-->
          <!--@change="changeConfig()"-->
          <!--v-model="config[index]"-->
          <!--placeholder=""-->
          <!--&gt;</el-input>-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <!--</div>&lt;!&ndash;Demo ended&ndash;&gt;-->
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
    props: ['fConfig', 'selectControl', 'formOBJ', 'properties', 'tabStatus', 'Methods'],
    destroy () {
      console.info(`destroy`)
    },
    data () {
      return {
        config: null,
        propertyArray: [],
        methodArray: [],
        defaultProps: {
          children: 'for_null', // 不显示子节点配置。如果为属性集。则绑定到属性集控件
          label: 'edmpName',
          value: 'edmpCode',
          disabled: 'disabled'
        },
        methodProps: {
          children: 'for_null', // 不显示子节点配置。如果为属性集。则绑定到属性集控件
          label: 'edmmTypeName',
          value: 'edmmName',
          disabled: 'disabled'
        },
        activeSetting: 'formSetting',
        startTime: '',
        stepTime: '',
        endTime: '',
        timeSelectableRange: new Date(),
        addSwitchValue: false, // 是否增加switch值
        currentIndex: 0, // 当前选中项在默认值的index(多选)
        selectedGroup: {
          label: '',
          options: {label: '', showContent: '', isDisabled: false}
        },
        rules: { // radio和checkbox label值校验
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
        rulesAdd: {
          label: [
            {required: true, message: '请输入选项值'},
            {
              validator: (rules, value, callback) => {
                this.config.CAttribute.itemAttr.forEach((item, index) => {
                  if (item.label === value && index !== this.config.CAttribute.itemAttr.length - 1) {
                    this.config.CAttribute.itemAttr[this.config.CAttribute.itemAttr.length - 1].label = ''
                    callback(new Error('选项值不可以重复'))
                  }
                })
                callback()
              }
            }
          ]
        }
      }
    },
    watch: {
      selectControl (val) {
        if (val.config.ControlProperties === '') {
          this.propertyArray = []
        } else {
          let tempArray = []
          tempArray.push(val.config.ControlProperties)
          this.propertyArray = tempArray
        }
        if (this.formOBJ.selected) {
          this.config = this.formOBJ.selected.config
        }
        if (this.tabStatus && val.config.ControlProperties !== '') {
          this.activeSetting = 'controlSetting'
        } else if (!this.tabStatus && val.config.ControlProperties === '') {
          this.activeSetting = 'formSetting'
        }
      },
      propertyArray (val) {
        if (this.selectControl !== null) {
          this.selectControl.config.ControlProperties = val.toString()
          for (let key in this.properties.states) {
            if (this.properties.states[key].edmpCode === val.toString()) {
              this.properties.states[key].controlId = this.selectControl.config.ControlID
              this.properties.states[key].disabled = true
            } else if (this.properties.states[key].controlId === this.selectControl.config.ControlID && this.properties.states[key].edmpCode !== val.toString()) {
              this.properties.states[key].controlId = null
              this.properties.states[key].disabled = false
            }
          }
        }
      },
      methodArray (val) {
        if (this.selectControl !== null) {
          this.selectControl.config.methodDBModel = val.toString()
          for (let key in this.Methods.states) {
            if (this.Methods.states[key].edmmName === val.toString()) {
              this.Methods.states[key].controlId = this.selectControl.config.ControlID
              this.Methods.states[key].disabled = true
            } else if (this.Methods.states[key].controlId === this.selectControl.config.ControlID && this.Methods.states[key].edmmName !== val.toString()) {
              this.Methods.states[key].controlId = null
              this.Methods.states[key].disabled = false
            }
          }
        }
      },
      config () {
        if (this.config) {
          this.deleteArr = []
          let key = this.config.CName
          let del = JSON.parse(localStorage.getItem('deleteAttribute'))[key]
          if (del) {
            this.deleteArr = del
          }
        }
      },
      'config.CAttribute.rangeOfFixedEnd' () {
        this.startTime = ''
        this.stepTime = ''
        this.endTime = ''
      }
    },
    mounted () {
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
      changeTab (values, status) {
        if (!this.selectControl && !this.tabStatus) {
          console.info('没选控件,你切个鬼啊')
          return
        }
        if (status) {
          if (!this.selectControl.config.ControlProperties && !this.tabStatus) {
            console.info('没选值。你切个屁啊')
          } else {
            this.activeSetting = values
          }
        } else {
          this.activeSetting = values
        }
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
        // console.error(`validateLayout`)
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
    padding-top .3rem

  .propertiesNoneParent
    .propertiesDiv
      text-align center
      .propertiesNone
        margin 0 .3rem .4rem !important
        display inline-block

  .DivForLine
    height 0
    margin .3rem 0
    border-bottom 1px solid #e1e1e1
    opacity .3

  .type
    margin 0px 15px 3px 0 !important

  .el-input__inner, .el-textarea__inner
    margin-top 4px
  .inputSetting
    display block
    margin-top 15px
</style>
