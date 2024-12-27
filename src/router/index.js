import Vue from "vue";
import VueRouter from "vue-router";
import Detail from "@/views/Detail.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Article from "@/views/Layout/Article.vue";
import Like from "@/views/Layout/Like.vue";
import Collect from "@/views/Layout/Collect.vue";
import User from "@/views/Layout/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/article",
    children: [
      {
        path: "article",
        name: "Article",
        component: Article,
      },
      {
        path: "like",
        name: "Like",
        component: Like,
      },
      {
        path: "collect",
        name: "Collect",
        component: Collect,
      },
      {
        path: "user",
        name: "User",
        component: User,
        meta: {
          requireAuth: true, // 添加该字段，表示进入该路由需要登录
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
