<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()
</script>

<template>
  <ul class="tag-list">
    <li v-for="tag in tags" class="tag-default tag-pill tag-outline">
      {{ tag }}
    </li>
  </ul>
</template>
