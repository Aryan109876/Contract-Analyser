<script setup lang="ts">
import { ref } from 'vue'
import type { Contract } from '../../types/contract'

defineProps<{
  contract: Contract | null
}>()

const showOptions = ref(false)

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
  <div v-if="contract">
    <v-card class="contract-header">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="8">
            <div class="d-flex align-center">
              <v-avatar
                :color="contract.type === 'NDA' ? 'blue-grey' : 'primary'"
                size="48"
                class="mr-4"
              >
                <v-icon color="white" size="24">mdi-file-document-outline</v-icon>
              </v-avatar>
              
              <div>
                <h1 class="text-h4 font-weight-bold mb-1">{{ contract.name }}</h1>
                <div class="d-flex align-center">
                  <v-chip
                    class="mr-2"
                    size="small"
                  >
                    {{ contract.type }}
                  </v-chip>
                  
                  <v-chip
                    :color="getStatusColor(contract.status)"
                    text-color="white"
                    size="small"
                    class="mr-2"
                  >
                    {{ contract.status }}
                  </v-chip>
                  
                  <v-chip
                    :color="getComplianceColor(contract.compliance)"
                    text-color="white"
                    size="small"
                  >
                    {{ contract.compliance }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" sm="4" class="text-sm-right">
            <v-btn
              color="primary"
              class="mr-2"
              prepend-icon="mdi-download"
            >
              Download
            </v-btn>
            
            <v-menu
              v-model="showOptions"
              location="bottom end"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  prepend-icon="mdi-pencil"
                  title="Edit Metadata"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-share-variant"
                  title="Share"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-delete"
                  title="Delete"
                  color="error"
                ></v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-2 text-medium-emphasis">Added On</div>
            <div>{{ new Date(contract.dateAdded).toLocaleDateString() }}</div>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-2 text-medium-emphasis">Expiry Date</div>
            <div>{{ contract.expiryDate ? new Date(contract.expiryDate).toLocaleDateString() : 'N/A' }}</div>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-2 text-medium-emphasis">Parties</div>
            <div>{{ contract.parties.join(', ') }}</div>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle-2 text-medium-emphasis">Value</div>
            <div>{{ contract.value ? `$${contract.value.toLocaleString()}` : 'N/A' }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.contract-header {
  border-top: 4px solid var(--v-primary-base);
}
</style>