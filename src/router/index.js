import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pyy from '@/components/Pangyy.vue'
import Xyl from '@/components/Xuanyl.vue'
import Mtw from '@/components/Mtw'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/HelloWorld'
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
  }]
})
