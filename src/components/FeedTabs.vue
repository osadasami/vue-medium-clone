<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {computed} from 'vue'
import {RouterLink, useRoute} from 'vue-router'

const props = defineProps<{
  tag?: string
}>()

const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const authStore = useAuthStore()
</script>

<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="authStore.user">
        <RouterLink
          :to="{name: 'userFeed'}"
          class="nav-link"
          :class="{active: routeName === 'userFeed'}"
          >Your feed</RouterLink
        >
      </li>

      <li class="nav-item">
        <RouterLink
          :to="{name: 'home'}"
          class="nav-link"
          :class="{active: routeName === 'home'}"
          >Global feed</RouterLink
        >
      </li>

      <li class="nav-item" v-if="props.tag">
        <RouterLink
          :to="{name: 'tagFeed', params: {slug: props.tag}}"
          :class="{active: routeName === 'tagFeed'}"
          class="nav-link"
        >
          <i class="ion-pound"></i>
          {{ props.tag }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
