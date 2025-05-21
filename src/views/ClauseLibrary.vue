<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getStandardClauses } from '../services/clauseService'
import type { StandardClause } from '../types/clause'

const isLoading = ref(true)
const clauses = ref<StandardClause[]>([])
const search = ref('')
const selectedClause = ref<StandardClause | null>(null)
const detailsDialog = ref(false)

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Liability', value: 'liability' },
  { label: 'Termination', value: 'termination' },
  { label: 'Payment', value: 'payment' },
  { label: 'Confidentiality', value: 'confidentiality' },
  { label: 'Intellectual Property', value: 'intellectual-property' },
  { label: 'Regulatory', value: 'regulatory' },
  { label: 'Data Protection', value: 'data-protection' },
  { label: 'Force Majeure', value: 'force-majeure' }
]

const selectedCategory = ref('all')

onMounted(async () => {
  try {
    clauses.value = await getStandardClauses()
  } catch (error) {
    console.error('Error fetching standard clauses:', error)
  } finally {
    isLoading.value = false
  }
})

const filteredClauses = computed(() => {
  let result = [...clauses.value]
  
  // Filter by search term
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(clause => 
      clause.title.toLowerCase().includes(searchLower) || 
      clause.text.toLowerCase().includes(searchLower) ||
      (clause.tags && clause.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    )
  }
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(clause => clause.category === selectedCategory.value)
  }
  
  return result
})

const viewClauseDetails = (clause: StandardClause) => {
  selectedClause.value = clause
  detailsDialog.value = true
}

const copyClauseText = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      // Show success message
      alert('Clause copied to clipboard')
    })
    .catch(err => {
      console.error('Failed to copy clause: ', err)
    })
}
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Clause Library</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Browse and use standard contract clauses
        </p>
      </v-col>
    </v-row>

    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              label="Search for clauses"
              append-icon="mdi-magnify"
              hide-details
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="label"
              item-value="value"
              label="Category"
              hide-details
              density="comfortable"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-skeleton-loader
      v-if="isLoading"
      type="card-avatar, card-avatar, card-avatar"
      class="mb-4"
    ></v-skeleton-loader>

    <div v-else-if="filteredClauses.length" class="clause-grid">
      <v-row>
        <v-col
          v-for="clause in filteredClauses"
          :key="clause.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card 
            class="h-100 clause-library-card"
            @click="viewClauseDetails(clause)"
          >
            <v-card-title class="pb-1">
              <v-chip
                color="primary"
                size="small"
                class="mr-2"
                variant="flat"
              >
                {{ clause.category }}
              </v-chip>
              {{ clause.title }}
            </v-card-title>
            <v-card-text>
              <p class="clause-preview">{{ clause.text.substring(0, 150) }}{{ clause.text.length > 150 ? '...' : '' }}</p>
              
              <div class="d-flex align-center mt-2">
                <v-chip-group>
                  <v-chip
                    v-for="(tag, i) in clause.tags.slice(0, 2)"
                    :key="i"
                    size="x-small"
                    variant="outlined"
                  >
                    {{ tag }}
                  </v-chip>
                  <v-chip
                    v-if="clause.tags.length > 2"
                    size="x-small"
                    variant="outlined"
                  >
                    +{{ clause.tags.length - 2 }}
                  </v-chip>
                </v-chip-group>
                
                <v-spacer></v-spacer>

                <div class="compliance-rating">
                  <v-icon
                    :color="clause.complianceRating >= 4 ? 'success' : (clause.complianceRating >= 3 ? 'warning' : 'error')"
                    size="small"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span class="text-caption ml-1">{{ clause.complianceRating }}/5</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-alert
      v-else
      type="info"
      text="No clauses found matching your search criteria."
      class="mt-4"
    ></v-alert>

    <!-- Clause Details Dialog -->
    <v-dialog
      v-model="detailsDialog"
      max-width="700px"
    >
      <v-card v-if="selectedClause">
        <v-card-title class="d-flex align-center">
          <div>
            <v-chip
              color="primary"
              size="small"
              class="mr-2"
            >
              {{ selectedClause.category }}
            </v-chip>
            {{ selectedClause.title }}
          </div>
          <v-spacer></v-spacer>
          <v-btn
            icon
            variant="text"
            @click="detailsDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-tabs v-model="activeTab">
            <v-tab value="details">Details</v-tab>
            <v-tab value="usage">Usage Guidance</v-tab>
            <v-tab value="compliance">Compliance Info</v-tab>
          </v-tabs>
          
          <v-window v-model="activeTab" class="mt-4">
            <v-window-item value="details">
              <div class="clause-full-text pa-2">
                {{ selectedClause.text }}
              </div>
              
              <v-divider class="my-4"></v-divider>
              
              <div class="d-flex align-center">
                <div>
                  <div class="text-subtitle-2">Tags</div>
                  <v-chip-group>
                    <v-chip
                      v-for="(tag, i) in selectedClause.tags"
                      :key="i"
                      size="small"
                      variant="outlined"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </div>
                
                <v-spacer></v-spacer>
                
                <v-btn
                  color="primary"
                  prepend-icon="mdi-content-copy"
                  @click.stop="copyClauseText(selectedClause.text)"
                >
                  Copy
                </v-btn>
              </div>
            </v-window-item>
            
            <v-window-item value="usage">
              <div v-if="selectedClause.usageGuidance">
                <p>{{ selectedClause.usageGuidance }}</p>
              </div>
              <v-alert
                v-else
                type="info"
                text="No usage guidance available for this clause."
              ></v-alert>
            </v-window-item>
            
            <v-window-item value="compliance">
              <div class="compliance-info">
                <div class="d-flex align-center mb-4">
                  <div class="text-h6">Compliance Rating</div>
                  <v-spacer></v-spacer>
                  <v-rating
                    :model-value="selectedClause.complianceRating"
                    color="warning"
                    density="compact"
                    readonly
                    half-increments
                  ></v-rating>
                  <span class="ml-2">{{ selectedClause.complianceRating }}/5</span>
                </div>
                
                <v-list>
                  <v-list-item
                    v-for="(regulation, index) in selectedClause.regulations"
                    :key="index"
                    :prepend-icon="regulation.compliant ? 'mdi-check-circle' : 'mdi-alert-circle'"
                    :prepend-icon-color="regulation.compliant ? 'success' : 'error'"
                  >
                    <v-list-item-title>{{ regulation.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ regulation.description }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      activeTab: 'details'
    }
  }
}
</script>

<style scoped>
.clause-library-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clause-library-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

.clause-preview {
  height: 80px;
  overflow: hidden;
  margin-bottom: 8px;
}

.clause-full-text {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  white-space: pre-wrap;
  margin-bottom: 16px;
}
</style>