import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import leftMove from '../components/leftMove'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'leftMove',
      component: leftMove
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
