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

import {Cookie} from "./helpers/cookie";
if (process.env.VUE_APP_ENV === 'development') {
    // this allows debugging through console on development environments
    window.Cookie = Cookie;
}