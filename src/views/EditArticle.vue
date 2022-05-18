<script setup lang="ts">
import {useArticleStore} from '@/stores/article'
import {useEditArticleStore} from '@/stores/editArticle'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import NewEditArticleForm from '../components/NewEditArticleForm.vue'

const editArticleStore = useEditArticleStore()
const articleStore = useArticleStore()
const route = useRoute()

function onSubmit(data: any) {
  editArticleStore.updateArticle(route.params.slug as string, data)
}

onMounted(() => {
  articleStore.getArticle(route.params.slug as string)
})
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <NewEditArticleForm
            v-if="articleStore.data"
            :title="articleStore.data.title"
            :description="articleStore.data.description"
            :body="articleStore.data.body"
            :tag-list="articleStore.data.tagList"
            :errors="editArticleStore.error"
            :is-submitting="editArticleStore.isSubmitting"
            submit-text="Update Article"
            @onSubmit="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
