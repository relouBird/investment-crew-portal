<!-- pages/dashboard/index.vue (Accueil) -->
<template>
  <div>
    <!-- Quick Stats -->
    <v-row class="mb-6">
      <v-col cols="12" md="3" v-for="stat in quickStats" :key="stat.title">
        <v-card class="stat-card" elevation="2" rounded="lg">
          <v-card-text class="d-flex align-center">
            <v-avatar :color="stat.color" size="48" class="mr-4">
              <v-icon :icon="stat.icon" color="white" size="24"></v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">{{ stat.value }}</div>
              <div class="text-caption text-grey-600">{{ stat.title }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-card class="mb-6" elevation="2" rounded="lg">
      <v-card-title class="text-h6 font-weight-bold text-primary">
        Actions rapides
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="6"
            md="3"
            v-for="action in quickActions"
            :key="action.title"
          >
            <v-btn
              :color="action.color"
              variant="tonal"
              block
              size="large"
              class="flex-column py-4"
              height="80"
              @click="action.action"
            >
              <v-icon :icon="action.icon" size="24" class="mb-2"></v-icon>
              <span class="text-caption">{{ action.title }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Recent Activity -->
    <v-card elevation="2" rounded="lg">
      <v-card-title class="text-h6 font-weight-bold text-primary">
        Activité récente
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(activity, index) in recentActivity"
            :key="index"
            class="px-0"
          >
            <template v-slot:prepend>
              <v-avatar :color="activity.color" size="36">
                <v-icon :icon="activity.icon" color="white" size="18"></v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-medium">
              {{ activity.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ activity.subtitle }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <div class="text-right">
                <div
                  class="font-weight-bold"
                  :class="`text-${activity.amountColor}`"
                >
                  {{ activity.amount }}
                </div>
                <div class="text-caption text-grey-600">
                  {{ activity.time }}
                </div>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const quickStats = [
  {
    title: "Solde total",
    value: "€2,547.89",
    icon: "mdi-wallet",
    color: "primary",
  },
  {
    title: "Paris actifs",
    value: "12",
    icon: "mdi-chart-line",
    color: "success",
  },
  {
    title: "Gains du mois",
    value: "+€389.50",
    icon: "mdi-trending-up",
    color: "success",
  },
  {
    title: "Taux de réussite",
    value: "67%",
    icon: "mdi-target",
    color: "info",
  },
];

const quickActions = [
  {
    title: "Nouveau Pari",
    icon: "mdi-plus-circle",
    color: "primary",
    action: () => navigateTo("/dashboard/bets/new"),
  },
  {
    title: "Déposer",
    icon: "mdi-bank-plus",
    color: "success",
    action: () => console.log("Deposit"),
  },
  {
    title: "Retirer",
    icon: "mdi-bank-minus",
    color: "orange",
    action: () => console.log("Withdraw"),
  },
  {
    title: "Historique",
    icon: "mdi-history",
    color: "info",
    action: () => navigateTo("/dashboard/transactions"),
  },
];

const recentActivity = [
  {
    title: "Pari gagné - Match PSG vs Real",
    subtitle: "Football - Ligue des Champions",
    amount: "+€150.00",
    amountColor: "success",
    time: "Il y a 2h",
    icon: "mdi-soccer",
    color: "success",
  },
  {
    title: "Dépôt par carte bancaire",
    subtitle: "Visa **** 1234",
    amount: "+€200.00",
    amountColor: "info",
    time: "Il y a 5h",
    icon: "mdi-credit-card",
    color: "info",
  },
  {
    title: "Pari perdu - Lakers vs Warriors",
    subtitle: "Basketball - NBA",
    amount: "-€75.00",
    amountColor: "error",
    time: "Hier",
    icon: "mdi-basketball",
    color: "error",
  },
];
</script>

<style scoped>
.stat-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}
</style>
