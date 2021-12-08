import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/project/:id",
    name: "EditProject",
    component: EditProject,
    props: true // this allows us to accept parameters (/:id) as prop
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
