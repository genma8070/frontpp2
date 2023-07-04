import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import ContractDetailsView from "../views/ContractDetails.vue";
import ContractView from "../views/Contract.vue";
import LandlordPage from "../views/LandlordPage.vue";
import LandlordDetailPage from "../views/LandlordDetailPage.vue";
import TenantPage from "../views/TenantPage.vue";
import TenantDetailPage from "../views/TenantDetailPage.vue";

import Property from "../components/property.vue";

import SearchHouse from "../views/SearchHouse.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登入頁面
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      // 首頁
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      // 物件首頁
      path: '/bukken',
      name: 'bukken',
      component: SearchHouse
    },
    {
      // 物件詳細頁面(含修改)
      path: '/bukken/info',
      name: 'bukkenInfo',
      component:Property,
    },
    {
      // 契約首頁
      path: '/keiyaku',
      name: 'keiyaku',
      component: ContractView,
    },
    {
      // 契約詳細頁面(包含歷史契約)
      path: '/Keiyaku/info/:contract_id',
      name: 'keiyaku_info',
      component: ContractDetailsView,
      props:true
    },
    {
      // 貸主首頁
      path: '/kashinushi',
      name: 'kashinushi',
      component: LandlordPage,
    },
    {
      // 貸主詳細頁面(含修改)
      path: '/kashinushi/info/:getLandlordId',
      name: 'kashinushiInfo',
      component: LandlordDetailPage,
      props: true
    },
    {
      // 借主首頁
      path: '/karinushi',
      name: 'karinushi',
      component: TenantPage
    },
    {
      // 借主詳細頁面(含修改)
      path: '/karinushi/info/:getTenantId',
      name: 'karinushiInfo',
      component: TenantDetailPage,
      props: true
    }
  ]
})

export default router
