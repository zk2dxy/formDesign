import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Stylus from '@/components/stylus'

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
    path: '/stylus',
    name: 'stylus',
    component: Stylus
  }]
})
