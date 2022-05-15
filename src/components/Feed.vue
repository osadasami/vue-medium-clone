<script setup lang="ts">
import {useFeedStore} from '@/stores/feed'
import {computed, onMounted, watch} from 'vue'
import {parseQuery, RouterLink, stringifyQuery, useRoute} from 'vue-router'
import Loading from '../views/Loading.vue'
import Error from './Error.vue'
import Pagination from './Pagination.vue'

const props = defineProps<{
  url: string
}>()

const feedStore = useFeedStore()
const route = useRoute()
const limit = 10

const currentPage = computed(() => {
  return Number(route.query.page || 1)
})

const offset = computed(() => {
  return currentPage.value * limit - limit
})

onMounted(() => {
  const parsedUrl = parseQuery(location.search)
  const stringifiedParams = stringifyQuery({
    limit,
    offset: offset.value,
    ...parsedUrl,
  })
  const urlWithParams = `${props.url}?${stringifiedParams}`
  feedStore.getFeed({url: urlWithParams})
})

watch(currentPage, () => {
  feedStore.getFeed({url: props.url})
})
</script>

<template>
  <div>
    <Loading v-if="feedStore.isLoading" />
    <Error v-if="feedStore.error" />

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
        :total="feedStore.data.articlesCount"
        :limit="10"
        :current-page="currentPage"
        :url="route.path"
      />
    </div>
  </div>
</template>
