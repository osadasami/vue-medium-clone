<script setup lang="ts">
import Error from '@/components/Error.vue'
import {formatDate} from '@/filters/formatDate'
import {useAuthStore} from '@/stores/auth'
import {useCommentsStore} from '@/stores/comments'
import {ref} from 'vue'
import {RouterLink} from 'vue-router'

const props = defineProps<{
  slug: string
  isLoggedIn: boolean
}>()

const commentsStore = useCommentsStore()
const authStore = useAuthStore()
const newComment = ref('')

function isAuthor(author: string) {
  return authStore.user.username === author
}

function deleteComment(id: number) {
  commentsStore.deleteComment(props.slug, id)
}

async function createComment() {
  try {
    await commentsStore.createComment(props.slug, newComment.value)
    newComment.value = ''
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div>
        <Error v-if="commentsStore.error" />

        <form class="card comment-form" @submit.prevent="createComment">
          <div class="card-block">
            <textarea
              v-model="newComment"
              class="form-control"
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
          </div>
          <div class="card-footer">
            <img class="comment-author-img" :src="authStore?.user?.image" />
            <button
              class="btn btn-sm btn-primary"
              type="submit"
              :disabled="commentsStore.isLoading"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      <p v-if="!props.isLoggedIn">
        <RouterLink :to="{name: 'login'}">Sign in</RouterLink>
        or
        <RouterLink :to="{name: 'register'}">sign up</RouterLink>
        to add comments on this article.
      </p>

      <div class="card" v-for="comment in commentsStore.comments">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <RouterLink
            class="comment-author"
            :to="{name: 'profile', params: {slug: comment.author.username}}"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </RouterLink>
          &nbsp;
          <RouterLink
            class="comment-author"
            :to="{name: 'profile', params: {slug: comment.author.username}}"
            >{{ comment.author.username }}</RouterLink
          >

          <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
          <span class="mod-options" v-if="isAuthor(comment.author.username)">
            <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
