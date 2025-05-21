<script setup lang="ts">
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref({
  labels: ['Liability', 'Payment', 'Termination', 'Confidentiality', 'Data Protection'],
  datasets: [
    {
      data: [30, 22, 18, 15, 15],
      backgroundColor: ['#1A237E', '#00796B', '#FFC107', '#F44336', '#2196F3'],
      borderWidth: 0
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      align: 'start',
      labels: {
        boxWidth: 15,
        padding: 15
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Pie 
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