import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import TermsOfUse from "Pages/TermsOfUse";
import BlackList from "Pages/BlackListPage";
import NotFoundPage from "Pages/NotFoundPage";
import Registration from "Pages/RegistrationPage";
import SuccessRegistration from "Pages/SuccessRegistration";

Vue.use(VueRouter);

function handleUnauthorisedRedirect(to, from, next) {
  if (!store.state.userData.user && !localStorage.getItem("authUser")) {
    next("/registration");
  } else {
    next();
  }
}

function handleAuthorisedRedirect(to, from, next) {
  if (!store.state.userData.user) {
    next();
  } else {
    next({
      path: "/black-list",
      replace: true
    });
  }
}

const routes = [
  {
    path: "/registration",
    name: "registration",
    component: Registration,
    beforeEnter: handleAuthorisedRedirect,
    meta: {
      isRegistrationPage: true,
      isLoginPage: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: Registration,
    beforeEnter: handleAuthorisedRedirect,
    meta: {
      isRegistrationPage: false,
      isLoginPage: true
    }
  },
  {
    path: "/success-registration",
    name: "successRegistration",
    beforeEnter: handleUnauthorisedRedirect,
    component: SuccessRegistration
  },
  {
    path: "/black-list",
    name: "blackList",
    component: BlackList,
    beforeEnter: handleUnauthorisedRedirect
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundPage
  },
  {
    path: "/terms-of-use",
    name: "termOfUse",
    component: TermsOfUse,
    beforeEnter: handleUnauthorisedRedirect
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
