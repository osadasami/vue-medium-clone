<script setup lang="ts">
import {computed} from 'vue'
import {RouterLink} from 'vue-router'

const props = defineProps<{
  total: number
  limit: number
  currentPage: number
  url: string
}>()

const pages = computed(() => {
  const totalPages = Math.ceil(props.total / props.limit)
  return [...new Array(totalPages).keys()].map((n) => n + 1)
})
</script>

<template>
  <ul class="pagination">
    <li
      v-for="page in pages"
      class="page-item"
      :class="{active: currentPage === page}"
    >
      <RouterLink class="page-link" :to="{path: url, query: {page}}">{{
        page
      }}</RouterLink>
    </li>
  </ul>
</template>
