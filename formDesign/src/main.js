import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import ApiUtils from 'api/api-utils'
import AppUtils from 'api/app-utils'
import API from 'api/formAPI'
import Utils from 'api/utils'
import _ from 'lodash'
import 'element-ui/lib/theme-default/index.css'
import CPackage from '@/components/controls'
import ExPackage from '@/components/extend'
import '@/assets/fonts/icon.styl'
import FontLibrary from '@/assets/js/FontLibrary'

CPackage.install() // 安装所有 工具
ExPackage.install() // 扩展组件 安装

Vue.prototype.ApiUtils = ApiUtils // 拓展 axios
Vue.prototype.AppUtils = AppUtils // 拓展 element-ui 提示组件
Vue.prototype.Utils = Utils // lodash&moment 工具函数
Vue.prototype.I = FontLibrary // 图标库

Vue.prototype.API = API // 表单接口
Vue.prototype.L = _ // 拓展全局lodash 方法
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
