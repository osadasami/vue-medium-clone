import Article from '@/views/Article.vue'
import EditArticle from '@/views/EditArticle.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NewArticle from '@/views/NewArticle.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Settings from '@/views/Settings.vue'
import TagFeed from '@/views/TagFeed.vue'
import UserFeed from '@/views/UserFeed.vue'
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/articles/new',
      name: 'newArticle',
      component: NewArticle,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/profiles/:slug',
      name: 'profile',
      component: Profile,
    },

    {
      path: '/profiles/:slug/favorites',
      name: 'favorites',
      component: Profile,
    },

    {
      path: '/articles/:slug',
      name: 'article',
      component: Article,
    },

    {
      path: '/articles/:slug/edit',
      name: 'editArticle',
      component: EditArticle,
    },

    {
      path: '/feed',
      name: 'userFeed',
      component: UserFeed,
    },
    {
      path: '/tags/:slug',
      name: 'tagFeed',
      component: TagFeed,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
})

export default router
