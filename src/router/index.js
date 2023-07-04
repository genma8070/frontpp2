import { createRouter, createWebHistory } from 'vue-router';

import HomeView from "../views/Home.vue";
import AddDView from "../views/AddD.vue";
import AddCView from "../views/AddC.vue";
import AddBView from "../views/AddB.vue";
import AddAView from "../views/AddA.vue";
import EditView from "../views/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首頁
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // 物件詳細頁面(含修改)
      path: '/add/a',
      name: 'a',
      component: AddAView,
    },
    {
      // 物件詳細頁面(含修改)
      path: '/edit/:Id',
      name: 'edit',
      component: EditView,
    },
    {
      // 契約首頁
      path: '/add/b/:b_Id',
      name: 'b',
      component: AddBView,
    },
    {
      // 契約詳細頁面(包含歷史契約)
      path: '/add/c',
      name: 'c',
      component: AddCView,
    },
    {
      // 貸主首頁
      path: '/add/d',
      name: 'd',
      component: AddDView,
    },
    {
      // 貸主詳細頁面(含修改)
      path: '/kashinushi/info',
      name: 'kashinushiInfo',
      // component:
    },
    {
      // 借主首頁
      path: '/karinushi',
      name: 'karinushi',
      // component: FackView,
      children: [
        {
          // 借主詳細頁面(含修改)
          path: 'info',
          // component:
        }
      ]
    },
    {
      // 借主詳細頁面(含修改)
      path: '/karinushi/info',
      name: 'karinushiInfo',
      // component:
    }
  ]
})

export default router
