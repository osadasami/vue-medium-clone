<script setup lang="ts">
import addToFavoritesApi from '@/api/addToFavorites'
import {ref} from 'vue'

const props = defineProps<{
  isFavorited: boolean
  articleSlug: string
  favoritesCount: number
}>()

const isFavorited = ref(props.isFavorited)
const favoritesCount = ref(props.favoritesCount)

function toggleFavoriteOptimistic() {
  if (isFavorited.value) {
    favoritesCount.value--
  } else {
    favoritesCount.value++
  }
  isFavorited.value = !isFavorited.value
}

async function toggleFavorite() {
  toggleFavoriteOptimistic()
  try {
    await addToFavoritesApi.toggleFavorites(
      props.articleSlug,
      !isFavorited.value
    )
  } catch (err) {
    toggleFavoriteOptimistic()
  }
}
</script>

<template>
  <button
    class="btn btn-sm"
    @click="toggleFavorite"
    :class="{'btn-primary': isFavorited, 'btn-outline-primary': !isFavorited}"
  >
    <i class="ion-heart"></i>
    <span class="ng-binding ng-scope">&nbsp;{{ favoritesCount }}</span>
  </button>
</template>
