import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Pyy from '@/components/Pangyy'
import Xyl from '@/components/Xuanyl'
import Mtw from '@/components/Mtw'
import Xx from '@/components/Xx'
import Form from '@/components/Form'
import ControlsManage from '@/components/controls-manage/ControlsManage'
import PyyTest from '@/components/controls-manage/PyyTest'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/HelloWorld'
  }, {
    path: '/Form',
    name: 'Form',
    alias: '/Index',
    component: Form
  }, {
    path: '/HelloWorld',
    name: 'TEST',
    component: HelloWorld
  }, {
    path: '/Pyy',
    name: 'Pyy',
    component: Pyy
  }, {
    path: '/Xyl',
    name: 'Xyl',
    component: Xyl
  }, {
    path: '/Mtw',
    name: 'Mtw',
    component: Mtw
  }, {
    path: '/Xx',
    name: 'Xx',
    component: Xx
  }, {
    path: '/ControlsManage',
    name: 'ControlsManage',
    component: ControlsManage
  }, {
    path: '/PyyTest',
    name: 'PyyTest',
    component: PyyTest
  }]
})
