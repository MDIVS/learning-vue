<template>
  <GoogleProfile :token="googleAuthToken"/>
  <router-view></router-view>
  <NavBar/>
</template>

<script>
import GoogleProfile from './components/GoogleProfile.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    GoogleProfile,
    NavBar
  },
  computed: {
    googleAuthToken() {
      return document.cookie;
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
