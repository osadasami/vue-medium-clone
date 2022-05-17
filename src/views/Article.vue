<script setup lang="ts">
import router from '@/router'
import {useArticleStore} from '@/stores/article'
import {useAuthStore} from '@/stores/auth'
import {computed, onMounted} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import Error from '../components/Error.vue'
import TagList from '../components/TagList.vue'
import Loading from './Loading.vue'

const route = useRoute()
const articleStore = useArticleStore()
const authStore = useAuthStore()

const isAuthor = computed(() => {
  if (!authStore.user) {
    return false
  }

  if (authStore.user.username === articleStore.data.author.username) {
    return true
  } else {
    return false
  }
})

onMounted(() => {
  articleStore.getArticle(route.params.slug as string)
})

async function deleteArticle() {
  await articleStore.deleteArticle(route.params.slug as string)
  router.push({name: 'home'})
}
</script>

<template>
  <div class="article-page">
    <div class="banner" v-if="articleStore.data">
      <div class="container">
        <h1>{{ articleStore.data.title }}</h1>
        <div class="article-meta">
          <RouterLink
            :to="{
              name: 'profile',
              params: {slug: articleStore.data.author.username},
            }"
          >
            <img
              :src="articleStore.data.author.image"
              :alt="articleStore.data.author.username"
            />
          </RouterLink>
          <div class="info">
            <RouterLink
              :to="{
                name: 'profile',
                params: {slug: articleStore.data.author.username},
              }"
            >
              {{ articleStore.data.author.username }}
            </RouterLink>
            <span class="date">
              {{ articleStore.data.createdAt }}
            </span>
          </div>
          <span v-if="isAuthor">
            <RouterLink
              class="btn btn-outline-secondary btn-sm"
              :to="{
                name: 'editArticle',
                params: {slug: articleStore.data.slug},
              }"
              ><i class="ion-edit"></i> Edit Article</RouterLink
            >
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <Loading v-if="articleStore.isLoading" />
      <Error v-if="articleStore.error" />

      <div class="row article-content" v-if="articleStore.data">
        <div class="col-xs-12">
          <div>
            <p>
              {{ articleStore.data.body }}
            </p>
            <TagList :tags="articleStore.data.tagList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
