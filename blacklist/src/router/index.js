import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);
function handleAuthoriseHomePage(to, from, next) {
  if (!store.state.userData.user && !localStorage.getItem("authUser")) {
    next("/registration");
  } else {
    next("/black-list");
  }
}

function handleUnauthorisedRedirect(to, from, next) {
  if (!store.state.userData.user && !localStorage.getItem("authUser")) {
    next("/registration");
  } else {
    next();
  }
}

function handleAuthorisedRedirect(to, from, next) {
  if (!store.state.userData.user && !localStorage.getItem("authUser")) {
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
    path: "/",
    name: "home",
    component: () => import("Pages/BlackListPage"),
    beforeEnter: handleAuthoriseHomePage,
    meta: { title: "Список" }
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("Pages/RegistrationPage"),
    beforeEnter: handleAuthorisedRedirect,
    meta: {
      isRegistrationPage: true,
      isLoginPage: false,
      title: "Регистрация"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("Pages/RegistrationPage"),
    beforeEnter: handleAuthorisedRedirect,
    meta: {
      isRegistrationPage: false,
      isLoginPage: true,
      title: "Вход"
    }
  },
  {
    path: "/success-registration",
    name: "successRegistration",
    beforeEnter: handleUnauthorisedRedirect,
    component: () => import("Pages/SuccessRegistration"),
    meta: { title: "Успешная регистрация" }
  },
  {
    path: "/black-list",
    name: "blackList",
    component: () => import("Pages/BlackListPage"),
    meta: { title: "Список" }
  },
  {
    path: "/support",
    name: "support",
    component: () => import("Pages/DonatePage"),
    meta: { title: "Поддержка" }
  },
  {
    path: "/rules",
    name: "rules",
    component: () => import("Pages/RulesPage"),
    beforeEnter: handleUnauthorisedRedirect,
    meta: { title: "Правила" }
  },
  {
    path: "/knowledge-base",
    name: "knowledge-base",
    component: () => import("Pages/KnowledgeBasePage"),
    meta: { title: "База знаний" }
  },
  {
    path: "/knowledge-base/:title",
    name: "article",
    props: true,
    component: () => import("Pages/ArticlePage")
  },
  {
    path: "/create-article/:title?",
    name: "create-article",
    props: true,
    component: () => import("Pages/CreateArticlePage"),
    beforeEnter: handleUnauthorisedRedirect,
    meta: { title: "Создание статьи" }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("Pages/NotFoundPage"),
    meta: { title: "Страница не найдена" }
  },
  {
    path: "/terms-of-use",
    name: "termOfUse",
    component: () => import("Pages/TermsOfUse"),
    meta: { title: "Условия использования" }
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
