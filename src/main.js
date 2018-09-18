// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import VueResource from 'vue-resource'

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'test-52efe',
  databaseURL: 'https://test-52efe.firebaseio.com'
})

export const db = firebase.firestore()

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
