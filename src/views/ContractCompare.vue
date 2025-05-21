<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContractById } from '../services/contractService'
import type { Contract } from '../types/contract'
import ContractCompareDiff from '../components/contracts/ContractCompareDiff.vue'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const contract1 = ref<Contract | null>(null)
const contract2 = ref<Contract | null>(null)
const compareMode = ref('side-by-side') // 'side-by-side' or 'inline'
const diffType = ref('text') // 'text' or 'clause'

const id1 = computed(() => route.params.id1 as string)
const id2 = computed(() => route.params.id2 as string)

onMounted(async () => {
  try {
    if (id1.value && id2.value) {
      // Load both contracts in parallel
      const [c1, c2] = await Promise.all([
        getContractById(id1.value),
        getContractById(id2.value)
      ])
      
      contract1.value = c1
      contract2.value = c2
    }
  } catch (error) {
    console.error('Error fetching contracts for comparison:', error)
  } finally {
    isLoading.value = false
  }
})

const backToContracts = () => {
  router.push({ name: 'Contracts' })
}
</script>

<template>
  <div>
    <v-btn 
      class="mb-4" 
      prepend-icon="mdi-arrow-left" 
      variant="text"
      @click="backToContracts"
    >
      Back to Contracts
    </v-btn>

    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Contract Comparison</h1>
        <p class="text-subtitle-1 text-medium-emphasis" v-if="!isLoading && contract1 && contract2">
          Comparing 
          <strong>{{ contract1.name }}</strong> with 
          <strong>{{ contract2.name }}</strong>
        </p>
      </v-col>
    </v-row>

    <v-skeleton-loader
      v-if="isLoading"
      type="article"
      class="mb-4"
    ></v-skeleton-loader>

    <template v-else-if="contract1 && contract2">
      <v-card class="mb-4">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="8">
              <v-btn-toggle
                v-model="compareMode"
                mandatory
                color="primary"
                density="comfortable"
              >
                <v-btn value="side-by-side">
                  <v-icon start>mdi-view-sequential</v-icon>
                  Side by Side
                </v-btn>
                <v-btn value="inline">
                  <v-icon start>mdi-view-headline</v-icon>
                  Inline
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="diffType"
                :items="[
                  { title: 'Text Comparison', value: 'text' },
                  { title: 'Clause Comparison', value: 'clause' }
                ]"
                item-title="title"
                item-value="value"
                label="Comparison Type"
                hide-details
                density="comfortable"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <ContractCompareDiff
        :contract1="contract1"
        :contract2="contract2"
        :compare-mode="compareMode"
        :diff-type="diffType"
      />
    </template>
  </div>
</template>