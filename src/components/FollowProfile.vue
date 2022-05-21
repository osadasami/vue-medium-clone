<script setup lang="ts">
import {useUserProfileFollowStore} from '@/stores/userProfileFollow'
import {ref} from 'vue'

const props = defineProps<{
  username: string
  isFollowing: boolean
}>()

const userProfileFollowStore = useUserProfileFollowStore()

const isFollowing = ref(props.isFollowing)

function follow() {
  isFollowing.value = !isFollowing.value
  userProfileFollowStore.follow(props.username, props.isFollowing)
}
</script>

<template>
  <button
    @click="follow"
    class="btn btn-sm action-btn ng-binding btn-outline-secondary"
    :disabled="userProfileFollowStore.isLoading"
  >
    <i class="ion-plus-round"></i>
    &nbsp;
    {{ isFollowing ? 'Unfollow' : 'Follow' }}
    {{ props.username }}
  </button>
</template>
