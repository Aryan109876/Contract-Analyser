import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

// Layouts
import DashboardLayout from '../components/layout/DashboardLayout.vue'

// Views
import Dashboard from '../views/Dashboard.vue'
import ContractsList from '../views/ContractsList.vue'
import ContractView from '../views/ContractView.vue'
import ContractCompare from '../views/ContractCompare.vue'
import ClauseLibrary from '../views/ClauseLibrary.vue'
import ComplianceRules from '../views/ComplianceRules.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'contracts',
        name: 'Contracts',
        component: ContractsList,
        meta: { title: 'Contracts' }
      },
      {
        path: 'contracts/:id',
        name: 'ContractView',
        component: ContractView,
        meta: { title: 'Contract Details' }
      },
      {
        path: 'contracts/compare/:id1/:id2',
        name: 'ContractCompare',
        component: ContractCompare,
        meta: { title: 'Compare Contracts' }
      },
      {
        path: 'clause-library',
        name: 'ClauseLibrary',
        component: ClauseLibrary,
        meta: { title: 'Clause Library' }
      },
      {
        path: 'compliance-rules',
        name: 'ComplianceRules',
        component: ComplianceRules,
        meta: { title: 'Compliance Rules' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Contract Analyzer'} | Contract Clause Extractor`
  next()
})

export default router