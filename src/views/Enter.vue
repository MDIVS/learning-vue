<template>
  <div class="login-container">
    <h2>Login or Signup</h2>
    <div id="google-signin-button"></div>
  </div>
</template>

<script>
  import { jwtDecode } from "jwt-decode";

  export default {
    name: "Login",
    mounted() {
      console.log("Google Client Id:", process.env.VUE_APP_GOOGLE_CLIENT_ID)

      // Ensure the Google Identity Services library is loaded
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          callback: this.handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" } // Customization options
        );
        // Optionally, you can prompt the One Tap dialog:
        // window.google.accounts.id.prompt();
      } else {
        console.error("Google API not loaded. Make sure the script is included in your index.html.");
      }
    },
    methods: {
      handleCredentialResponse(response) {
        const {credential} = response;
        console.log("Encoded JWT ID token:", credential);
        console.log("Decoded JWT ID token:", jwtDecode(credential));

        /**
         * - - IMPORTANT - -
         * I'm just seting the token in a insecure cookie because it is just a project for learning the frontend of the thing. DONT DO IT ON PRODUCTION ENVIRONMENTS!!
         */

        // Setting a cookie using JavaScript (this is NOT HTTP‑Only)
        document.cookie = `googleAuth=${credential}; path=/;`;

        console.log("Document.cookie:", document.cookie);

        // Below whould be the correct and secure way handle the token
        // **IMPORTANT:** Send the token to your backend for validation.
        // The backend should verify the token with Google to ensure it’s valid.
        // fetch('/api/auth/google', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token: response.credential })
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     // Handle the server response (e.g., store a session token, redirect, etc.)
        //     console.log("Server response:", data);
        //   })
        //   .catch((err) => {
        //     console.error("Error during authentication:", err);
        //   });
        
        window.location.reload();
      },
    },
  };
</script>

<style scoped>
  .login-container {
    margin: auto;
    width: min-content;
    text-align: center;
    padding: 2rem;
  }
</style>
