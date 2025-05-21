<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const drawer = ref(true)
const mini = ref(false)

const currentRouteName = computed(() => route.name)

const navigationItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', route: 'Dashboard' },
  { title: 'Contracts', icon: 'mdi-file-document-outline', route: 'Contracts' },
  { title: 'Clause Library', icon: 'mdi-text-box-multiple-outline', route: 'ClauseLibrary' },
  { title: 'Compliance Rules', icon: 'mdi-gavel', route: 'ComplianceRules' },
]

const navigateTo = (route: string) => {
  router.push({ name: route })
}
</script>

<template>
  <div>
    <v-app-bar color="primary" density="default" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="text-white">
        <v-icon icon="mdi-file-document-check-outline" class="mr-2"></v-icon>
        Contract Analyzer
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon color="white">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <v-btn icon color="white">
        <v-icon>mdi-bell-outline</v-icon>
        <v-badge dot color="error" offset-x="3" offset-y="3"></v-badge>
      </v-btn>
      
      <v-btn icon color="white">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn class="ml-2" v-bind="props" size="small">
            <v-avatar size="32" color="secondary" class="mr-2">
              <span class="text-h6 text-white">JD</span>
            </v-avatar>
            <span class="text-white">John Doe</span>
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item prepend-icon="mdi-account-outline" title="Profile" @click="() => {}"></v-list-item>
          <v-list-item prepend-icon="mdi-cog-outline" title="Settings" @click="() => {}"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-logout" title="Logout" @click="() => {}"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      permanent
      color="background"
      elevation="2"
    >
      <v-list-item
        class="my-2"
        @click="mini = !mini"
      >
        <template v-slot:prepend>
          <v-avatar
            color="primary"
            size="36"
          >
            <v-icon color="white">mdi-file-document-check-outline</v-icon>
          </v-avatar>
        </template>
        
        <v-list-item-title class="text-h6">
          Contract Analyzer
        </v-list-item-title>
        
        <template v-slot:append>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="currentRouteName === item.route"
          @click="navigateTo(item.route)"
          :class="currentRouteName === item.route ? 'text-primary' : ''"
          rounded="lg"
          class="mb-1 mx-2"
        ></v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="primary"
            prepend-icon="mdi-upload"
            class="mb-2"
            :text="!mini"
            :variant="mini ? 'icon' : 'elevated'"
          >
            {{ mini ? '' : 'Upload Contract' }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>