<script setup lang="ts">
import ValidationErrors from '@/components/ValidationErrors.vue';
import { useAuthStore } from '@/stores/auth';
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const authStore = useAuthStore()
const settingsStore = useSettingsStore()

const form = computed(() => ({
  ...authStore.user,
  password: '',
}))

function updateUserProfile() {
  delete form.value.token
  settingsStore.updateCurrentUser(form.value)
}

function logout() {
  authStore.logout()
}
</script>

<template>
  <div class="settings-page ng-scope" v-if="authStore.user">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ValidationErrors
            :errors="settingsStore.errors"
            v-if="settingsStore.errors"
          />

          <form @submit.prevent="updateUserProfile">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                />
              </fieldset>

              <button @click="logout" class="btn btn-outline-danger">
                Or click here to logout.
              </button>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                :disabled="settingsStore.isSubmitting"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
