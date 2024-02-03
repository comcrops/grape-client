import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from "vue-router"

const DefaultLayout = () => import("@/layouts/DefaultLayout.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/pages/HomePage.vue"),
      },
      {
        path: "/paste/:id",
        name: "paste",
        component: () => import("@/pages/PastePage.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "not found",
        component: () => import("@/pages/NotFoundPage.vue"),
      },
    ],
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
