<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Analyzed',
      data: [12, 19, 15, 22, 24, 18],
      backgroundColor: '#4CAF50'
    },
    {
      label: 'Pending',
      data: [5, 7, 4, 8, 10, 7],
      backgroundColor: '#FF9800'
    },
    {
      label: 'With Issues',
      data: [2, 4, 3, 5, 7, 2],
      backgroundColor: '#F44336'
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Bar 
      :data="chartData" 
      :options="chartOptions"
      height="250"
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
}
</style>