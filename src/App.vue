<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import {useAuthStore} from '@/stores/auth'
import {onMounted} from 'vue'
import {RouterView} from 'vue-router'

const authStore = useAuthStore()

onMounted(() => {
  authStore.getCurrentUser()
})
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <Navbar />
  </header>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
