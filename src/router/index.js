import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

// import HelloWorld from '@/components/HelloWorld'
// import Pyy from '@/components/Pangyy'
// import Xyl from '@/components/Xuanyl'
// import Mtw from '@/components/Mtw'
// import Xx from '@/components/Xx'
// import Form from '@/components/Form'
// import ControlsManage from '@/components/controls-manage/ControlsManage'
// import PyyTest from '@/components/controls-manage/PyyTest'

// import DebugModule from '@/router/DebugModule'
import PageModule from '@/router/PageModule'

Vue.use(Router)

const rootRouter = [{
  path: '/',
  name: 'HelloWorld',
  component: () => import('@/components/HelloWorld')
}]

// let router = _.concat(rootRouter, DebugModule, PageModule)
let router = _.concat(rootRouter, PageModule)

// export default new Router({
//   routes: [{
//     path: '/',
//     redirect: '/HelloWorld'
//   }, {
//     path: '/Pyy',
//     name: 'Pyy',
//     component: Pyy
//   }, {
//     path: '/Xyl',
//     name: 'Xyl',
//     component: Xyl
//   }, {
//     path: '/Mtw',
//     name: 'Mtw',
//     component: Mtw
//   }, {
//     path: '/Xx',
//     name: 'Xx',
//     component: Xx
//   }, {
//     path: '/ControlsManage',
//     name: 'ControlsManage',
//     component: ControlsManage
//   }, {
//     path: '/PyyTest',
//     name: 'PyyTest',
//     component: PyyTest
//   }]
// })

export default new Router({
  router: router
})
