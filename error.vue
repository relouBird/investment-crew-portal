<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const errorMessage = computed(() => {
  const statusCode = props.error?.statusCode || 500;
  
  switch (statusCode) {
    case 404:
      return {
        title: "Page introuvable",
        description: "La page que vous recherchez n'existe pas."
      };
    case 403:
      return {
        title: "Accès refusé",
        description: "Vous n'avez pas l'autorisation d'accéder à cette page."
      };
    case 500:
      return {
        title: "Erreur serveur",
        description: "Une erreur s'est produite sur le serveur."
      };
    default:
      return {
        title: "Une erreur s'est produite",
        description: "Quelque chose ne s'est pas passé comme prévu."
      };
  }
});

const goHome = () => {
  navigateTo('/');
};
</script>

<template>
  <v-app style="background-color: #f4f6f9;">
    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="text-center pa-8" elevation="0" rounded="lg" border>
              <v-card-text>
                <div class="mb-6">
                  <v-icon 
                    icon="mdi-alert-circle-outline" 
                    size="80" 
                    color="error"
                    class="mb-4"
                  ></v-icon>
                  
                  <h1 class="text-h2 font-weight-bold mb-2">
                    {{ error?.statusCode || '500' }}
                  </h1>
                  
                  <h2 class="text-h5 mb-4">
                    {{ errorMessage.title }}
                  </h2>
                  
                  <p class="text-body-1 text-grey-darken-1">
                    {{ errorMessage.description }}
                  </p>
                </div>
                
                <v-btn 
                  color="primary" 
                  size="large"
                  @click="goHome"
                  prepend-icon="mdi-home"
                >
                  Retour à l'accueil
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>