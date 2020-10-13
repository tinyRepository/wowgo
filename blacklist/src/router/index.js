import Vue from "vue";
import VueRouter from "vue-router";
import TermsOfUse from "Pages/TermsOfUse";
import NotFoundPage from "Pages/NotFoundPage";
import Registration from "Pages/RegistrationPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      isRegistrationPage: true,
      isLoginPage: false
    }
  },
  {
    path: "/login",
    name: "Registration",
    component: Registration,
    meta: {
      isRegistrationPage: false,
      isLoginPage: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundPage
  },
  {
    path: "/terms-of-use",
    name: "404",
    component: TermsOfUse
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.meta.noScroll) {
      return;
    }
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 200);
  }
});

export default router;
