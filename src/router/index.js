import Vue from "vue";
import VueRouter from "vue-router";

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
// return routerPush.call(this, location).catch(error=> error)
// }

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import('../views/Index.vue'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path:"/info",
    name:"Info",
    component: () => import('../views/Info.vue'),
    meta: {
      title: '文章详情',
      keepAlive: true
    }
  },

  {
    path:"/detail",
    name:"Detail",
    component: () => import('../views/Detail.vue'),
    meta: {
      title: '章节详情',
      keepAlive: false
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import('../views/Search.vue'),
    meta: {
      title: '搜索',
      keepAlive: true
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});




export default router;
