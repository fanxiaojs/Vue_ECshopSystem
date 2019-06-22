import Vue from 'vue'
import Router from 'vue-router'

//引入对应的组件
import Home from '@/components/home/home.vue'
import Login from '@/components/login/login.vue'
import Users from '../components/users/users.vue'

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
      component: Home,
      children: [{
        path: '/users',
        component: Users
      }]
    }
  ]
})
