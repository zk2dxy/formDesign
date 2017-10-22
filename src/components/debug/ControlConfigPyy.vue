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
                <div v-else-if="indexIn === 'size' && (config.CAttribute.typeModel==='button' || config.CName === 'CSelect')">
                  <p>控件尺寸</p>
                  <el-radio-group v-model="config[index].sizeModel">
                    <el-radio :key="radio.value" v-for="radio in config[index][indexIn]" :label="radio.value">
                      {{radio.name}}
                    </el-radio>
                  </el-radio-group>
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
                      <el-input v-model="config[index].itemAttr[itemIn].label"></el-input>
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
                  <p>可勾选最小量</p>
                  <el-input-number v-model="config[index].ableSelectedMin" :min="0"></el-input-number>
                </div>
                <div v-else-if="indexIn === 'ableSelectedMax' && (config.CName !== 'CSelect' || config[index].isMultiple === true)">
                  <p>可选最大量</p>
                  <el-input-number v-model="config[index].ableSelectedMax" :min="0"></el-input-number>
                </div>
                <!--设置select选项属性-->
                <div v-else-if="indexIn === 'currentSelectedGroup' && config[index].typeModel === 'selectGroup'">
                  <p>控件选项值</p>
                  <el-input v-model="config[index].itemAttrSelectGroup[itemIn[0]].options[itemIn[1]].label"></el-input>
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
//          this.config.CAttribute.itemAttrSelectGroup.forEach((item, index) => {
//            if (this.selectedGroup.label === item.label) {
//              item.options.push(this.selectedGroup.options)
//              console.log(11)
//              return
//            } else if (index === this.config.CAttribute.itemAttrSelectGroup.length - 1) {
//              console.log(22)
//              this.config.CAttribute.itemAttrSelectGroup.push({
//                label: this.selectedGroup.label,
//                options: [this.selectedGroup.options]
//              })
//            }
//          })
        }
        this.config.CAttribute.addStatus = false
      },
      DeleteItem (index) {
        this.config.CAttribute.itemAttr.splice(index, 1)
        this.config.CAttribute.currentSelected = 0
        this.config.CAttribute.defaultSelected = ''
      },
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
      }
    },
    data () {
      return {
//        un: (rules, value, callback) => {
//          this.config.CAttribute.itemAttr.forEach((item, index) => {
//            if (item.label === value && index !== this.config.CAttribute.currentSelected) {
//              this.config.CAttribute.itemAttr[this.config.CAttribute.currentSelected].label = ''
//              callback(new Error('选项值不可以重复'))
//            }
//          })
//          callback()
//        },
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
        rulesAdd: {
          label: [
            { required: true, message: '请输入选项值' }
//            {
//              validator: (rules, value, callback) => {
//                console.log('errrrrrrrrrr')
//                this.config.CAttribute.itemAttr.forEach((item, index) => {
//                  if (item.label === value && index !== this.config.CAttribute.itemAttr.length - 1) {
//                    this.config.CAttribute.itemAttr[this.config.CAttribute.itemAttr.length - 1].label = ''
//                    callback(new Error('选项值不可以重复'))
//                  }
//                })
//                callback()
//              }
//            }
          ]
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
  .input__inner
    margin-bottom 14px
</style>
