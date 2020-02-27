import "bootstrap/dist/css/bootstrap.min.css";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css/';
import "bootstrap";


import { library } from '@fortawesome/fontawesome-svg-core';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFrownOpen, faCheckCircle )

Vue.use(Datetime);
Vue.component('datetime', Datetime);



axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";


  var jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
  }

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
