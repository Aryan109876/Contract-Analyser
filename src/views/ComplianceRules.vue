<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getComplianceRules } from '../services/complianceService'
import type { ComplianceRule } from '../types/compliance'

const isLoading = ref(true)
const rules = ref<ComplianceRule[]>([])
const search = ref('')
const selectedRule = ref<ComplianceRule | null>(null)
const detailsDialog = ref(false)

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Financial', value: 'financial' },
  { label: 'Data Protection', value: 'data-protection' },
  { label: 'Legal', value: 'legal' },
  { label: 'Regulatory', value: 'regulatory' },
  { label: 'Industry-specific', value: 'industry' }
]

const selectedCategory = ref('all')
const showInactive = ref(false)

onMounted(async () => {
  try {
    rules.value = await getComplianceRules()
  } catch (error) {
    console.error('Error fetching compliance rules:', error)
  } finally {
    isLoading.value = false
  }
})

const filteredRules = computed(() => {
  let result = [...rules.value]
  
  // Filter by search term
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(rule => 
      rule.name.toLowerCase().includes(searchLower) || 
      rule.description.toLowerCase().includes(searchLower) ||
      rule.regulation.toLowerCase().includes(searchLower)
    )
  }
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(rule => rule.category === selectedCategory.value)
  }
  
  // Filter by active status
  if (!showInactive.value) {
    result = result.filter(rule => rule.active)
  }
  
  return result
})

const viewRuleDetails = (rule: ComplianceRule) => {
  selectedRule.value = rule
  detailsDialog.value = true
}

const getSeverityColor = (severity: string) => {
  const severityColors = {
    'High': 'error',
    'Medium': 'warning',
    'Low': 'info'
  }
  return severityColors[severity] || 'grey'
}
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8">
        <h1 class="text-h4 font-weight-bold mb-2">Compliance Rules</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Manage rules used for contract compliance checking
        </p>
      </v-col>
      <v-col cols="12" sm="4" class="text-sm-right">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
        >
          New Rule
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="search"
              label="Search rules"
              append-icon="mdi-magnify"
              hide-details
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
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
          <v-col cols="12" md="4" class="d-flex align-center">
            <v-switch
              v-model="showInactive"
              label="Show inactive rules"
              color="primary"
              hide-details
              density="comfortable"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-skeleton-loader
      v-if="isLoading"
      type="table"
    ></v-skeleton-loader>

    <v-card v-else>
      <v-data-table
        :headers="[
          { title: 'Rule Name', key: 'name', sortable: true },
          { title: 'Regulation', key: 'regulation', sortable: true },
          { title: 'Category', key: 'category', sortable: true },
          { title: 'Severity', key: 'severity', sortable: true },
          { title: 'Status', key: 'active', sortable: true },
          { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
        ]"
        :items="filteredRules"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.severity="{ item }">
          <v-chip
            :color="getSeverityColor(item.severity)"
            size="small"
            text-color="white"
          >
            {{ item.severity }}
          </v-chip>
        </template>

        <template v-slot:item.active="{ item }">
          <v-chip
            :color="item.active ? 'success' : 'grey'"
            size="small"
            text-color="white"
          >
            {{ item.active ? 'Active' : 'Inactive' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            variant="text"
            color="primary"
            size="small"
            @click="viewRuleDetails(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            color="secondary"
            size="small"
          >
            <v-icon>mdi-pencil</v-icon>
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
      </v-data-table>
    </v-card>

    <!-- Rule Details Dialog -->
    <v-dialog
      v-model="detailsDialog"
      max-width="700px"
    >
      <v-card v-if="selectedRule">
        <v-card-title class="d-flex align-center">
          <div>
            <v-chip
              :color="getSeverityColor(selectedRule.severity)"
              size="small"
              text-color="white"
              class="mr-2"
            >
              {{ selectedRule.severity }}
            </v-chip>
            {{ selectedRule.name }}
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
          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-book-open-variant</v-icon>
                  </template>
                  <v-list-item-title>Regulation</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedRule.regulation }}</v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-tag-multiple</v-icon>
                  </template>
                  <v-list-item-title>Category</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedRule.category }}</v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-alert-circle-outline</v-icon>
                  </template>
                  <v-list-item-title>Severity</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedRule.severity }}</v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon :color="selectedRule.active ? 'success' : 'error'">
                      {{ selectedRule.active ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedRule.active ? 'Active' : 'Inactive' }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
            
            <v-col cols="12" md="6">
              <div class="pa-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-2">Description</h3>
                <p>{{ selectedRule.description }}</p>
                
                <h3 class="text-subtitle-1 font-weight-bold mt-4 mb-2">Detection Pattern</h3>
                <div class="rule-pattern pa-2">
                  <code>{{ selectedRule.pattern }}</code>
                </div>
              </div>
            </v-col>
          </v-row>
          
          <v-divider class="my-4"></v-divider>
          
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Guidance</h3>
          <p>{{ selectedRule.guidance }}</p>
          
          <h3 class="text-subtitle-1 font-weight-bold mt-4 mb-2">Example of Non-Compliant Text</h3>
          <div class="non-compliant-example pa-2 mb-2">
            <p>{{ selectedRule.nonCompliantExample }}</p>
          </div>
          
          <h3 class="text-subtitle-1 font-weight-bold mt-4 mb-2">Example of Compliant Text</h3>
          <div class="compliant-example pa-2">
            <p>{{ selectedRule.compliantExample }}</p>
          </div>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="detailsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.rule-pattern {
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.non-compliant-example {
  background-color: rgba(244, 67, 54, 0.1);
  border-left: 4px solid #F44336;
  border-radius: 4px;
}

.compliant-example {
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4CAF50;
  border-radius: 4px;
}
</style>