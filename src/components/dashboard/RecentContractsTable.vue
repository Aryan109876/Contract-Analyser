<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { getRecentContracts } from '../../services/contractService'
import type { Contract } from '../../types/contract'

const router = useRouter()
const contracts = ref<Contract[]>([])

onMounted(async () => {
  contracts.value = await getRecentContracts()
})

const viewContract = (contract: Contract) => {
  router.push({ name: 'ContractView', params: { id: contract.id } })
}

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy')
}

const getStatusColor = (status: string) => {
  const statusColors = {
    'Analyzed': 'success',
    'Pending': 'warning',
    'In Review': 'info',
    'Rejected': 'error'
  }
  return statusColors[status] || 'grey'
}

const getComplianceColor = (compliance: string) => {
  const complianceColors = {
    'Compliant': 'success',
    'Minor Issues': 'warning',
    'Major Issues': 'error'
  }
  return complianceColors[compliance] || 'grey'
}
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th>Contract Name</th>
        <th>Type</th>
        <th>Date Added</th>
        <th>Status</th>
        <th>Compliance</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contract in contracts" :key="contract.id">
        <td>
          <div class="d-flex align-center">
            <v-icon 
              :color="contract.type === 'NDA' ? 'blue-grey' : 'primary'"
              size="small" 
              class="mr-2"
            >
              mdi-file-document-outline
            </v-icon>
            {{ contract.name }}
          </div>
        </td>
        <td>{{ contract.type }}</td>
        <td>{{ formatDate(contract.dateAdded) }}</td>
        <td>
          <v-chip
            :color="getStatusColor(contract.status)"
            size="x-small"
            text-color="white"
          >
            {{ contract.status }}
          </v-chip>
        </td>
        <td>
          <v-chip
            :color="getComplianceColor(contract.compliance)"
            size="x-small"
            text-color="white"
          >
            {{ contract.compliance }}
          </v-chip>
        </td>
        <td class="text-right">
          <v-btn
            icon
            variant="text"
            color="primary"
            size="x-small"
            @click="viewContract(contract)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>