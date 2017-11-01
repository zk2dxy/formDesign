<template>
  <div class="CUpload" @click="ControlClick()">
    <div v-if="config && (!ControlID)" @click.stop>
      <div class="title">
        {{config.CTitleCN}}
      </div>
      <!--upload-->
      <!--点击上传-->
      <div v-if="config.CAttribute.typeModel === 'uploadClick'">
        <el-upload
          class="upload-demo"
          :action="config.CAttribute.actionUrl"
          :show-file-list="config.CAttribute.uploadShowFileFlag"
          :multiple="config.CAttribute.uploadMultiple"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">{{config.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--用户头像上传-->
      <div v-if="config.CAttribute.typeModel === 'uploadAvatar'">
        <el-upload
          class="avatar-uploader"
          :action="config.CAttribute.actionUrl"
          :show-file-list="config.CAttribute.uploadShowFileFlag"
          :on-success="handleUploadSuccess">
          <img
            v-if="config.CAttribute.uploadFileList.length > 0 && config.CAttribute.uploadFileList[config.CAttribute.uploadFileList.length - 1].imageUrl"
            :src="config.CAttribute.uploadFileList[config.CAttribute.uploadFileList.length - 1].imageUrl"
            class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!--照片墙-->
      <div v-if="config.CAttribute.typeModel === 'uploadPhotos'">
        <el-upload
          :action="config.CAttribute.actionUrl"
          :show-file-list="config.CAttribute.uploadShowFileFlag"
          :multiple="config.CAttribute.uploadMultiple"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <!--图片列表-->
      <div v-if="config.CAttribute.typeModel === 'uploadImageList'">
        <el-upload
          class="upload-demo"
          :action="config.CAttribute.actionUrl"
          :show-file-list="config.CAttribute.uploadShowFileFlag"
          :multiple="config.CAttribute.uploadMultiple"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">{{config.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--拖拽上传-->
      <div v-if="config.CAttribute.typeModel === 'uploadDrag'">
        <el-upload
          class="upload-demo"
          drag
          :action="config.CAttribute.actionUrl"
          :show-file-list="config.CAttribute.uploadShowFileFlag"
          :multiple="config.CAttribute.uploadMultiple">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">{{config.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--手动上传-->
      <div v-if="config.CAttribute.typeModel === 'uploadManual'">
        <el-upload class="upload-demo" ref="upload"
                   :action="config.CAttribute.actionUrl"
                   :show-file-list="config.CAttribute.uploadShowFileFlag"
                   :multiple="config.CAttribute.uploadMultiple"
                   :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">{{config.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
    </div>
    <div v-else>
      <div class="title">
        {{ControlConfig.CTitleCN}}
      </div>
      <!--upload-->
      <!--点击上传-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadClick'">
        <el-upload
          class="upload-demo"
          :action="ControlConfig.CAttribute.actionUrl"
          :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
          :multiple="ControlConfig.CAttribute.uploadMultiple"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">{{ControlConfig.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--用户头像上传-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadAvatar'">
        <el-upload
          class="avatar-uploader"
          :action="ControlConfig.CAttribute.actionUrl"
          :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
          :on-success="handleUploadSuccess">
          <img
            v-if="ControlConfig.CAttribute.uploadFileList.length > 0 && ControlConfig.CAttribute.uploadFileList[ControlConfig.CAttribute.uploadFileList.length - 1].imageUrl"
            :src="ControlConfig.CAttribute.uploadFileList[ControlConfig.CAttribute.uploadFileList.length - 1].imageUrl"
            class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!--照片墙-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadPhotos'">
        <el-upload
          :action="ControlConfig.CAttribute.actionUrl"
          :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
          :multiple="ControlConfig.CAttribute.uploadMultiple"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <!--图片列表-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadImageList'">
        <el-upload
          class="upload-demo"
          :action="ControlConfig.CAttribute.actionUrl"
          :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
          :multiple="ControlConfig.CAttribute.uploadMultiple"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">{{ControlConfig.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--拖拽上传-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadDrag'">
        <el-upload
          class="upload-demo"
          drag
          :action="ControlConfig.CAttribute.actionUrl"
          :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
          :multiple="ControlConfig.CAttribute.uploadMultiple">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">{{ControlConfig.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
      <!--手动上传-->
      <div v-if="ControlConfig.CAttribute.typeModel === 'uploadManual'">
        <el-upload class="upload-demo" ref="upload"
                   :action="ControlConfig.CAttribute.actionUrl"
                   :show-file-list="ControlConfig.CAttribute.uploadShowFileFlag"
                   :multiple="ControlConfig.CAttribute.uploadMultiple"
                   :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">{{ControlConfig.CAttribute.uploadFileDesc}}</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 控件配置、表单配置、数据来源配置
  // props: ['ControlConfig', 'FormConfig', 'OriginDataConfig', 'value'],
  export default {
    name: `CUpload`,
    props: {
      ControlConfig: {
        type: Object
      },
      ControlID: {
        type: String,
        default: null
      },
      formOBJ: {
        type: Object
      },
      formItem: {
        type: Object
      }
    },
    created () {
      this.config = this.initConfig
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
    },
    mounted () {
      this.config = this.initConfig
      if (this.ControlConfig) {
        this.config = this.ControlConfig
      }
      if (this.ControlID && (!this.config.ControlID)) {
        this.config.ControlID = this.ControlID
      }
      this.$emit('input', this.config)
    },
    updated () {
    },
    /* keep-alive 组件激活时调用。 */
    activated () {
    },
    /* keep-alive 组件停用时调用。 */
    deactivated () {
    },
    watch: {
      'config.CKey.default' (val, old) {
        // console.log(val)
      }
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      ControlClick () {
        this.formOBJ.mutations.selectObj(this.formOBJ, this.formItem)
        this.$emit('changeTAB', this.formItem)
      },
//      点击upload
      uploadItem (currentIndex) {
        this.config.CAttribute.uploadCurrent = currentIndex
      },
//      上传成功事件
      handleUploadSuccess (res, file) {
        this.config.CAttribute.uploadFileList.push({name: file.name, imageUrl: URL.createObjectURL(file.raw)})
      },
//      文件列表移除时的操作
      handleUploadRemove () {
        this.config.CAttribute.uploadFileList.pop()
      }
    },
    data () {
      return {
        initConfig: {
          ControlID: '', // 表单生成后的控件id
          CBelong: 'form',
          CTitleEN: 'upload Control', // 英文标题
          CName: 'CUpload', // 控件名称
          CLayout: { // 布局
            percentLayout: { // 百分比布局
              type: Number,
              default: 100,
              status: true
            },
            pixelLayout: { // 像素布局
              type: Number,
              default: 100,
              status: true
            },
            flexLayout: { // flex 布局
              type: Number,
              default: 1,
              status: false
            },
            columnLayout: { // 栅格布局
              type: Number,
              default: 12,
              status: false
            }
          },
          CAttribute: {
            actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
            uploadFileList: [],
            uploadFileDesc: '上传说明', // 上传文件说明
            uploadFileType: 'jpg', // 上传的文件类型
            uploadSize: '500kb',
            uploadMultiple: false, // 是否支持多选文件
            uploadMultipleList: [{
              multiple: [{
                label: '是',
                multipleFlag: true
              }, {
                label: '否',
                multipleFlag: false
              }]
            }],
            uploadDrag: false, // 是否启用拖拽上传
            uploadDragList: [{
              drag: [{
                label: '是',
                dragFlag: true
              }, {
                label: '否',
                dragFlag: false
              }]
            }],
            uploadShowFileFlag: true, // 是否显示已上传文件列表
            uploadShowFileList: [{
              option: [{
                optionFlag: true,
                label: '是'
              }, {
                optionFlag: false,
                label: '否'
              }]
            }],
            uploadCurrent: 0, // 点击当前卡片的值
            type: [{
              value: 'uploadClick',
              name: '点击上传'
            }, {
              value: 'uploadAvatar',
              name: '用户头像上传'
            }, {
              value: 'uploadPhotos',
              name: '照片墙'
            }, {
              value: 'uploadImageList',
              name: '图片列表'
            }, {
              value: 'uploadDrag',
              name: '拖拽上传'
            }, {
              value: 'uploadManual',
              name: '手动上传'
            }], // input 类型 text number......and so on
            typeModel: 'uploadClick',
            description: '', // 描述
            height: '', // 高度
            vertical: ['top', 'middle', 'bottom'] // 对齐方式
          },
          CKey: { // 控件值
            default: '', // 默认值
            type: '', // 控件值类型
            keyMethods: '' // 计算控件值方法
          },
          Status: { // 状态
            status: false, // 是否应用状态
            rules: [
              {
                value: 'readonly',
                name: '只读'
              },
              {
                value: '',
                name: '隐藏'
              }
            ], // 控件规则集合
            ruleList: [] // 选择集合
          },
          Icon: {
            status: false, // 是否启用icon
            chooseStatus: false, // 是否启用CIcon控件去选择图标
            position: [{ // 控件位置 (中文显示名称/英文属性名称)
              name: '左侧',
              value: 'left'
            }, {
              name: '右侧',
              value: 'right'
            }],
            positionModel: '', // 绑定的图标位置
            className: '', // 类名
            content: '', // 图标content
            title: '', // 图标标题
            library: '' // 图标库
          },
          CValidate: {
            status: false,
            chooseStatus: false,
            validateModel: ''
          },
          methodDB: [{
            name: '提交', // 中文名称（Example）
            methodName: 'save', // 英文名称 (Example)
            action: '/form/saveAction' // postAction(接口名称)
          }]
        },
        currentConfig: null,
        config: null,
        validate: ''
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/css/stylus/mixin"
  .title
    padding 8px 0px
    color $font-primary
    font-size $font-medium

  .CDom
    color $font-danger

  //    upload样式
  .avatar-uploader-icon
    border 1px dashed #d9d9d9
    font-size 28px
    color #8c939d
    width 150px
    height 150px
    line-height 150px
    text-align center

  .avatar-uploader .avatar
    width 150px
    height 150px
</style>
