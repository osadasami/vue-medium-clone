<script setup lang="ts">
import NewEditArticleForm from '@/components/NewEditArticleForm.vue'
import {useNewArticleStore} from '@/stores/newArticle'

const newArticleStore = useNewArticleStore()

function onSubmit(data: any) {
  newArticleStore.createArticle(data)
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
            :tag-list="[]"
            :errors="newArticleStore.error"
            :is-submitting="newArticleStore.isSubmitting"
            @onSubmit="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
