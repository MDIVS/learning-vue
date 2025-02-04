<template>
  <div class="profile-overview">
    <div class="profile-header">
      <img :src="user.picture" referrerpolicy="no-referrer" alt="Profile Picture" class="profile-picture" />
      <h2>{{ user.name }}</h2>
    </div>
    <div class="profile-details">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Given Name:</strong> {{ user.given_name }}</p>
      <p><strong>Family Name:</strong> {{ user.family_name }}</p>
      <!-- You can add more fields here if needed -->
    </div>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { Cookie } from "./../helpers/cookie";

export default {
  name: "Profile",
  computed: {
    user() {
      try {
        const token = Cookie.get("googleAuth");
        return token ? jwtDecode(token) : {};
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
    }
  },
  methods: {
    logout() {
      Cookie.remove("googleAuth");
      window.location.reload();
      this.$emit("logout");
    }
  }
};
</script>

<style scoped>
.profile-overview {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-picture {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile-details p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.logout-button {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e60000;
}
</style>
