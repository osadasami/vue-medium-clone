<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import Feed from '@/components/Feed.vue'
import FeedTabs from '@/components/FeedTabs.vue'
import PopularTags from '@/components/PopularTags.vue'
</script>

<template>
  <div class="home-page">
    <Banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <FeedTabs />
          <Feed url="/articles" />
        </div>
        <div class="col-md-3">
          <PopularTags />
        </div>
      </div>
    </div>
  </div>
</template>
