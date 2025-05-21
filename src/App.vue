<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavigation from './components/layout/AppNavigation.vue'

const route = useRoute()
const isLoading = ref(true)

onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <v-app>
    <v-fade-transition>
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular 
          indeterminate 
          color="primary" 
          size="64"
        ></v-progress-circular>
        <div class="mt-4 text-primary">Loading Contract Analyzer...</div>
      </div>
    </v-fade-transition>
    
    <AppNavigation />

    <v-main>
      <v-container fluid>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>

    <v-footer app color="primary" class="py-3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="12" sm="8" class="text-center text-sm-left">
          <span class="text-white text-caption">
            Contract Clause Auto-Extractor & Compliance Checker © {{ new Date().getFullYear() }}
          </span>
        </v-col>
        <v-col cols="12" sm="4" class="text-center text-sm-right mt-2 mt-sm-0">
          <span class="text-white text-caption">
            v0.1.0
          </span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>