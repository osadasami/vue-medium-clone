<script setup lang="ts">
const props = defineProps<{message?: string}>()
const message = props.message || 'Somethind went wrong. Try to reload the page'
</script>

<template>
  <div>{{ message }}</div>
</template>
