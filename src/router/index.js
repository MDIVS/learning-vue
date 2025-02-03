import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Inventory from '../views/Inventory.vue';
import Guild from '../views/Guild.vue';
import SkillTree from '../views/SkillTree.vue';
import Enter from '../views/Enter.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/inventory', name: 'Inventory', component: Inventory },
  { path: '/guild', name: 'Guild', component: Guild },
  { path: '/skill-tree', name: 'SkillTree', component: SkillTree },
  { path: '/enter', name: 'Enter', component: Enter },
];

const router = createRouter({
  history: createWebHistory(), // or createWebHashHistory() if preferred
  routes,
});

export default router;
