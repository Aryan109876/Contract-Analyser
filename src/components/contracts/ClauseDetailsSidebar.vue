<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Clause } from '../../types/contract'

const props = defineProps<{
  clause: Clause | null
}>()

const emit = defineEmits(['close'])

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

const copyClauseText = () => {
  if (props.clause) {
    navigator.clipboard.writeText(props.clause.text)
      .then(() => {
        alert('Clause text copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy clause text:', err)
      })
  }
}
</script>

<template>
  <v-card v-if="clause" class="clause-details-card h-100">
    <v-card-title class="pb-1 d-flex align-center">
      <div>
        <v-chip
          color="primary"
          size="small"
          class="mr-2"
        >
          {{ clause.type }}
        </v-chip>
        {{ clause.title }}
      </div>
      <v-spacer></v-spacer>
      <v-btn
        icon
        variant="text"
        size="small"
        @click="emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    
    <v-card-text>
      <div class="clause-text pa-2 mb-4">
        {{ clause.text }}
      </div>
      
      <div class="d-flex mb-4">
        <v-btn
          prepend-icon="mdi-content-copy"
          variant="text"
          size="small"
          @click="copyClauseText"
        >
          Copy Text
        </v-btn>
        
        <v-spacer></v-spacer>
        
        <v-btn
          prepend-icon="mdi-information-variant"
          variant="text"
          size="small"
        >
          Similar Clauses
        </v-btn>
      </div>
      
      <v-divider class="mb-4"></v-divider>
      
      <div v-if="clause.hasIssues" class="compliance-issues">
        <div class="d-flex align-center mb-2">
          <v-icon 
            :color="getSeverityColor(clause.severity)"
            class="mr-2"
          >
            {{ getSeverityIcon(clause.severity) }}
          </v-icon>
          <span class="text-subtitle-1 font-weight-bold">Compliance Issues</span>
        </div>
        
        <v-alert
          v-for="(issue, index) in clause.issues"
          :key="index"
          :type="getSeverityColor(issue.severity)"
          variant="tonal"
          class="mb-2"
        >
          <div class="text-subtitle-2 font-weight-bold">{{ issue.title }}</div>
          <div>{{ issue.description }}</div>
        </v-alert>
        
        <div class="suggested-revision mt-4">
          <div class="text-subtitle-2 font-weight-bold mb-2">Suggested Revision</div>
          <div class="suggested-text pa-2">
            {{ clause.suggestedRevision || 'No suggested revision available.' }}
          </div>
        </div>
      </div>
      
      <div v-else class="compliance-status">
        <div class="d-flex align-center">
          <v-icon 
            color="success"
            class="mr-2"
          >
            mdi-check-circle
          </v-icon>
          <span class="text-subtitle-1 font-weight-bold">No Compliance Issues</span>
        </div>
        
        <v-alert
          type="success"
          variant="tonal"
          class="mt-2"
        >
          This clause appears to be compliant with all applicable regulations.
        </v-alert>
      </div>
      
      <v-divider class="my-4"></v-divider>
      
      <div class="meta-data">
        <div class="text-subtitle-2 font-weight-bold mb-2">Metadata</div>
        
        <v-list density="compact">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="primary" size="small">mdi-tag</v-icon>
            </template>
            <v-list-item-title>Type</v-list-item-title>
            <v-list-item-subtitle>{{ clause.type }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item v-if="clause.tags && clause.tags.length">
            <template v-slot:prepend>
              <v-icon color="primary" size="small">mdi-tag-multiple</v-icon>
            </template>
            <v-list-item-title>Tags</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip-group>
                <v-chip
                  v-for="(tag, i) in clause.tags"
                  :key="i"
                  size="x-small"
                  variant="outlined"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item v-if="clause.references && clause.references.length">
            <template v-slot:prepend>
              <v-icon color="primary" size="small">mdi-book-open-variant</v-icon>
            </template>
            <v-list-item-title>References</v-list-item-title>
            <v-list-item-subtitle>
              <div v-for="(ref, i) in clause.references" :key="i">
                {{ ref }}
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.clause-details-card {
  border-left: 3px solid var(--v-primary-base);
}

.clause-text {
  background-color: #f5f5f5;
  border-radius: 4px;
  font-style: italic;
  white-space: pre-wrap;
}

.suggested-text {
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>