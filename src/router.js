import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";
import CharacterInfo from "./components/CharacterInfo";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      alias: "/main",
      component: MainPage,
    },
    {
      path: "/character/:id",
      name: "characterInfo",
      component: CharacterInfo,
    },
  ],
});
