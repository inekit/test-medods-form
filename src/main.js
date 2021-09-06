import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  data(){
    return {
      activeForm: 1,
      form: {},
    }
  },
  render: h => h(App)
}).$mount('#app')
