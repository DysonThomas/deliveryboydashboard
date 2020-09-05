import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFirestore from 'vue-firestore'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

import './assets/app.scss';
import {fb} from './firebase'

let app='';
fb.auth().onAuthStateChanged((user)=>{
  if(!app){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
});
