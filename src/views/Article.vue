<script setup lang="ts">
import AddToFavoriteButton from '@/components/AddToFavoriteButton.vue'
import Comments from '@/components/Comments.vue'
import Error from '@/components/Error.vue'
import FollowProfile from '@/components/FollowProfile.vue'
import Loading from '@/components/Loading.vue'
import TagList from '@/components/TagList.vue'
import {formatDate} from '@/filters/formatDate'
import router from '@/router'
import {useArticleStore} from '@/stores/article'
import {useAuthStore} from '@/stores/auth'
import {computed, onMounted} from 'vue'
import {RouterLink, useRoute} from 'vue-router'

const route = useRoute()
const articleStore = useArticleStore()
const authStore = useAuthStore()

const isLoggedIn = computed(() => {
  return !!authStore.user
})

const isAuthor = computed(() => {
  if (!isLoggedIn) {
    return false
  }

  if (authStore?.user?.username === articleStore?.data?.author.username) {
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
              {{ formatDate(articleStore.data.createdAt) }}
            </span>
          </div>
          <span v-if="isAuthor">
            <RouterLink
              class="btn btn-outline-secondary btn-sm"
              :to="{
                name: 'editArticle',
                params: {slug: articleStore.data.slug},
              }"
              ><i class="ion-edit"></i>Edit Article</RouterLink
            >
            &nbsp;
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
          <span v-else>
            <FollowProfile
              v-if="authStore.user"
              :username="articleStore.data.author.username"
              :is-following="articleStore.data.author.following"
            />
            &nbsp;
            <AddToFavoriteButton
              v-if="authStore.user"
              :article-slug="articleStore.data.slug"
              :is-favorited="articleStore.data.favorited"
              :favorites-count="articleStore.data.favoritesCount"
            />
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
            <TagList :tag-list="articleStore.data.tagList" />
          </div>
        </div>
      </div>

      <Comments
        :slug="articleStore.data.slug"
        :is-logged-in="isLoggedIn"
        v-if="articleStore.data"
      />
    </div>
  </div>
</template>
