import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

// 扩展工具类
import AppUtils from 'api/app-utils'

// 路由模块
import Root from '@/router/module/Root'
import DebugModule from '@/router/module/DebugModule'
import PageModule from '@/router/module/PageModule'

Vue.use(Router)

// 根目录
const rootRouter = []

// 合并所有路由
let router = _.concat(rootRouter, Root, DebugModule, PageModule)

const Routers = new Router({
  routes: router
})

// 遍历 router 的有效性
Routers.beforeEach((to, from, next) => {
  if (to.matched.length > 0) {
    next()
  } else {
    AppUtils.showError('错误的路径', 1000)
    Routers.replace('/')
  }
})

export default Routers
