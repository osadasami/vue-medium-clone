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
    @click="toggleFavorite"
    class="btn btn-sm btn-primary"
    :class="{'btn-outline-primary': !isFavorited, 'btn-primary': isFavorited}"
  >
    <i class="ion-heart"></i>
    &nbsp;

    <span> {{ isFavorited ? 'Unfavorite' : 'Favorite' }} Article </span
    ><span class="counter">({{ favoritesCount }})</span>
  </button>
</template>
