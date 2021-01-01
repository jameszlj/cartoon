import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import('../views/DisplayList.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: "/display/:cate_name",
    name: "DisplayList",
    component: () => import('../views/DisplayList.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import('../views/Search.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: "/showlist",
    name: "ShowList",
    component: () => import('../views/ShowList.vue'),
    meta: {
      title: '搜索'
    }
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
