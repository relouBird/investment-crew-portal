<template>
  <v-dialog
    v-model="dialog"
    max-width="440"
    persistent
  >
    <v-card rounded="lg" elevation="0" class="overflow-hidden border-sm">
      <!-- Header avec icône -->
      <div class="text-center pt-8 pb-4">
        <v-avatar
          size="80"
          color="orange-lighten-5"
          class="mb-4"
        >
          <v-icon
            icon="mdi-wallet-outline"
            size="40"
            color="orange-darken-1"
          />
        </v-avatar>
        
        <h2 class="text-h5 font-weight-bold mb-2">
          Dépôt requis
        </h2>
        
        <p class="text-body-1 text-medium-emphasis px-6">
          Vous n'avez pas encore effectué de dépôt
        </p>
      </div>

      <!-- Contenu -->
      <v-card-text class="px-6 pb-2 text-center">
        <p class="text-body-2 text-medium-emphasis">
          Pour accéder à cette fonctionnalité, vous devez d'abord effectuer un dépôt sur votre compte.
        </p>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="px-6 pb-6 pt-4">
        <v-row dense>
          <v-col cols="12" class="mb-2">
            <v-btn
              block
              color="primary"
              size="large"
              variant="flat"
              rounded="lg"
              elevation="0"
              @click="goToDeposit"
            >
              <v-icon start icon="mdi-plus-circle" />
              Effectuer un dépôt
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(true)

const goToDeposit = () => {
  // Navigation vers la page de dépôt
  navigateTo("/")
  dialog.value = false
}

// Pour ouvrir le dialog depuis le parent
const open = () => {
  dialog.value = true
}

defineExpose({ open })
</script>