<!-- pages/dashboard/transactions.vue -->
<template>
  <div>
  <div class="mb-6">
    <v-row class="d-flex align-center justify-space-between flex-wrap">
      <!-- Titre -->
      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold text-primary">Transactions</h1>
      </v-col>

      <!-- Boutons -->
      <v-col cols="12" md="6" class="d-flex justify-end flex-wrap">
        <v-btn color="primary" class="mr-2" prepend-icon="mdi-plus">
          Dépôt
        </v-btn>
        <v-btn color="primary" variant="outlined" class="" prepend-icon="mdi-minus">
          Retrait
        </v-btn>
      </v-col>
    </v-row>
  </div>


    <!-- Balance Summary -->
    <v-row class="mb-6">
      <v-col
        cols="12"
        md="4"
        lg="3"
        v-for="balance in balanceSummary"
        :key="balance.title"
      >
        <v-card elevation="0" rounded="lg" border dark>
          <v-card-text
            class="text-center d-flex justify-start align-center ga-4"
          >
            <v-icon size="52" class="" :color="balance.color">{{
              balance.icon
            }}</v-icon>
            <div class="d-flex flex-column-reverse align-start">
              <p
                class="text-h5 font-weight-bold"
                :class="['text-' + balance.color]"
              >
                &#x244; {{ balance.amount }}
              </p>
              <div class="text-subtitle-1">{{ balance.title }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Transactions Table -->
    <v-card elevation="0" rounded="lg" class="border">
      <v-card-title class="text-h6 font-montserrat">
        <span>Historique des transactions</span>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          variant="outlined"
          single-line
          hide-details
          density="compact"
          class="mt-2"
          style="max-width: 300px"
        ></v-text-field
      ></v-card-title>
      <v-data-table
        :headers="transactionHeaders"
        :items="transactions"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.type="{ item }">
          <v-chip :color="getTransactionColor(item.type)" size="small">
            <v-icon left size="16">{{ getTransactionIcon(item.type) }}</v-icon>
            <span class="pl-1">{{ getTransactionLabel(item.type) }}</span>
          </v-chip>
        </template>
        <template v-slot:item.amount="{ item }">
          <span :class="getAmountClass(item.type)">
            {{ item.amount }}
          </span>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="
              item.status === 'completed'
                ? 'success'
                : item.status === 'pending'
                ? 'warning'
                : 'error'
            "
            size="small"
          >
            {{ getStatusLabel(item.status) }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const search = ref("");

const balanceSummary = [
  {
    title: "Solde disponible",
    amount: "2,547.89",
    icon: "mdi-wallet",
    color: "primary",
  },
  {
    title: "En attente",
    amount: "125.00",
    icon: "mdi-clock-outline",
    color: "warning",
  },
  {
    title: "Total déposé",
    amount: "3,200.00",
    icon: "mdi-trending-up",
    color: "success",
  },
];

const transactionHeaders = [
  { title: "Date", key: "date" },
  { title: "Type", key: "type" },
  { title: "Description", key: "description" },
  { title: "Montant", key: "amount" },
  { title: "Statut", key: "status" },
];

const transactions = [
  {
    date: "2024-07-20",
    type: "deposit",
    description: "Dépôt par carte bancaire",
    amount: "+€200.00",
    status: "completed",
  },
  {
    date: "2024-07-19",
    type: "bet_win",
    description: "Gain pari PSG vs Real",
    amount: "+€150.00",
    status: "completed",
  },
  // ... more transactions
];

const getTransactionColor = (type: string) => {
  const colors: Record<string, string> = {
    deposit: "success",
    withdrawal: "orange",
    bet_win: "green",
    bet_loss: "error",
  };
  return colors[type] || "grey";
};

const getTransactionIcon = (type: string) => {
  const icons: Record<string, string> = {
    deposit: "mdi-plus",
    withdrawal: "mdi-minus",
    bet_win: "mdi-trophy",
    bet_loss: "mdi-close",
  };
  return icons[type] || "mdi-help";
};

const getTransactionLabel = (type: string) => {
  const labels: Record<string, string> = {
    deposit: "Dépôt",
    withdrawal: "Retrait",
    bet_win: "Gain",
    bet_loss: "Perte",
  };
  return labels[type] || type;
};

const getAmountClass = (type: string) => {
  return type === "deposit" || type === "bet_win"
    ? "text-success"
    : "text-error";
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: "Terminé",
    pending: "En attente",
    failed: "Échoué",
  };
  return labels[status] || status;
};
</script>
