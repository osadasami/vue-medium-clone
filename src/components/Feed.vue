<script setup lang="ts">
import {useFeedStore} from '@/stores/feed'
import {onMounted} from 'vue'
import {RouterLink} from 'vue-router'
import Pagination from './Pagination.vue'

const props = defineProps<{
  url: string
}>()

const feedStore = useFeedStore()

onMounted(() => {
  feedStore.getFeed({url: props.url})
})
</script>

<template>
  <div>
    <div v-if="feedStore.isLoading">Loading…</div>
    <div v-if="feedStore.error">
      Somethind went wrong. Try to reload the page
    </div>

    <div v-if="feedStore.data">
      <div class="article-preview" v-for="article in feedStore.data.articles">
        <div class="article-meta">
          <RouterLink
            :to="{name: 'profile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" :alt="article.author.username" />
          </RouterLink>
          <div class="info">
            <RouterLink
              :to="{name: 'profile', params: {slug: article.author.username}}"
              class="author"
            >
              {{ article.author.username }}
            </RouterLink>

            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>
          <div class="pull-xs-right">ADD</div>
        </div>
        <RouterLink
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more…</span>
          TAG LIST
        </RouterLink>
      </div>

      <Pagination
        :total="500"
        :limit="10"
        :current-page="5"
        :url="'/tags/dragons'"
      />
    </div>
  </div>
</template>
