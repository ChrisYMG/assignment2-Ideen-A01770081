import Vue from "vue";
import VueRouter from "vue-router";
import UserView from "../views/UserView.vue";
import ListaMateriasView from "../views/ListaMateriasView.vue";
import Signup from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "signup",
    component: Signup,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/materias",
    name: "materias",
    component: ListaMateriasView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
