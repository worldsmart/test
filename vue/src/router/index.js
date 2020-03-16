import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Customers from '../views/Customers.vue'
import Customer from '../views/Customer.vue'
import Clients from '../views/Clients.vue'
import Client from '../views/Client.vue'
import Order from '../views/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    props: (route) => ({ id: route.query.id })
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/client',
    name: 'Client',
    component: Client,
    props: (route) => ({ id: route.query.id })
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    props: (route) => ({ id: route.query.id })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
