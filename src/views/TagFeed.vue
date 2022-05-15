<script setup lang="ts">
import Feed from '@/components/Feed.vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import Banner from '../components/Banner.vue'
import PopularTags from '../components/PopularTags.vue'

const route = useRoute()

const tag = computed(() => {
  return route.params.slug as string
})
</script>

<template>
  <div class="home-page">
    <Banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Feed url="/articles" :params="{tag}" :key="tag" />
        </div>
        <div class="col-md-3">
          <PopularTags />
        </div>
      </div>
    </div>
  </div>
</template>
