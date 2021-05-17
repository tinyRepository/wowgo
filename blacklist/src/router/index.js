import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import RulesPage from "Pages/RulesPage";
import DonatePage from "Pages/DonatePage";
import TermsOfUse from "Pages/TermsOfUse";
import BlackList from "Pages/BlackListPage";
import ArticlePage from "Pages/ArticlePage";
import NotFoundPage from "Pages/NotFoundPage";
import Registration from "Pages/RegistrationPage";
import KnowledgeBasePage from "Pages/KnowledgeBasePage";
import CreateArticlePage from "Pages/CreateArticlePage";
import SuccessRegistration from "Pages/SuccessRegistration";

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
    component: BlackList,
    beforeEnter: handleAuthoriseHomePage,
    meta: { title: "Список" }
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
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
    component: Registration,
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
    component: SuccessRegistration,
    meta: { title: "Успешная регистрация" }
  },
  {
    path: "/black-list",
    name: "blackList",
    component: BlackList,
    meta: { title: "Список" }
  },
  {
    path: "/support",
    name: "support",
    component: DonatePage,
    meta: { title: "Поддержка" }
  },
  {
    path: "/rules",
    name: "rules",
    component: RulesPage,
    beforeEnter: handleUnauthorisedRedirect,
    meta: { title: "Правила" }
  },
  {
    path: "/knowledge-base",
    name: "knowledge-base",
    component: KnowledgeBasePage,
    meta: { title: "База знаний" }
  },
  {
    path: "/knowledge-base/:title",
    name: "article",
    props: true,
    component: ArticlePage
  },
  {
    path: "/create-article/:title?",
    name: "create-article",
    props: true,
    component: CreateArticlePage,
    beforeEnter: handleUnauthorisedRedirect,
    meta: { title: "Создание статьи" }
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundPage,
    meta: { title: "Страница не найдена" }
  },
  {
    path: "/terms-of-use",
    name: "termOfUse",
    component: TermsOfUse,
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
