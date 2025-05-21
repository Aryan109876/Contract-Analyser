<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContractById, getContractClauses } from '../services/contractService'
import type { Contract, Clause } from '../types/contract'
import ContractHeader from '../components/contracts/ContractHeader.vue'
import ClauseHighlighter from '../components/contracts/ClauseHighlighter.vue'
import ClauseDetailsSidebar from '../components/contracts/ClauseDetailsSidebar.vue'
import ComplianceIssuesList from '../components/contracts/ComplianceIssuesList.vue'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const contract = ref<Contract | null>(null)
const clauses = ref<Clause[]>([])
const activeTab = ref(0)
const selectedClauseId = ref<string | null>(null)
const showCompliancePanel = ref(false)

const contractId = computed(() => route.params.id as string)

onMounted(async () => {
  try {
    if (contractId.value) {
      contract.value = await getContractById(contractId.value)
      clauses.value = await getContractClauses(contractId.value)
    }
  } catch (error) {
    console.error('Error fetching contract details:', error)
  } finally {
    isLoading.value = false
  }
})

const selectedClause = computed(() => {
  if (!selectedClauseId.value) return null
  return clauses.value.find(clause => clause.id === selectedClauseId.value) || null
})

const selectClause = (clauseId: string) => {
  selectedClauseId.value = clauseId
  showCompliancePanel.value = true
}

const closeCompliancePanel = () => {
  showCompliancePanel.value = false
}

const backToList = () => {
  router.push({ name: 'Contracts' })
}
</script>

<template>
  <div>
    <v-btn 
      class="mb-4" 
      prepend-icon="mdi-arrow-left" 
      variant="text"
      @click="backToList"
    >
      Back to Contracts
    </v-btn>

    <v-skeleton-loader
      v-if="isLoading"
      type="article"
    ></v-skeleton-loader>

    <template v-else>
      <ContractHeader :contract="contract" />

      <v-card class="mt-4">
        <v-tabs
          v-model="activeTab"
          color="primary"
          align-tabs="start"
        >
          <v-tab value="0">Contract Content</v-tab>
          <v-tab value="1">Extracted Clauses</v-tab>
          <v-tab value="2">Compliance Issues</v-tab>
          <v-tab value="3">Versions</v-tab>
        </v-tabs>

        <v-card-text class="pa-4">
          <v-window v-model="activeTab">
            <!-- Contract Content Tab -->
            <v-window-item value="0">
              <div class="d-flex contract-content-container">
                <div class="contract-content flex-grow-1">
                  <ClauseHighlighter 
                    :content="contract.content"
                    :clauses="clauses"
                    @select-clause="selectClause"
                  />
                </div>
                
                <v-slide-x-transition>
                  <div v-if="showCompliancePanel" class="clause-details-panel">
                    <ClauseDetailsSidebar
                      :clause="selectedClause"
                      @close="closeCompliancePanel"
                    />
                  </div>
                </v-slide-x-transition>
              </div>
            </v-window-item>

            <!-- Extracted Clauses Tab -->
            <v-window-item value="1">
              <div class="clauses-list">
                <v-card
                  v-for="clause in clauses"
                  :key="clause.id"
                  class="mb-4 clause-card"
                  :color="clause.hasIssues ? 'pink-lighten-5' : 'bg-surface'"
                  @click="selectClause(clause.id)"
                >
                  <v-card-title class="pb-1">
                    <v-chip
                      size="small"
                      color="primary"
                      class="mr-2"
                    >
                      {{ clause.type }}
                    </v-chip>
                    {{ clause.title }}
                  </v-card-title>
                  <v-card-text>
                    <p>{{ clause.text }}</p>
                    <v-chip-group v-if="clause.tags && clause.tags.length">
                      <v-chip
                        v-for="(tag, i) in clause.tags"
                        :key="i"
                        size="small"
                        variant="outlined"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>

            <!-- Compliance Issues Tab -->
            <v-window-item value="2">
              <ComplianceIssuesList
                :contract="contract"
                :clauses="clauses"
                @select-clause="selectClause"
              />
            </v-window-item>

            <!-- Versions Tab -->
            <v-window-item value="3">
              <div v-if="contract.versions && contract.versions.length" class="versions-list">
                <v-timeline density="compact" align="start">
                  <v-timeline-item
                    v-for="(version, index) in contract.versions"
                    :key="index"
                    :dot-color="index === 0 ? 'primary' : 'grey'"
                    :icon="index === 0 ? 'mdi-star' : 'mdi-circle-small'"
                  >
                    <template v-slot:opposite>
                      {{ version.date }}
                    </template>
                    <v-card>
                      <v-card-title class="text-subtitle-1">
                        Version {{ version.version }}
                      </v-card-title>
                      <v-card-text>
                        <p>{{ version.description }}</p>
                        <v-chip-group>
                          <v-chip v-if="version.changes.added" size="small" color="success">
                            {{ version.changes.added }} clauses added
                          </v-chip>
                          <v-chip v-if="version.changes.modified" size="small" color="warning">
                            {{ version.changes.modified }} clauses modified
                          </v-chip>
                          <v-chip v-if="version.changes.removed" size="small" color="error">
                            {{ version.changes.removed }} clauses removed
                          </v-chip>
                        </v-chip-group>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          variant="text"
                          color="primary"
                          :to="{name: 'ContractCompare', params: {id1: contract.id, id2: version.id}}"
                        >
                          Compare
                        </v-btn>
                        <v-btn
                          variant="text"
                          :to="{name: 'ContractView', params: {id: version.id}}"
                        >
                          View
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </div>
              <v-alert
                v-else
                color="info"
                icon="mdi-information-outline"
              >
                No previous versions of this contract are available.
              </v-alert>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<style scoped>
.contract-content-container {
  position: relative;
  min-height: 500px;
}

.contract-content {
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

.clause-details-panel {
  width: 320px;
  margin-left: 16px;
}

.clause-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clause-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}
</style>