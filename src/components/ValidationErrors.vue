<template>
  <ul class="error-messages">
    <li v-for="error in errorMessages">
      {{ error }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
  errors: any
}>()

const errorMessages = computed(() => {
  return Object.keys(props.errors).map((key) => {
    const message = props.errors[key].join(', ')
    return `${key} ${message}`
  })
})
</script>
