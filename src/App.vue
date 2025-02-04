<template>
  <GoogleProfile :token="googleAuthToken"/>
  <router-view></router-view>
  <NavBar :token="googleAuthToken"/>
</template>

<script>
import GoogleProfile from './components/GoogleProfile.vue'
import NavBar from './components/NavBar.vue'
import { Cookie } from './helpers/cookie';

export default {
  name: 'App',
  components: {
    GoogleProfile,
    NavBar
  },
  computed: {
    googleAuthToken() {
      return Cookie.get("googleAuth");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
