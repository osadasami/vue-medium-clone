<script setup lang="ts">
import {reactive, ref} from 'vue'
import ValidationErrors from './ValidationErrors.vue'

type formData = {
  title: string
  description: string
  body: string
  tagList: string[]
}

const props = defineProps<{
  title: string
  description: string
  body: string
  tagList: string[]
  errors: any
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  (e: 'onSubmit', data: formData): void
}>()

const data = reactive({
  title: props.title || '',
  description: props.description || '',
  body: props.body || '',
  tagList: props.tagList || [],
})

const newTag = ref('')

function addTag() {
  if (data.tagList.includes(newTag.value) || !newTag.value) {
    return
  }
  data.tagList.push(newTag.value)
  newTag.value = ''
}

function deleteTag(deletingTag: string) {
  data.tagList = data.tagList.filter((tag) => tag !== deletingTag)
}

function onSubmit(e: any) {
  emit('onSubmit', data)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ValidationErrors
      v-if="props.errors && props.errors.response.data.errors"
      :errors="props.errors.response.data.errors"
    />
    <fieldset class="form-group">
      <input
        v-model="data.title"
        type="text"
        class="form-control form-control-lg"
        placeholder="Article Title"
      />
    </fieldset>

    <fieldset class="form-group">
      <input
        v-model="data.description"
        type="text"
        class="form-control"
        placeholder="What's this article about?"
      />
    </fieldset>
    <fieldset class="form-group">
      <textarea
        v-model="data.body"
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
      ></textarea>
    </fieldset>

    <fieldset class="form-group">
      <input
        @keypress.enter.prevent="addTag"
        v-model="newTag"
        class="form-control ng-valid ng-dirty ng-empty ng-touched"
        type="text"
        placeholder="Enter tags"
        ng-model="$ctrl.tagField"
        ng-keyup="$event.keyCode == 13 &amp;&amp; $ctrl.addTag()"
      />

      <div class="tag-list">
        <span class="tag-default tag-pill" v-for="tag in data.tagList">
          <i class="ion-close-round" @click="deleteTag(tag)"></i>
          {{ tag }}
        </span>
      </div>
    </fieldset>

    <button
      class="btn btn-lg pull-xs-right btn-primary"
      type="submit"
      :disabled="props.isSubmitting"
    >
      Publish Article
    </button>
  </form>
</template>
