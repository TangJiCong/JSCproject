import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import("../views/index.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/register.vue")
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("../views/admin.vue")
  },
  {
    path: '/addNews',
    name: 'adddNews',
    component: () => import("../views/addNews.vue")
  },
  {
    path: '/uppNews/:newsId',
    name: 'uppNews',
    component: () => import("../views/uppNews.vue")
  },
  {
    path: '/addList',
    name: 'addList',
    component: () => import("../views/addList.vue")
  },
  {
    path: '/info/:newsId',
    name: 'info',
    component: () => import("../views/info.vue")
  },
  {
    path: '/my',
    name: 'my',
    component: () => import("../views/my.vue")
  },
  {
    path: '/test',
    name: 'test',
    component: () => import("../views/test.vue")
  },
  {
    path: '*',
    name: 'error',
    component: () => import("../views/404.vue")
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  var isLogin = localStorage.getItem("userInfo");
  //console.log(isLogin)
  if(isLogin){
    if(to.path == '/login' || to.path == '/register'){
      next({name:"index"})
    }else{
      next()
    }
  }else{
    if(to.path == '/login' || to.path == '/register' || to.path == "/"){
      next();
    }else{
      alert('您还没有登录，请先登录');
      next({name:"login"});
    }
  }
  
})

export default router
