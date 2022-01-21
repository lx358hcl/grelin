import { createWebHistory, createRouter } from "vue-router";
import Homepage from "../views/Homepage.vue";
import User from "../views/User.vue";
import PageNotFound from "../views/PageNotFound.vue";
import firebaseApp from "@/firebase/firebaseconfig.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Homepage,
    redirect: {path: "/all"},
    props:true,
  },
  {
    path: "/all",
    name: "all",
    component: Homepage,
    props:true,
  },
  {
    path: "/feed",
    name: "feed",
    component: Homepage,
    props:true,
  },
  {
    path: "/chat",
    name: "chat",
    component: Homepage,
    props:true,
  },
  {
    path: "/human",
    name: "human",
    component: Homepage,
    props:true,
  },
  {
    path: "/animal",
    name: "animal",
    component: Homepage,
    props:true,
  },
  {
    path: "/qa",
    name: "qa",
    component: Homepage,
    props:true,
  },
  {
    path: "/misc",
    name: "misc",
    component: Homepage,
    props:true,
  },
  {
    path: "/submit",
    name: "submit",
    component: Homepage,
    meta: { requiresAuth: true },
  },
  {
    path: "/contact",
    name: "contact",
    component: Homepage,
  },
  {
    path: "/privacy",
    name: "privacy",
    component: Homepage,
  },
  {
    path: "/report/:uid?",
    name: "report",
    component: Homepage,
  },
  {
    path: "/about",
    name: "about",
    component: Homepage,
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Homepage,
  },
  {
    path: "/post/:id",
    name: "post",
    component: Homepage,
    props:true,
  },
  {
    path: "/search:query?",
    name: "search",
    component: Homepage,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: Homepage,
  },
  {
    path: "/user/:username/",
    name: "user",
    component: User,
  },
  {
    path: "/user/:username/:page?",
    name: "user",
    component: User,
  },
  {
    path: '/:pathMatch(.*)*',
    name: "PageNotFound",
    component:PageNotFound,
  },
  {
    path: '/:pathMatch(.*)',
    component:PageNotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  base: process.env.BASE_URL,
});

router.beforeEach(async (to, from, next) => {
  
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebaseApp.auth().currentUser;
  
  
  if (requiresAuth && !isAuthenticated) {
    next({ path: from.path })
  }
  else {
    next()
  }
});

export default router;