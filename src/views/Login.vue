<script setup lang="ts">
import ValidationErrors from '@/components/ValidationErrors.vue'
import router from '@/router'
import {useAuthStore} from '@/stores/auth'
import {ref} from 'vue'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

async function onSubmit() {
  await authStore.login({
    email: email.value,
    password: password.value,
  })
  if (authStore.user) {
    router.push({name: 'home'})
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <RouterLink :to="{name: 'register'}"
              >Already have an account?</RouterLink
            >
          </p>

          <ValidationErrors
            v-if="authStore.errors"
            :errors="authStore.errors"
          />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="email"
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="authStore.isSubmitting"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
