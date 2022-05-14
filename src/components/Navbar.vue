<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {RouterLink} from 'vue-router'

const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink :to="{name: 'home'}" class="navbar-brand"
        >Medium Clone</RouterLink
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="{name: 'home'}"
            >Home</RouterLink
          >
        </li>
        <template v-if="authStore.user">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{name: 'newArticle'}"
            >
              <i class="ion-compose"></i>
              New Article</RouterLink
            >
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{name: 'settings'}"
            >
              <i class="ion-gear-a"></i>
              Settings</RouterLink
            >
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{name: 'profile', params: {slug: authStore.user.username}}"
            >
              <img
                :src="authStore.user.image"
                :alt="authStore.user.username"
                class="user-pic"
              />
              {{ authStore.user.username }}</RouterLink
            >
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{name: 'register'}"
              >Sign Up</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{name: 'login'}"
              >Sign In</RouterLink
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
