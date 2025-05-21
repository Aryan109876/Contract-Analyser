<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import ContractUploader from '../components/contracts/ContractUploader.vue'
import ContractFilterPanel from '../components/contracts/ContractFilterPanel.vue'
import { getContracts } from '../services/contractService'
import type { Contract } from '../types/contract'

const router = useRouter()
const isLoading = ref(true)
const contracts = ref<Contract[]>([])
const search = ref('')
const filterDialog = ref(false)
const uploadDialog = ref(false)
const selectedContracts = ref([])

const headers = [
  { title: 'Contract Name', key: 'name', sortable: true },
  { title: 'Type', key: 'type', sortable: true },
  { title: 'Date Added', key: 'dateAdded', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Compliance', key: 'compliance', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const filters = reactive({
  status: [],
  type: [],
  compliance: [],
  dateRange: null
})

onMounted(async () => {
  try {
    contracts.value = await getContracts()
  } catch (error) {
    console.error('Error fetching contracts:', error)
  } finally {
    isLoading.value = false
  }
})

const filteredContracts = computed(() => {
  let result = [...contracts.value]
  
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(contract => 
      contract.name.toLowerCase().includes(searchLower) || 
      contract.type.toLowerCase().includes(searchLower)
    )
  }
  
  // Apply additional filters
  if (filters.status.length) {
    result = result.filter(contract => filters.status.includes(contract.status))
  }
  
  if (filters.type.length) {
    result = result.filter(contract => filters.type.includes(contract.type))
  }
  
  if (filters.compliance.length) {
    result = result.filter(contract => filters.compliance.includes(contract.compliance))
  }
  
  return result
})

const viewContract = (contract: Contract) => {
  router.push({ name: 'ContractView', params: { id: contract.id } })
}

const compareSelected = () => {
  if (selectedContracts.value.length === 2) {
    const [id1, id2] = selectedContracts.value
    router.push({ 
      name: 'ContractCompare', 
      params: { 
        id1, 
        id2 
      } 
    })
  }
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
  <div>
    <v-row>
      <v-col cols="12" sm="8">
        <h1 class="text-h4 font-weight-bold mb-2">Contracts</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Manage and analyze your contract documents
        </p>
      </v-col>
      <v-col cols="12" sm="4" class="text-sm-right">
        <v-btn
          color="primary"
          prepend-icon="mdi-upload"
          class="mr-2"
          @click="uploadDialog = true"
        >
          Upload
        </v-btn>
        <v-btn
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-compare"
          :disabled="selectedContracts.length !== 2"
          @click="compareSelected"
        >
          Compare
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="mt-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="7" md="9">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search contracts"
              single-line
              hide-details
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" md="3" class="text-sm-right">
            <v-btn
              prepend-icon="mdi-filter-variant"
              variant="outlined"
              @click="filterDialog = true"
            >
              Filters
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="filteredContracts"
        :loading="isLoading"
        v-model:page="page"
        :items-length="filteredContracts.length"
        item-value="id"
        show-select
        v-model:selected="selectedContracts"
        class="elevation-0"
      >
        <template v-slot:item.dateAdded="{ item }">
          {{ formatDate(item.dateAdded) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            text-color="white"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.compliance="{ item }">
          <v-chip
            :color="getComplianceColor(item.compliance)"
            size="small"
            text-color="white"
          >
            {{ item.compliance }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            variant="text"
            color="primary"
            size="small"
            @click="viewContract(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            color="secondary"
            size="small"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            color="error"
            size="small"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table-server>
    </v-card>

    <!-- Filter Dialog -->
    <ContractFilterPanel
      v-model="filterDialog"
      v-model:filters="filters"
    />

    <!-- Upload Dialog -->
    <ContractUploader
      v-model="uploadDialog"
    />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
    }
  }
}
</script>