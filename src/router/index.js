import Vue from 'vue'
import Router from 'vue-router'
//单独引入
import {
  message
} from 'element-ui'

//引入对应的组件
import Home from '@/components/home/home.vue'
import Login from '@/components/login/login.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import Categories from '../components/categories/categories.vue'
import {
  Message
} from '_element-ui@2.9.1@element-ui';
import Goods from '../components/goods/goods.vue'
import GoodsAdd from '../components/goods/goodsAdd.vue'
Vue.use(Router)

let router = new Router({
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
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/goodsAdd',
          component: GoodsAdd
        }
      ]
    }
  ]
})



//添加一个全局前置守卫
router.beforeEach((to, from, next) => {
  //判断请求的路由是否是login
  if (to.name != 'login') {
    //如果是则进入
    // 获取token
    let token = localStorage.getItem('token')
    //判断:是否存在token
    if (!token) {
      Message.error('请先登录')
      //跳转到Login路由
      router.push('/login')
    } else {
      //存在则继续执行
      next()
    }
  } else {
    //不是 继续执行
    next()
  }
})


export default router
