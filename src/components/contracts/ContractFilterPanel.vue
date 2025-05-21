<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  filters: {
    status: string[]
    type: string[]
    compliance: string[]
    dateRange: [Date | null, Date | null] | null
  }
}>()

const emit = defineEmits(['update:modelValue', 'update:filters'])

// Local copy of filters with dateRange always initialized as array
const localFilters = ref({
  status: [...props.filters.status],
  type: [...props.filters.type],
  compliance: [...props.filters.compliance],
  dateRange: props.filters.dateRange ? [...props.filters.dateRange] : [null, null]
})

// Status options
const statusOptions = [
  { title: 'Analyzed', value: 'Analyzed' },
  { title: 'Pending', value: 'Pending' },
  { title: 'In Review', value: 'In Review' },
  { title: 'Rejected', value: 'Rejected' }
]

// Type options
const typeOptions = [
  { title: 'NDA', value: 'NDA' },
  { title: 'Service Agreement', value: 'Service Agreement' },
  { title: 'Employment', value: 'Employment' },
  { title: 'Lease', value: 'Lease' },
  { title: 'License', value: 'License' }
]

// Compliance options
const complianceOptions = [
  { title: 'Compliant', value: 'Compliant' },
  { title: 'Minor Issues', value: 'Minor Issues' },
  { title: 'Major Issues', value: 'Major Issues' }
]

const closeDialog = () => {
  emit('update:modelValue', false)
}

const applyFilters = () => {
  emit('update:filters', { ...localFilters.value })
  closeDialog()
}

const resetFilters = () => {
  localFilters.value = {
    status: [],
    type: [],
    compliance: [],
    dateRange: [null, null]
  }
}

const hasFilters = computed(() => {
  return (
    localFilters.value.status.length > 0 ||
    localFilters.value.type.length > 0 ||
    localFilters.value.compliance.length > 0 ||
    (localFilters.value.dateRange[0] !== null || localFilters.value.dateRange[1] !== null)
  )
})
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
    max-width="600px"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Filter Contracts</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          variant="text"
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="localFilters.status"
                :items="statusOptions"
                item-title="title"
                item-value="value"
                label="Status"
                multiple
                chips
                clearable
              ></v-select>
            </v-col>
            
            <v-col cols="12">
              <v-select
                v-model="localFilters.type"
                :items="typeOptions"
                item-title="title"
                item-value="value"
                label="Contract Type"
                multiple
                chips
                clearable
              ></v-select>
            </v-col>
            
            <v-col cols="12">
              <v-select
                v-model="localFilters.compliance"
                :items="complianceOptions"
                item-title="title"
                item-value="value"
                label="Compliance Status"
                multiple
                chips
                clearable
              ></v-select>
            </v-col>
            
            <v-col cols="12">
              <v-label class="mb-2">Date Range</v-label>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="localFilters.dateRange[0]"
                    label="From"
                    type="date"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="localFilters.dateRange[1]"
                    label="To"
                    type="date"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      
      <v-card-actions>
        <v-btn
          color="primary"
          variant="text"
          :disabled="!hasFilters"
          @click="resetFilters"
        >
          Reset
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="applyFilters"
        >
          Apply Filters
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>