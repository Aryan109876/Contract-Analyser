<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Contract, Clause } from '../../types/contract'

const props = defineProps<{
  contract: Contract | null
  clauses: Clause[]
}>()

const emit = defineEmits(['select-clause'])

// Computed property to get only clauses with issues
const issuesList = computed(() => {
  if (!props.clauses) return []
  
  return props.clauses
    .filter(clause => clause.hasIssues)
    .sort((a, b) => {
      // Sort by severity (high > medium > low)
      const severityOrder = { high: 3, medium: 2, low: 1 }
      return (severityOrder[b.severity || 'low'] || 0) - (severityOrder[a.severity || 'low'] || 0)
    })
})

const viewClauseDetails = (clauseId: string) => {
  emit('select-clause', clauseId)
}

const getSeverityColor = (severity: string | undefined) => {
  if (!severity) return 'grey'
  
  const severityColors = {
    'high': 'error',
    'medium': 'warning',
    'low': 'info'
  }
  return severityColors[severity] || 'grey'
}

const getSeverityIcon = (severity: string | undefined) => {
  if (!severity) return 'mdi-information-outline'
  
  const severityIcons = {
    'high': 'mdi-alert-circle',
    'medium': 'mdi-alert',
    'low': 'mdi-information'
  }
  return severityIcons[severity] || 'mdi-information-outline'
}
</script>

<template>
  <div>
    <v-alert
      v-if="!issuesList.length"
      type="success"
      variant="tonal"
      class="mb-4"
    >
      No compliance issues detected in this contract.
    </v-alert>
    
    <div v-else>
      <div class="d-flex align-center mb-4">
        <div class="text-subtitle-1 font-weight-bold">
          {{ issuesList.length }} Compliance {{ issuesList.length === 1 ? 'Issue' : 'Issues' }} Found
        </div>
        <v-spacer></v-spacer>
        <v-btn
          prepend-icon="mdi-download"
          variant="outlined"
          size="small"
        >
          Export Report
        </v-btn>
      </div>
      
      <v-card
        v-for="clause in issuesList"
        :key="clause.id"
        class="mb-4 issue-card"
        :color="getSeverityColor(clause.severity) + '-lighten-5'"
        @click="viewClauseDetails(clause.id)"
      >
        <v-card-title class="pb-1">
          <div class="d-flex align-center">
            <v-avatar
              :color="getSeverityColor(clause.severity)"
              size="32"
              class="mr-2"
            >
              <v-icon color="white" size="20">
                {{ getSeverityIcon(clause.severity) }}
              </v-icon>
            </v-avatar>
            <div>
              <span class="text-subtitle-1 font-weight-bold">{{ clause.title }}</span>
              <div>
                <v-chip
                  color="primary"
                  size="x-small"
                  class="mr-1"
                >
                  {{ clause.type }}
                </v-chip>
                <v-chip
                  :color="getSeverityColor(clause.severity)"
                  size="x-small"
                  text-color="white"
                >
                  {{ clause.severity ? clause.severity.toUpperCase() : 'UNKNOWN' }} SEVERITY
                </v-chip>
              </div>
            </div>
          </div>
        </v-card-title>
        
        <v-card-text>
          <div class="clause-text pa-2 mb-3">
            {{ clause.text }}
          </div>
          
          <div v-if="clause.issues && clause.issues.length" class="issues-list">
            <div 
              v-for="(issue, index) in clause.issues" 
              :key="index"
              class="issue-item pa-2 mb-2"
              :class="`issue-${issue.severity}`"
            >
              <div class="text-subtitle-2 font-weight-bold">{{ issue.title }}</div>
              <div>{{ issue.description }}</div>
              <div v-if="issue.regulation" class="text-caption mt-1">
                <strong>Reference:</strong> {{ issue.regulation }}
              </div>
            </div>
          </div>
          
          <div v-if="clause.suggestedRevision" class="suggested-revision mt-3">
            <div class="text-subtitle-2 font-weight-bold mb-1">Suggested Revision</div>
            <div class="suggested-text pa-2">
              {{ clause.suggestedRevision }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.issue-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.issue-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

.clause-text {
  background-color: white;
  border-radius: 4px;
  font-style: italic;
  white-space: pre-wrap;
}

.issue-item {
  border-radius: 4px;
}

.issue-high {
  background-color: rgba(244, 67, 54, 0.1);
  border-left: 3px solid #F44336;
}

.issue-medium {
  background-color: rgba(255, 152, 0, 0.1);
  border-left: 3px solid #FF9800;
}

.issue-low {
  background-color: rgba(33, 150, 243, 0.1);
  border-left: 3px solid #2196F3;
}

.suggested-text {
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>