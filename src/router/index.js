import Vue from 'vue'
import Router from 'vue-router'
//引入login组件
import Login from '@/components/login/login.vue'
//引入Home组件
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //添加一个login路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //添加一个home路由
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
