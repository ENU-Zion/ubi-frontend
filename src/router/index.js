import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Profile = () => import('@/views/Profile')
const Apply = () => import('@/views/Apply')
const Candidates = () => import('@/views/candidates/Candidates')
const Candidate = () => import('@/views/candidates/Candidate')
const Members = () => import('@/views/members/Members')
const Member = () => import('@/views/members/Member')
const Claim = () => import('@/views/members/Claim')
const Dashboard = () => import('@/views/Dashboard')


// Views - Components

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'profile',
          name: 'Profile',
          /* component: {
            render(c) { return c('router-view') }
          }, */
          component: Profile,
          /* children: [
            {
              path: 'simple',
              name: 'Simple',
              component: SimpleProfile
            }, {
              path: 'customized',
              name: 'Customized',
              component: CustomizedProfile
            }] */
        },
        {
          path: 'apply',
          name: 'Apply',
          component: Apply
        },
        {
          path: 'candidates',
          meta: { label: 'Candidates' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Candidates,
            },
            {
              path: ':account',
              meta: { label: 'User Details' },
              name: 'Candidate',
              component: Candidate,
            },
          ]
        }, {
          path: 'members',
          meta: { label: 'Members' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Members,
            },
            {
              path: ':account',
              meta: { label: 'User Details' },
              name: 'Member',
              component: Member,
            },
          ]
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'claim',
          name: 'Claim',
          component: Claim
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
