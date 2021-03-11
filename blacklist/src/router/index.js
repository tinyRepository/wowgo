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
    beforeEnter: handleAuthoriseHomePage
  },
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
    path: "/support",
    name: "support",
    component: DonatePage,
    beforeEnter: handleUnauthorisedRedirect
  },
  {
    path: "/rules",
    name: "rules",
    component: RulesPage,
    beforeEnter: handleUnauthorisedRedirect
  },
  {
    path: "/knowledge-base",
    name: "knowledge-base",
    component: KnowledgeBasePage,
    beforeEnter: handleUnauthorisedRedirect
  },
  {
    path: "/knowledge-base/:id",
    name: "article",
    component: ArticlePage,
    beforeEnter: handleUnauthorisedRedirect
  },
  {
    path: "/create-article",
    name: "create-article",
    component: CreateArticlePage,
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
