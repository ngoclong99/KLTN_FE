import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import { auth } from "../store/modules/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    const position = {};
    if (to.hash) {
      position.selector = to.hash;
      if (to.hash === "#about") {
        return {
          offset: { y: 80 },
          selector: to.hash,
          behavior: "smooth",
        };
      }
      if (to.hash === "#contact") {
        return {
          offset: { y: 80 },
          selector: to.hash,
          behavior: "smooth",
        };
      }
      if (to.hash === "#blog") {
        return {
          offset: { y: 80 },
          selector: to.hash,
          behavior: "smooth",
        };
      }
      if (to.hash === "#home") {
        return {
          offset: { y: 80 },
          selector: to.hash,
          behavior: "smooth",
        };
      }
      return false;
    }
  },
});

router.beforeEach((to, from, next) => {
  // get username
  const userName = auth.state.username;
  // Những trang không yêu cần Token
  const publicPages = [
    "/login",
    "/register",
    "/home",
    "/blog",
    "/",
    "/newsDetails",
    "/news",
  ];
  // Những trang cần token ( khác trang trên )
  const authRequired = !publicPages.includes(to.path);
  // Lấy Token
  const loggedIn = localStorage.getItem("token");

  // redirect to login page
  if (authRequired && !loggedIn) {
    next("login");
  } else if (!authRequired && loggedIn) {
    const redirectTo = "/" + userName + "/proFile";
    next(redirectTo);
  } else {
    next();
  }
});

export default router;
