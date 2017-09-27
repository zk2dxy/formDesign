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

CPackage.install()

Vue.prototype.ApiUtils = ApiUtils
Vue.prototype.AppUtils = AppUtils
Vue.prototype.Utils = Utils
Vue.prototype.API = API
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(_)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
