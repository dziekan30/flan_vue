import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import Signup from "../views/Signup.vue";
import Login from '../views/Login.vue';
import Logout from "../views/Logout.vue";


import EventsIndex from '../views/EventsIndex.vue';
import EventsShow from '../views/EventsShow.vue';
import EventsNew from '../views/EventsNew.vue';
import EventsEdit from '../views/EventsEdit.vue';

// Datetimepicker components: 
import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'root', component: EventsIndex },
  { path: '/events/new', name: 'events-new', component: EventsNew },
  { path: '/events/:id/edit', name: 'events-edit', component: EventsEdit },

  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/logout', name: 'logout', component: Logout },

  { path: '/events/:id', name: 'events-show', component: EventsShow },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
