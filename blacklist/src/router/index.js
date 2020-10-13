import Vue from "vue";
import VueRouter from "vue-router";
import Registration from "Pages/RegistrationPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Registration",
    component: Registration
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
