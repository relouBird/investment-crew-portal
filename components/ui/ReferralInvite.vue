<script lang="ts" setup>
import { ref, computed } from "vue";

// État réactif
const copied = ref(false);
const emailDialog = ref(false);
const sending = ref(false);

// Données de parrainage (à remplacer par des données réelles de votre store)
const referralStats = ref({
  totalInvites: 12,
  successfulReferrals: 3,
});

// Formulaire d'email
const emailForm = ref({
  email: "",
  message: "",
});

// Snackbar pour les notifications
const snackbar = ref({
  show: false,
  message: "",
  color: "success",
});

// Lien de parrainage généré (remplacez par votre logique)
const referralLink = computed(() => {
  // Vous devriez récupérer l'ID utilisateur depuis votre store auth
  const userId = "USR001234"; // authStore.user.id
  return `https://rsg-investia.com/register?ref=${userId}`;
});

// Méthodes
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value);
    copied.value = true;
    showNotification("Lien copié dans le presse-papiers !", "success");

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    showNotification("Erreur lors de la copie", "error");
  }
};

const showNotification = (message: string, color: string) => {
  snackbar.value = {
    show: true,
    message,
    color,
  };
};
</script>

<template>
  <v-card class="referral-card border rounded-lg" elevation="0">
    <v-card-title class="d-flex align-center pb-2">
      <span class="text-h6">Parrainez vos amis</span>
    </v-card-title>

    <v-card-text>
      <div class="text-body-2 text-medium-emphasis mb-4">
        Invitez vos amis à nous rejoindre et gagnez des récompenses pour chaque
        inscription réussie !
      </div>

      <!-- Statistiques de parrainage -->
      <v-row class="mb-4">
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h4 text-primary font-weight-bold">
              {{ referralStats.totalInvites }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Invitations envoyées
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <div class="text-h4 text-success font-weight-bold">
              {{ referralStats.successfulReferrals }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Parrainages réussis
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Lien de parrainage -->
      <v-alert color="info" variant="tonal" class="mb-7" density="compact">
        <div class="text-caption">Votre lien de parrainage :</div>
        <div class="d-flex align-center">
          <code class="flex-grow-1 text-truncate me-2">{{ referralLink }}</code>
          <v-btn
            :icon="!copied ? 'mdi-content-copy' : 'mdi-check-all'"
            size="small"
            variant="plain"
            @click="copyToClipboard"
            color="primary"
          >
          </v-btn>
        </div>
      </v-alert>

      <!-- Récompenses -->
      <div class="text-center">
        <v-chip color="warning" prepend-icon="mdi-gift" size="small">
          Gagnez &#x244; 500 par parrainage réussi
        </v-chip>
      </div>
    </v-card-text>

    <!-- Snackbar pour les notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false"> Fermer </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<style scoped>
.referral-card {
  border: 1px solid #e2e8f0;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
