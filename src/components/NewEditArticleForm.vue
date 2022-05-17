<script setup lang="ts">
import {reactive, ref} from 'vue'

type formData = {
  title: string
  description: string
  body: string
  tags: string[]
}

const props = defineProps<{
  title: string
  description: string
  body: string
  tags: string[]
  errors: string[]
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  (e: 'onSubmit', data: formData): void
}>()

const data = reactive({
  title: props.title || '',
  description: props.description || '',
  body: props.body || '',
  tags: props.tags || [],
  errors: props.errors || [],
  isSubmitting: props.isSubmitting || false,
})

const newTag = ref('')

function addTag() {
  if (data.tags.includes(newTag.value) || !newTag.value) {
    return
  }
  data.tags.push(newTag.value)
  newTag.value = ''
}

function deleteTag(deletingTag: string) {
  data.tags = data.tags.filter((tag) => tag !== deletingTag)
}

function onSubmit(e: any) {
  emit('onSubmit', data)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
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
        <span class="tag-default tag-pill" v-for="tag in data.tags">
          <i class="ion-close-round" @click="deleteTag(tag)"></i>
          {{ tag }}
        </span>
      </div>
    </fieldset>

    <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
      Publish Article
    </button>
  </form>
</template>
