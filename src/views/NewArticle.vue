<script setup lang="ts">
import NewEditArticleForm from '../components/NewEditArticleForm.vue'

function onSubmit() {
  console.log(arguments)
}
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <NewEditArticleForm
            title=""
            description=""
            body=""
            :tags="[]"
            :errors="[]"
            :is-submitting="false"
            @onSubmit="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
