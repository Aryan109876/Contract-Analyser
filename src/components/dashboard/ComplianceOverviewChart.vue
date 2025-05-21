<script setup lang="ts">
import { ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref({
  labels: ['Compliant', 'Minor Issues', 'Major Issues'],
  datasets: [
    {
      data: [75, 17, 8],
      backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      borderWidth: 0
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  cutout: '70%'
}
</script>

<template>
  <div class="chart-container">
    <Doughnut 
      :data="chartData" 
      :options="chartOptions"
      height="250"
    />
    <div class="chart-center-text">
      <div class="percentage">75%</div>
      <div class="label">Compliant</div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
}

.chart-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.percentage {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4CAF50;
}

.label {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
}
</style>