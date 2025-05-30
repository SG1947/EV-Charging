<template>
  <div class="auth-container">
    <h2 class="title">Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  error.value = '';
  try {
    await auth.login(email.value, password.value);
    router.push('/chargers');
  } catch (e) {
    error.value = 'Invalid email or password';
  }
};
</script>
<style src="./css/AuthForms.css"></style>
