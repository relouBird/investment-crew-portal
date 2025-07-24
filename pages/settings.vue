<!-- pages/dashboard/settings.vue -->
<template>
  <div>
    <h1 class="text-h4 font-weight-bold text-primary mb-6">Paramètres</h1>

    <v-row>
      <v-col cols="12" md="8">
        <!-- Account Settings -->
        <v-card class="mb-6" elevation="0" border rounded="lg">
          <v-card-title class="text-h6 font-weight-bold font-montserrat mb-3">
            <v-icon left>mdi-account</v-icon>
            Informations du compte
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userSettings.firstName"
                    label="Prénom"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userSettings.lastName"
                    label="Nom"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userSettings.email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userSettings.phone"
                    label="Téléphone"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="userSettings.country"
                    :items="countries"
                    label="Pays"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mt-3" @click="saveAccountSettings">
                <v-icon left>mdi-content-save</v-icon>
                Sauvegarder
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Security Settings -->
        <v-card class="mb-6" elevation="0" border rounded="lg">
          <v-card-title class="text-h6 font-weight-bold font-montserrat">
            <v-icon left>mdi-security</v-icon>
            Sécurité
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="passwordForm.currentPassword"
                label="Mot de passe actuel"
                type="password"
                variant="outlined"
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="passwordForm.newPassword"
                label="Nouveau mot de passe"
                type="password"
                variant="outlined"
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="passwordForm.confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                variant="outlined"
                class="mb-4"
              ></v-text-field>
              <v-btn color="primary" @click="changePassword">
                <v-icon left>mdi-key</v-icon>
                Changer le mot de passe
              </v-btn>
            </v-form>

            <v-divider class="my-6"></v-divider>

            <!-- Two Factor Authentication -->
            <div class="mb-4">
              <h3 class="text-h6 mb-3">Authentification à deux facteurs</h3>
              <v-switch
                v-model="userSettings.twoFactorEnabled"
                label="Activer l'authentification à deux facteurs"
                color="primary"
                @change="toggleTwoFactor"
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
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
              <span class="font-weight-medium">Mars 2024</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Statut</span>
              <v-chip color="success" size="small">Vérifié</v-chip>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Total des paris</span>
              <span class="font-weight-medium">127</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-body-2">Taux de réussite</span>
              <span class="font-weight-medium text-success">67%</span>
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
</template>

<script setup lang="ts">
import useAuthStore from "~/stores/auth.store";

definePageMeta({
  layout: "default",
});

// Composables
const router = useRouter();
const authStore = useAuthStore();

const userSettings = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+33 6 12 34 56 78",
  country: "France",
  twoFactorEnabled: false,
  notifications: {
    email: true,
    push: true,
    betResults: true,
    promotions: false,
  },
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const countries = [
  "France",
  "Belgique",
  "Suisse",
  "Canada",
  "Maroc",
  "Algérie",
  "Tunisie",
  "Sénégal",
  "Côte d'Ivoire",
  "Cameroun",
];

const saveAccountSettings = () => {
  // Logic pour sauvegarder les paramètres
  console.log("Saving account settings:", userSettings.value);
  // Afficher une notification de succès
};

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    console.error("Les mots de passe ne correspondent pas");
    return;
  }
  // Logic pour changer le mot de passe
  console.log("Changing password");
  // Reset form
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const toggleTwoFactor = (enabled: boolean) => {
  // Logic pour activer/désactiver 2FA
  console.log("Two factor authentication:", enabled);
};

const downloadData = () => {
  // Logic pour télécharger les données utilisateur
  console.log("Downloading user data");
};

const closeAccount = () => {
  // Logic pour fermer le compte
  console.log("Closing account");
};

const logout = async () => {
  await authStore.signOut();
};
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
