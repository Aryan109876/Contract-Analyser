<script setup lang="ts">
defineProps<{
  title: string
  value: string
  icon: string
  color: string
  trend?: 'up' | 'down' | 'none'
  percent?: string
}>()
</script>

<template>
  <v-card elevation="1" class="stat-card h-100">
    <v-card-text>
      <div class="d-flex align-center mb-1">
        <v-avatar
          :color="color"
          size="40"
          class="mr-4"
        >
          <v-icon color="white">{{ icon }}</v-icon>
        </v-avatar>
        <div>
          <div class="text-subtitle-2 text-medium-emphasis">{{ title }}</div>
          <div class="text-h5 font-weight-bold">{{ value }}</div>
        </div>
      </div>
      
      <v-divider class="my-2"></v-divider>
      
      <div v-if="trend && percent" class="d-flex align-center text-caption">
        <v-icon
          :color="trend === 'up' ? 'success' : (trend === 'down' ? 'error' : '')"
          size="small"
          class="mr-1"
        >
          {{ trend === 'up' ? 'mdi-arrow-up' : (trend === 'down' ? 'mdi-arrow-down' : 'mdi-minus') }}
        </v-icon>
        <span 
          :class="trend === 'up' ? 'text-success' : (trend === 'down' ? 'text-error' : '')"
        >
          {{ percent }}% from last month
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}
</style>