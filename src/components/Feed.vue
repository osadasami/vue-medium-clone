<script setup lang="ts">
import {useFeedStore} from '@/stores/feed'
import {onMounted} from 'vue'

const props = defineProps<{
  url: string
}>()

const feedStore = useFeedStore()

onMounted(() => {
  feedStore.getFeed({url: props.url})
})
</script>

<template>
  <h1>Feed</h1>
</template>
