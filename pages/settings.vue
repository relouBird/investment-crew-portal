<script setup lang="ts">
import useAuthStore from "~/stores/auth.store";
import type { UserMetaData } from "~/types/user.type";
import { formatDateThirdType } from "~/helpers/utils";
import useMeStore from "~/stores/me.store";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

// Composables
const authStore = useAuthStore();
const meStore = useMeStore();

//Variables utiles
const userSettings = computed(() => meStore.getMe ?? ({} as UserMetaData));
const dateJoined = ref(formatDateThirdType(authStore.me?.created_at ?? "")); // date à laquelle il a rejoint la plateforme

const deleteModal = ref<boolean>(false);
const loading = ref<boolean>(false);

const downloadData = () => {
  // Logic pour télécharger les données utilisateur
  console.log("Downloading user data");
};

const closeAccount = () => {
  // Logic pour fermer le compte
  console.log("Closing account");
  deleteModal.value = true;
};

const confirmCloseAccount = async () => {
  loading.value = true;
  try {
    await meStore.deleteAccount();
    await authStore.signOut();
    await meStore.clearMeData();
  } catch (error) {
    console.log("erreur =>", error);
  } finally {
    loading.value = false;
  }
};

const logout = async () => {
  await authStore.signOut();
  await meStore.clearMeData();
};
</script>

<!-- pages/dashboard/settings.vue -->
<template>
  <div>
    <h1 class="text-h4 font-weight-bold text-primary mb-6">Paramètres</h1>

    <v-row>
      <v-col cols="12" md="8">
        <!-- Account Settings -->
        <settings-account />

        <!-- Security Settings -->
        <settings-security
          v-model:model-two-factors="userSettings.twoFactorEnabled"
        />
      </v-col>

      <v-col cols="12" md="4">
        <!-- Account Summary -->
        <v-card class="mb-6" elevation="0" border rounded="lg">
          <v-card-title class="text-h6 font-weight-bold font-montserrat">
            <v-icon left>mdi-account-details</v-icon>
            Résumé du compte
          </v-card-title>
          <v-card-text>
            <div class="text-center mb-4">
              <v-avatar size="80" color="primary" class="mb-3">
                <v-icon size="40" color="white">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-h6">
                {{ userSettings.firstName }} {{ userSettings.lastName }}
              </h3>
              <p class="text-body-2 text-grey-600">{{ userSettings.email }}</p>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Membre depuis</span>
              <span class="font-weight-medium">
                {{ dateJoined[0].toUpperCase() + dateJoined.slice(1) }}</span
              >
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Statut</span>
              <v-chip color="success" size="small">Vérifié</v-chip>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Total des paris</span>
              <span class="font-weight-medium">0</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-body-2">Taux de réussite</span>
              <span class="font-weight-medium text-success">0%</span>
            </div>
          </v-card-text>
        </v-card>

        <!-- Quick Actions -->
        <v-card class="mb-6" elevation="0" border rounded="lg">
          <v-card-title class="text-h6 font-weight-bold font-montserrat">
            <v-icon left>mdi-lightning-bolt</v-icon>
            Actions rapides
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              color="primary"
              variant="tonal"
              class="mb-3"
              @click="downloadData"
              disabled
            >
              <v-icon left>mdi-download</v-icon>
              Télécharger mes données
            </v-btn>
            <v-btn
              block
              color="orange"
              variant="tonal"
              class="mb-3"
              @click="closeAccount"
            >
              <v-icon left>mdi-account-off</v-icon>
              Fermer le compte
            </v-btn>
            <v-btn block color="error" variant="tonal" @click="logout">
              <v-icon left>mdi-logout</v-icon>
              Se déconnecter
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Notification Settings -->
        <v-card class="mb-4" elevation="0" border rounded="lg">
          <v-card-title class="text-h6 font-weight-bold font-montserrat">
            <v-icon left>mdi-bell</v-icon>
            Notifications
          </v-card-title>
          <v-card-text>
            <div>
              <v-switch
                v-model="userSettings.notifications.email"
                label="Notifications par email"
                color="primary"
                hide-details
              ></v-switch>
            </div>
            <div>
              <v-switch
                v-model="userSettings.notifications.push"
                label="Notifications push"
                color="primary"
                hide-details
              ></v-switch>
            </div>
            <div>
              <v-switch
                v-model="userSettings.notifications.betResults"
                label="Résultats des paris"
                color="primary"
                hide-details
              ></v-switch>
            </div>
            <div>
              <v-switch
                v-model="userSettings.notifications.promotions"
                label="Promotions et offres"
                color="primary"
                hide-details
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <!-- Partie qui gere les dialogs... -->
  <v-dialog v-model="deleteModal" max-width="400">
    <v-card class="">
      <v-card-title class="font-montserrat"> Attention </v-card-title>
      <v-card-text>
        Etes-vous sur de vouloir supprimer votre compte ?
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="deleteModal = false" class="text-none">
          Annuler
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :loading="loading"
          @click="confirmCloseAccount"
          class="text-none"
        >
          Oui
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
