<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <v-icon icon="mdi-alert-circle-outline" size="80" color="primary"></v-icon>
      <h1 class="text-h2 mt-4 mb-2">404</h1>
      <h2 class="text-h4 mb-4">Page Not Found</h2>
      <p class="text-subtitle-1 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <v-btn
        color="primary"
        size="large"
        @click="goToHome"
      >
        Go to Dashboard
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  padding: 24px;
}
</style>