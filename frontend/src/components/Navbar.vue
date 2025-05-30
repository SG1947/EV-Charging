<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <h1 class="logo" @click="goHome">⚡EV Charge⚡</h1>
    <div class="nav-links">
      <button v-if="!auth.isLoggedIn" @click="router.push('/login')">Login</button>
      <button v-if="auth.isLoggedIn" @click="router.push('/chargers/add')">Add Charger</button>
      
      <button v-if="auth.isLoggedIn" @click="logout">Logout</button>
      

    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const auth = useAuthStore();

const goHome = () => router.push('/chargers');

const logout = () => {
  auth.logout();
  router.push('/chargers');
};
</script>

<style src="./Navbar.css"></style>
