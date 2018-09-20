import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Film from '@/components/Film'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // this doesn't make sense. The path for both these routes is '/'. When the router receives a path of '/' it'll probably default to one or the other (likely the last one listed)... 
    {
      path: '/',
      name: 'film',
      component: Film
    }
  ]
})
