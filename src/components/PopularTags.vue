<script setup lang="ts">
import {useTagsStore} from '@/stores/tags'
import {onMounted} from 'vue'
import {RouterLink} from 'vue-router'
import Loading from '../views/Loading.vue'
import Error from './Error.vue'

const tagsStore = useTagsStore()

onMounted(() => {
  tagsStore.getTags()
})
</script>

<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div v-if="tagsStore.tags" class="tag-list">
      <RouterLink
        class="tag-default tag-pill ng-binding ng-scope"
        v-for="tag in tagsStore.tags"
        :to="{name: 'tagFeed', params: {slug: tag}}"
        >{{ tag }}</RouterLink
      >
    </div>
    <Loading v-if="tagsStore.isLoading" />
    <div v-if="!tagsStore.tags && !tagsStore.isLoading">
      No tags are here... yet.
    </div>
    <Error v-if="tagsStore.error" />
  </div>
</template>
