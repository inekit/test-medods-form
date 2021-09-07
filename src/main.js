import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = "";
Vue.config.devtools = true;

new Vue({
  data() {
    return {
      activeForm: 1,
      form: {},
    };
  },
  render: (h) => h(App),
}).$mount("#app");
