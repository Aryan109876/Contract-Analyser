<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as Diff from 'diff'
import type { Contract } from '../../types/contract'

const props = defineProps<{
  contract1: Contract | null
  contract2: Contract | null
  compareMode: string
  diffType: string
}>()

// Generate the diff based on contract content
const diffResult = computed(() => {
  if (!props.contract1 || !props.contract2) return []
  
  const text1 = props.contract1.content
  const text2 = props.contract2.content
  
  if (props.diffType === 'clause') {
    // For clause comparison, we'd need a more sophisticated approach
    // This is a simplified version for demo purposes
    return generateClauseDiff(text1, text2)
  } else {
    // Text comparison (line by line)
    return Diff.diffLines(text1, text2)
  }
})

// Function to generate clause-based diff (simplified)
const generateClauseDiff = (text1: string, text2: string) => {
  // In a real implementation, this would use NLP to identify and compare clauses
  // For demo purposes, we'll use a simplified paragraph-based approach
  
  // Split texts into paragraphs (assuming paragraphs are separated by double newlines)
  const paragraphs1 = text1.split('\n\n')
  const paragraphs2 = text2.split('\n\n')
  
  // Use diffArrays to compare the two arrays of paragraphs
  return Diff.diffArrays(paragraphs1, paragraphs2)
}

// Format the diff output for display
const formatDiff = (diff: Diff.Change[]) => {
  return diff.map(part => ({
    text: part.value,
    added: part.added,
    removed: part.removed
  }))
}

const formattedDiff = computed(() => formatDiff(diffResult.value))

// Separate the diff into old and new versions for side-by-side view
const oldVersion = computed(() => {
  return formattedDiff.value.filter(part => !part.added)
})

const newVersion = computed(() => {
  return formattedDiff.value.filter(part => !part.removed)
})
</script>

<template>
  <v-card>
    <v-card-text>
      <div v-if="compareMode === 'side-by-side'" class="side-by-side-diff">
        <v-row>
          <v-col cols="12" md="6" class="diff-col">
            <div class="diff-header">
              <v-avatar
                color="primary"
                size="24"
                class="mr-2"
              >
                <span class="text-caption">1</span>
              </v-avatar>
              <span class="text-subtitle-1 font-weight-bold">{{ contract1?.name }}</span>
            </div>
            
            <div class="diff-content pa-2">
              <div 
                v-for="(part, index) in oldVersion" 
                :key="`old-${index}`"
                :class="{'diff-removed': part.removed, 'diff-unchanged': !part.removed && !part.added}"
              >
                {{ part.text }}
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" md="6" class="diff-col">
            <div class="diff-header">
              <v-avatar
                color="secondary"
                size="24"
                class="mr-2"
              >
                <span class="text-caption">2</span>
              </v-avatar>
              <span class="text-subtitle-1 font-weight-bold">{{ contract2?.name }}</span>
            </div>
            
            <div class="diff-content pa-2">
              <div 
                v-for="(part, index) in newVersion" 
                :key="`new-${index}`"
                :class="{'diff-added': part.added, 'diff-unchanged': !part.removed && !part.added}"
              >
                {{ part.text }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      
      <div v-else class="inline-diff">
        <div class="diff-header d-flex align-center mb-4">
          <div class="mr-4">
            <v-avatar
              color="primary"
              size="24"
              class="mr-2"
            >
              <span class="text-caption">1</span>
            </v-avatar>
            <span class="text-subtitle-1">{{ contract1?.name }}</span>
          </div>
          
          <v-icon>mdi-arrow-right</v-icon>
          
          <div class="ml-4">
            <v-avatar
              color="secondary"
              size="24"
              class="mr-2"
            >
              <span class="text-caption">2</span>
            </v-avatar>
            <span class="text-subtitle-1">{{ contract2?.name }}</span>
          </div>
        </div>
        
        <div class="diff-content pa-2">
          <div 
            v-for="(part, index) in formattedDiff" 
            :key="`inline-${index}`"
            :class="{
              'diff-added': part.added,
              'diff-removed': part.removed,
              'diff-unchanged': !part.removed && !part.added
            }"
          >
            {{ part.text }}
          </div>
        </div>
      </div>
      
      <v-divider class="my-4"></v-divider>
      
      <div class="diff-legend d-flex">
        <div class="mr-4 d-flex align-center">
          <div class="legend-color legend-added mr-2"></div>
          <span>Added</span>
        </div>
        <div class="mr-4 d-flex align-center">
          <div class="legend-color legend-removed mr-2"></div>
          <span>Removed</span>
        </div>
        <div class="d-flex align-center">
          <div class="legend-color legend-unchanged mr-2"></div>
          <span>Unchanged</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.diff-content {
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  max-height: 60vh;
  overflow-y: auto;
}

.diff-header {
  padding: 8px 0;
  margin-bottom: 8px;
  font-weight: bold;
}

.diff-added {
  background-color: rgba(76, 175, 80, 0.2);
  color: #2E7D32;
}

.diff-removed {
  background-color: rgba(244, 67, 54, 0.2);
  color: #C62828;
  text-decoration: line-through;
}

.diff-unchanged {
  color: #212121;
}

.diff-col {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.diff-col:last-child {
  border-right: none;
}

.legend-color {
  width: 20px;
  height: 12px;
  border-radius: 2px;
}

.legend-added {
  background-color: rgba(76, 175, 80, 0.2);
  border: 1px solid #4CAF50;
}

.legend-removed {
  background-color: rgba(244, 67, 54, 0.2);
  border: 1px solid #F44336;
}

.legend-unchanged {
  background-color: #f5f5f5;
  border: 1px solid #9E9E9E;
}
</style>