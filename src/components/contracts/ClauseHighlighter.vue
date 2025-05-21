<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { Clause } from '../../types/contract'

const props = defineProps<{
  content: string
  clauses: Clause[]
}>()

const emit = defineEmits(['select-clause'])

// Highlighted content with HTML markers
const highlightedContent = computed(() => {
  let content = props.content
  
  // Sort clauses by their start position in descending order
  // This prevents position shifts when inserting HTML tags
  const sortedClauses = [...props.clauses].sort((a, b) => {
    const posA = content.indexOf(a.text)
    const posB = content.indexOf(b.text)
    return posB - posA
  })
  
  // Add highlighting HTML for each clause
  sortedClauses.forEach(clause => {
    const clausePos = content.indexOf(clause.text)
    if (clausePos !== -1) {
      const highlightClass = clause.hasIssues ? 
        'highlight-' + (clause.severity === 'high' ? 'error' : 'warning') : 
        'highlight'
      
      const before = content.substring(0, clausePos)
      const after = content.substring(clausePos + clause.text.length)
      
      content = `${before}<span class="${highlightClass}" data-clause-id="${clause.id}">${clause.text}</span>${after}`
    }
  })
  
  return content
})

// Set up an event to catch clicks on highlighted clauses
onMounted(() => {
  const contractContent = document.querySelector('.contract-content')
  if (contractContent) {
    contractContent.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('highlight') || 
          target.classList.contains('highlight-warning') || 
          target.classList.contains('highlight-error')) {
        const clauseId = target.getAttribute('data-clause-id')
        if (clauseId) {
          emit('select-clause', clauseId)
        }
      }
    })
  }
})
</script>

<template>
  <div class="contract-content-wrapper">
    <div 
      class="contract-text" 
      v-html="highlightedContent"
    ></div>
  </div>
</template>

<style scoped>
.contract-content-wrapper {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contract-text {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.contract-text :deep(.highlight) {
  background-color: rgba(255, 193, 7, 0.2);
  border-bottom: 2px solid #FFC107;
  padding: 2px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contract-text :deep(.highlight-warning) {
  background-color: rgba(255, 152, 0, 0.2);
  border-bottom: 2px solid #FF9800;
  padding: 2px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contract-text :deep(.highlight-error) {
  background-color: rgba(244, 67, 54, 0.2);
  border-bottom: 2px solid #F44336;
  padding: 2px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contract-text :deep(.highlight:hover),
.contract-text :deep(.highlight-warning:hover),
.contract-text :deep(.highlight-error:hover) {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>