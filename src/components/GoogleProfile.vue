<template>
  <div class="user-profile" v-if="user.email">
    <img :src="user.picture" referrerpolicy="no-referrer" alt="Google Profile Image" />
    <p>{{ user.email }}</p>
  </div>
  <div v-else>
    <p>No user is logged in.</p>
  </div>
</template>

<script>
  import { jwtDecode } from "jwt-decode";
  import { Cookie } from "./../helpers/cookie";
  
  export default {
    name: "GoogleProfile",
    props: {
      token: { // The Google JWT (ID token) passed from the parent component after login
        type: String
      },
    },
    computed: {
      user() {
        try {
          return this.token===null ? {} : jwtDecode(this.token);
        } catch (error) {
          if (error.message === "Invalid token specified: missing part #2") {
            Cookie.remove("googleAuth");
            console.log("Expired Google oAuth cookie section.");
            return {};
          }
          console.log(error.message);
          console.error("Error decoding token:", error);
          return {};
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 300px;
    margin: 1rem auto;
  }
  
  .user-profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  .user-profile p {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
  </style>
  