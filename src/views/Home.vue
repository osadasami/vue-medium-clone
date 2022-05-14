<script setup lang="ts">
import Feed from '@/components/Feed.vue'
</script>

<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Feed url="/articles" />
        </div>
        <div class="col-md-3">TAGS</div>
      </div>
    </div>
  </div>
</template>
