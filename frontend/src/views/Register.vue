<template>
  <div class="auth-container">
    <h2 class="title">Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p v-if="message" style="color:green">{{ message }}</p>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api/http';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const message = ref('');
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  error.value = '';
  try {
    await api.post('/auth/signup', { email: email.value, password: password.value });
    message.value = 'Registered successfully! Redirecting to login...';
    setTimeout(() => router.push('/login'), 1500);
  } catch (e) {
    error.value = 'Failed to register';
  }
};
</script>
<style src="./css/AuthForms.css"></style>