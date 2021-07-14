import Vue from "vue";
import { BootstrapVue, CarouselPlugin } from "bootstrap-vue";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import VueSidebarMenu from "vue-sidebar-menu";
import "./services";
import firebase from "firebase";
import CKEditor from 'ckeditor4-vue';
import VueApexCharts from 'vue-apexcharts'

// import css
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "normalize.css/normalize.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faFacebookSquare);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueSidebarMenu);
Vue.use(CarouselPlugin);
Vue.use(BootstrapVue);
Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
Vue.use( CKEditor );
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false;
firebase.initializeApp({
  apiKey: "AIzaSyC_UaW6wWrABa_Z-s-hHT6idGtDY-VC3fM",
  authDomain: "clinic-46906.firebaseapp.com",
  databaseURL: "https://clinic-46906-default-rtdb.firebaseio.com",
  projectId: "clinic-46906",
  storageBucket: "clinic-46906.appspot.com",
  messagingSenderId: "738759038879",
  appId: "1:738759038879:web:6135b634c6d0ca0da14faa",
  measurementId: "G-G6093S8M2H",
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
