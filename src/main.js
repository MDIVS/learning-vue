import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUser, faBox, faUsers, faSitemap, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faHome, faUser, faBox, faUsers, faSitemap, faRightToBracket);

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

// this allows debugging through console on development environments
import {Cookie} from "./helpers/cookie";
import {jwtDecode} from "jwt-decode";
if (process.env.VUE_APP_ENV === 'development') {
    window.Cookie = Cookie;
    window.jwtDecode = jwtDecode;
}