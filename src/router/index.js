import { createRouter, createWebHistory } from 'vue-router';
import AdminView from "../views/Admin.vue";
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import F_HomeView from "../views/F_Home.vue";
import F_AnsView from "../views/F_Answer.vue";
import F_AnsView_C from "../views/F_Answer_C.vue";
import F_AnsView_G from "../views/F_Answer_G.vue";
import F_AnsView_F from "../views/F_Answer_F.vue";
import AddDView from "../views/AddD.vue";
import AddCView from "../views/AddC.vue";
import AddCDetailView from "../views/AddCDetail.vue";
import AddBView from "../views/AddB.vue";
import AddAView from "../views/AddA.vue";
import EditView from "../views/Edit.vue";
import EditBView from "../views/EditB.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首頁
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add/a',
      name: 'a',
      component: AddAView,
    },
    {
      path: '/edit/:Id',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/add/b/:b_Id',
      name: 'b',
      component: AddBView,
    },
    {
      path: '/add/b',
      name: 'bb',
      component: AddBView,
    },
    {
      path: '/add/c',
      name: 'c',
      component: AddCView,
    },
    {
      path: '/add/d/:Id',
      name: 'd',
      component: AddDView,
    },
    {
      path: '/editB/:Id',
      name: 'editB',
      component: EditBView,
    },
    {
      path: '/f_home',
      name: 'f_home',
      component: F_HomeView,
     
    },
    {
      path: '/ans/:Id',
      name: 'ans',
      component: F_AnsView,
    }, 
    {
      path: '/ans/:Id/check',
      name: 'check',
      component: F_AnsView_C,
    }, {
      path: '/feedBack/:Id',
      name: 'feedBack',
      component: F_AnsView_F,
    },
    {
      path: '/graph/:Id',
      name: 'graph',
      component:F_AnsView_G
    },
    {
      path: '/add/c/:PId/detail/:Id',
      name: 'c_detail',
      component:AddCDetailView
    }
  ]
})

export default router
