useUserProfileFollowStore
<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {useUserProfileStore} from '@/stores/userProfile'
import {useUserProfileFollowStore} from '@/stores/userProfileFollow'
import {computed, onMounted, watch} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import Feed from '../components/Feed.vue'
import FollowProfile from '../components/FollowProfile.vue'

const route = useRoute()
const userProfileStore = useUserProfileStore()
const userProfileFollowStore = useUserProfileFollowStore()
const authStore = useAuthStore()
const apiParams = computed(() => {
  const isFavorites = route.path.includes('favorites')

  return isFavorites
    ? {favorited: route.params.slug}
    : {author: route.params.slug}
})
const isCurrentUserProfile = computed(() => {
  return userProfileStore.profile.username === authStore.user.username
})

const userProfileSlug = computed(() => {
  return route.params.slug
})

watch(userProfileSlug, async () => {
  await userProfileStore.getUserProfile(route.params.slug as string)
})

onMounted(async () => {
  await userProfileStore.getUserProfile(route.params.slug as string)
})
</script>

<template>
  <div class="profile-page" v-if="userProfileStore.profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfileStore.profile.image" class="user-img" />
            <h4>{{ userProfileStore.profile.username }}</h4>
            <p>{{ userProfileStore.profile.bio }}</p>
            <div>
              <FollowProfile
                :username="userProfileStore.profile.username"
                :is-following="userProfileStore.profile.following"
              />

              <RouterLink
                :to="{name: 'settings'}"
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                >Edit Profile Settings</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggler">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :class="{active: route.name === 'profile'}"
                  :to="{
                    name: 'profile',
                    params: {slug: userProfileStore.profile.username},
                  }"
                  >My Posts</RouterLink
                >
              </li>

              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :class="{active: route.name === 'favorites'}"
                  :to="{
                    name: 'favorites',
                    params: {slug: userProfileStore.profile.username},
                  }"
                  >Favorites</RouterLink
                >
              </li>
            </ul>
          </div>
          <Feed
            url="/articles"
            :params="apiParams"
            :key="route.name as string"
          />
        </div>
      </div>
    </div>
  </div>
</template>
