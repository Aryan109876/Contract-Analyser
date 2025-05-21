<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const files = ref<File[]>([])
const uploadProgress = ref(0)
const isUploading = ref(false)
const uploadComplete = ref(false)

const closeDialog = () => {
  emit('update:modelValue', false)
  
  // Reset state when dialog closes
  setTimeout(() => {
    files.value = []
    uploadProgress.value = 0
    isUploading.value = false
    uploadComplete.value = false
  }, 300)
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    files.value = Array.from(target.files)
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const uploadFiles = () => {
  if (files.value.length === 0) return
  
  isUploading.value = true
  
  // Simulate upload progress
  const interval = setInterval(() => {
    uploadProgress.value += 5
    
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      uploadComplete.value = true
      isUploading.value = false
    }
  }, 100)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer?.files) {
    files.value = Array.from(e.dataTransfer.files)
  }
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
    max-width="600px"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Upload Contract</span>
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
        <div v-if="!uploadComplete">
          <div 
            class="upload-area pa-8 mb-4" 
            @dragover="handleDragOver"
            @drop="handleDrop"
          >
            <v-icon 
              color="primary" 
              size="64" 
              class="mb-4"
            >
              mdi-file-upload-outline
            </v-icon>
            
            <p class="text-subtitle-1 text-center mb-4">
              Drag and drop your files here or click to browse
            </p>
            
            <v-btn
              color="primary"
              prepend-icon="mdi-file-plus-outline"
            >
              Select Files
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                multiple
                class="file-input"
                @change="onFileChange"
              />
            </v-btn>
            
            <p class="text-caption text-center mt-4">
              Accepted formats: PDF, DOCX, DOC (Max size: 10MB)
            </p>
          </div>
          
          <v-list v-if="files.length > 0" class="file-list">
            <v-list-item
              v-for="(file, index) in files"
              :key="index"
            >
              <template v-slot:prepend>
                <v-icon 
                  :color="file.name.endsWith('.pdf') ? 'error' : 'primary'"
                >
                  {{ file.name.endsWith('.pdf') ? 'mdi-file-pdf-box' : 'mdi-file-word-outline' }}
                </v-icon>
              </template>
              
              <v-list-item-title>{{ file.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ (file.size / 1024).toFixed(1) }} KB</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn
                  icon
                  variant="text"
                  color="error"
                  size="small"
                  @click="removeFile(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          
          <v-progress-linear
            v-if="isUploading"
            color="primary"
            :model-value="uploadProgress"
            height="10"
            striped
            class="mt-4"
          >
            <template v-slot:default>
              {{ uploadProgress }}%
            </template>
          </v-progress-linear>
        </div>
        
        <div v-else class="upload-complete text-center py-4">
          <v-avatar
            color="success"
            size="64"
            class="mb-4"
          >
            <v-icon
              color="white"
              size="36"
            >
              mdi-check
            </v-icon>
          </v-avatar>
          
          <h3 class="text-h5 mb-2">Upload Complete</h3>
          <p class="text-subtitle-1 mb-4">
            {{ files.length }} file{{ files.length !== 1 ? 's' : '' }} successfully uploaded
          </p>
          
          <v-alert
            type="info"
            text="Your contracts are being processed. This may take a few minutes. You'll be notified when analysis is complete."
            class="mb-0"
            variant="tonal"
          ></v-alert>
        </div>
      </v-card-text>
      
      <v-card-actions v-if="!uploadComplete">
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
          :disabled="files.length === 0 || isUploading"
          :loading="isUploading"
          @click="uploadFiles"
        >
          Upload
        </v-btn>
      </v-card-actions>
      
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="closeDialog"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.upload-area {
  border: 2px dashed rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.upload-area:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-color: var(--v-primary-base);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
</style>