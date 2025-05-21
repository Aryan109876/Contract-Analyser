<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatCard from '../components/dashboard/StatCard.vue'
import ContractStatusChart from '../components/dashboard/ContractStatusChart.vue'
import ComplianceOverviewChart from '../components/dashboard/ComplianceOverviewChart.vue'
import RecentContractsTable from '../components/dashboard/RecentContractsTable.vue'
import ClauseTypeDistributionChart from '../components/dashboard/ClauseTypeDistributionChart.vue'

const router = useRouter()
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const navigateToContracts = () => {
  router.push({ name: 'Contracts' })
}
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Dashboard</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Overview of your contract analysis and compliance status
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <StatCard 
          title="Total Contracts" 
          value="127" 
          icon="mdi-file-document-outline" 
          color="primary"
          trend="up"
          percent="12"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <StatCard 
          title="Compliance Issues" 
          value="24" 
          icon="mdi-alert-circle-outline" 
          color="error"
          trend="down"
          percent="5"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <StatCard 
          title="Pending Review" 
          value="18" 
          icon="mdi-clock-outline" 
          color="warning"
          trend="up"
          percent="8"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <StatCard 
          title="Clauses Extracted" 
          value="1,482" 
          icon="mdi-text-box-check-outline" 
          color="success"
          trend="up"
          percent="15"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <span>Contract Analysis Overview</span>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="timeRange"
              color="primary"
              density="compact"
              mandatory
              variant="outlined"
            >
              <v-btn value="week">Week</v-btn>
              <v-btn value="month">Month</v-btn>
              <v-btn value="year">Year</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text class="py-0">
            <v-skeleton-loader
              v-if="isLoading"
              type="image"
              height="300"
            ></v-skeleton-loader>
            <ContractStatusChart v-else />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mb-4 h-100">
          <v-card-title>Compliance Overview</v-card-title>
          <v-card-text class="py-0">
            <v-skeleton-loader
              v-if="isLoading"
              type="image"
              height="300"
            ></v-skeleton-loader>
            <ComplianceOverviewChart v-else />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex align-center">
            <span>Recent Contracts</span>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="navigateToContracts"
            >
              View All
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-skeleton-loader
              v-if="isLoading"
              type="table"
            ></v-skeleton-loader>
            <RecentContractsTable v-else />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Clause Type Distribution</v-card-title>
          <v-card-text>
            <v-skeleton-loader
              v-if="isLoading"
              type="image"
              height="250"
            ></v-skeleton-loader>
            <ClauseTypeDistributionChart v-else />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      timeRange: 'month'
    }
  }
}
</script>