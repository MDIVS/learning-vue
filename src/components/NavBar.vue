<template>
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <font-awesome-icon icon="home" />
        <span>Home</span>
      </router-link>
      <router-link to="/profile" class="nav-item">
        <font-awesome-icon icon="user" />
        <span>Profile</span>
      </router-link>
      <router-link to="/inventory" class="nav-item">
        <font-awesome-icon icon="box" />
        <span>Inventory</span>
      </router-link>
      <router-link to="/guild" class="nav-item">
        <font-awesome-icon icon="users" />
        <span>Guild</span>
      </router-link>
      <router-link to="/skill-tree" class="nav-item">
        <font-awesome-icon icon="sitemap" />
        <span>Skill Tree</span>
      </router-link>
      <router-link to="/enter" class="nav-item">
        <font-awesome-icon icon="right-to-bracket" />
        <span>Enter</span>
      </router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: "BottomNavBar"
  };
  </script>
  
  <style scoped>
  /* Your styles for the nav bar */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    border-top: 1px solid hsl(0, 0%, 80%);
    display: flex;
    justify-content: center;
    padding: 2px;
    z-index: 1000;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    transition: color 0.2s ease;
    margin: 8px;
  }
  
  .nav-item:hover {
    color: goldenrod;
    cursor: pointer;
    scale: 1.1;
  }
  
  .nav-item svg {
    font-size: 20px;
  }
  
  .nav-item span {
    font-size: 12px;
    margin-top: 4px;
  }
  </style>
  