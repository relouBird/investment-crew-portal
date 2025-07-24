<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { formatBalance } from "~/helpers/utils";
import useAuthStore from "~/stores/auth.store";

// Interfaces
interface User {
  id: string;
  name: string;
  email: string;
}

interface NavigationItem {
  title: string;
  icon: string;
  to: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  read: boolean;
}

// Composables
const authStore = useAuthStore();

// Reactive data
const drawer = ref(true);
const activeTab = ref("/");
const showDepositDialog = ref(false);
const showNotifications = ref(false);
const depositAmount = ref("");
const depositMethod = ref("");

// User data
const user = ref<User>({
  id: "USR001234",
  name: "Relou Bird",
  email: "john.doe@email.com",
});

// Account data
const accountBalance = ref(500);

// Navigation items
const navigationItems: NavigationItem[] = [
  { title: "Accueil", icon: "mdi-home", to: "/" },
  { title: "Mes Paris", icon: "mdi-chart-line", to: "/bets" },
  { title: "Transactions", icon: "mdi-credit-card", to: "/transactions" },
  { title: "Paramètres", icon: "mdi-cog", to: "/settings" },
];

// Payment methods
const paymentMethods = [
  "Carte Bancaire",
  "Virement Bancaire",
  "PayPal",
  "Crypto-monnaies",
];

// Notifications
const notifications = ref<Notification[]>([
  {
    id: 1,
    title: "Pari gagné !",
    message: "Votre pari sur le match PSG vs Real a été gagné. +150€",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Nouveau bonus disponible",
    message: "Un bonus de 50€ est disponible dans votre compte",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Limite de mise atteinte",
    message: "Vous avez atteint votre limite de mise journalière",
    type: "warning",
    read: true,
  },
]);

// Computed properties
const userInitials = computed(() => {
  return user.value.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
});

const notificationCount = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

const getNotificationColor = (type: string): string => {
  switch (type) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "grey";
  }
};

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case "success":
      return "mdi-check-circle";
    case "warning":
      return "mdi-alert-circle";
    case "info":
      return "mdi-information";
    default:
      return "mdi-bell";
  }
};

const processDeposit = () => {
  console.log("Processing deposit:", depositAmount.value, depositMethod.value);
  showDepositDialog.value = false;
  depositAmount.value = "";
  depositMethod.value = "";
};

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
  showNotifications.value = false;
};

const logout = async () => {
  await authStore.signOut();
};
</script>

<template>
  <v-app>
    <!-- Desktop Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="!drawer && $vuetify.display.lgAndUp"
      :permanent="$vuetify.display.mdAndUp"
      :temporary="$vuetify.display.smAndDown"
      color="white"
      width="280"
      elevation="0"
      class="custom-drawer"
    >
      <div class="d-flex flex-column fill-height">
        <!-- Logo/Brand Section -->
        <div class="pa-4 border-b">
          <div class="d-flex align-center">
            <v-avatar size="40" class="mr-3">
              <img src="~/assets/images/logo.png" width="45" alt="" />
            </v-avatar>
            <div v-if="drawer || $vuetify.display.smAndDown">
              <h3>RSG INVESTIA</h3>
              <p class="text-caption text-grey-darken-1 mb-0">
                Investment Platform
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Items -->
        <v-list class="flex-grow-1 pa-2">
          <v-list-item
            v-for="item in navigationItems"
            :key="item.title"
            :to="item.to"
            :active="$route.path === item.to"
            class="mb-2 rounded-lg"
            color="primary"
            variant="flat"
          >
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title v-if="drawer || $vuetify.display.smAndDown">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- User Profile Section -->
        <div class="border-t pa-4 mt-auto">
          <div class="d-flex align-center">
            <v-avatar color="primary" size="40">
              <span class="text-white font-weight-bold">{{
                userInitials
              }}</span>
            </v-avatar>
            <div v-if="drawer || $vuetify.display.smAndDown" class="ml-3">
              <div class="text-subtitle-2 font-weight-medium">
                {{ user.name }}
              </div>
              <div class="text-caption text-grey-darken-1">
                ID: {{ user.id }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar
      color="white"
      elevation="0"
      density="comfortable"
      class="border-b px-4"
    >
      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!-- Desktop Menu Toggle -->
      <v-btn
        v-if="$vuetify.display.lgAndUp"
        icon="mdi-menu"
        variant="text"
        @click="drawer = !drawer"
        class="mr-2"
      ></v-btn>

      <v-spacer></v-spacer>

      <!-- Simple Balance Box -->
      <div class="balance-container">
        <div
          class="balance-box d-flex flex-row-reverse justify-end align-center"
        >
          <div class="d-flex pl-1">
            <div class="balance-amount">
              {{ formatBalance(accountBalance) }} &#x244;
            </div>
          </div>
          <v-btn
            icon="mdi-plus"
            color="primary"
            variant="flat"
            size="x-small"
            class="pa-0"
            @click="showDepositDialog = true"
          ></v-btn>
        </div>
      </div>

      <!-- Notifications -->
      <v-btn icon variant="text" class="mr-2" @click="showNotifications = true">
        <v-badge
          v-if="notificationCount > 0"
          :content="notificationCount"
          color="error"
          overlap
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell-outline</v-icon>
      </v-btn>

      <!-- Profile Menu -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            color="primary"
            size="36"
            class="cursor-pointer"
          >
            <span class="text-white font-weight-bold">{{ userInitials }}</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <template v-slot:prepend>
              <v-icon color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main style="background-color: #f4f6f9">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

    <!-- Mobile Bottom Navigation -->
    <v-bottom-navigation
      v-if="$vuetify.display.smAndDown"
      v-model="activeTab"
      color="primary"
      bg-color="white"
      height="70"
      elevation="0"
      class="border-t"
    >
      <v-btn
        v-for="item in navigationItems"
        :key="item.title"
        :to="item.to"
        :value="item.to"
        size="small"
        class="text-caption"
      >
        <v-icon size="24">{{ item.icon }}</v-icon>
        <span class="mt-1">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- Deposit Dialog -->
    <v-dialog v-model="showDepositDialog" max-width="400px">
      <v-card elevation="0">
        <v-card-title class="text-h6 font-montserrat"
          >Effectuer un dépôt</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="depositAmount"
            label="Montant"
            type="number"
            prefix="&#x244;"
            variant="outlined"
            color="primary"
            class="mb-4"
          ></v-text-field>
          <v-select
            v-model="depositMethod"
            :items="paymentMethods"
            label="Méthode de paiement"
            variant="outlined"
            color="primary"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showDepositDialog = false" variant="text">
            Annuler
          </v-btn>
          <v-btn @click="processDeposit" color="primary" variant="flat">
            Déposer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Notifications Dialog -->
    <v-dialog v-model="showNotifications" max-width="500px">
      <v-card elevation="0">
        <div class="d-flex w-100 justify-space-between">
          <v-card-title class="text-h6 font-montserrat"
            >Notifications</v-card-title
          ><v-btn
            icon="mdi-close"
            @click="showNotifications = false"
            variant="plain"
            class="mr-1 mt-1"
          ></v-btn>
        </div>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="notification in notifications"
              :key="notification.id"
              class="mb-2 rounded-lg"
              :class="notification.read ? '' : 'bg-blue-lighten-5'"
            >
              <template v-slot:prepend>
                <v-icon :color="getNotificationColor(notification.type)">
                  {{ getNotificationIcon(notification.type) }}
                </v-icon>
              </template>
              <v-list-item-title>{{ notification.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                notification.message
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="markAllAsRead" color="primary" variant="flat">
            Tout marquer comme lu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.custom-drawer {
  border-right: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.balance-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance-box {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
  min-width: 110px;
  margin-right: 8px;
}

.balance-amount {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1976d2;
}

.stat-card {
  border: 1px solid #e0e0e0;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.welcome-section {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.cursor-pointer {
  cursor: pointer;
}

.border-t {
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}

/* Mobile optimizations */
@media (max-width: 599px) {
  .balance-box {
    min-width: 110px;
    margin-right: 0;
  }

  .balance-amount {
    font-size: 0.95rem;
  }
}

/* Mobile specific styles */
@media (max-width: 960px) {
  .v-main {
    padding-bottom: 70px !important;
  }
}

/* Bottom navigation styling */
.v-bottom-navigation .v-btn {
  flex-direction: column;
  height: 100%;
  font-size: 0.75rem;
}

.v-bottom-navigation .v-btn .v-icon {
  margin-bottom: 2px;
}

/* Custom scrollbar for light theme */
:deep(.v-navigation-drawer__content) {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar) {
  width: 6px;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-thumb) {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
