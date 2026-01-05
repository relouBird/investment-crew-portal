<!-- pages/dashboard/transactions.vue -->
<template>
  <ui-loader
    v-model="isLoading"
    :area="LoaderAreas.BODY"
    :text="`Chargement de vos transactions...`"
  >
    <div v-if="isLoading" class="loading-container">
      <v-row class="mt-8">
        <v-col cols="12">
          <v-skeleton-loader type="article" />
        </v-col>
        <v-col cols="12" md="6" lg="3" v-for="value in 4">
          <v-skeleton-loader type="article" />
        </v-col>
      </v-row>

      <v-skeleton-loader
        class="mx-auto border mt-7"
        type="table"
      ></v-skeleton-loader>
    </div>

    <v-container fluid class="pa-0" v-else>
      <ui-deposit-dialog v-if="ifExpose" />

      <div class="mb-6">
        <v-row class="d-flex align-center justify-space-between flex-wrap">
          <!-- Titre -->
          <v-col cols="12" md="6">
            <h1 class="text-h4 font-weight-bold text-primary">Transactions</h1>
          </v-col>

          <!-- Boutons -->
          <v-col cols="12" md="6" class="d-flex justify-end flex-wrap">
            <v-btn
              color="primary"
              class="mr-2"
              prepend-icon="mdi-plus"
              @click="showDepositDialog = true"
            >
              Dépôt
            </v-btn>
            <v-btn
              color="primary"
              variant="outlined"
              class=""
              prepend-icon="mdi-minus"
              @click="showWithdrawalDialog = true"
            >
              Retrait
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Balance Summary -->
      <v-row class="mb-6">
        <v-col
          cols="12"
          md="6"
          lg="3"
          v-for="balance in balanceSummary"
          :key="balance.title"
        >
          <v-card elevation="0" rounded="lg" border dark>
            <v-card-text
              class="text-center d-flex justify-start align-center ga-4"
            >
              <component
                size="52"
                :class="'text-' + balance.color"
                :is="balance.icon"
              />
              <div class="d-flex flex-column-reverse align-start">
                <p
                  class="text-h5 font-weight-bold"
                  :class="['text-' + balance.color]"
                >
                  &#x244; {{ balance.amount }}

                  <span v-if="balance.percentage" class="text-caption">
                    {{ balance.percentage }}
                  </span>
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
          <template v-slot:item.date="{ item }">
            <p>{{ formatDate(item.created_at) }}</p>
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip :color="getTransactionColor(item.type)" size="small">
              <component size="16" :is="getTransactionIcon(item.type)" />
              <span class="pl-1">{{ getTransactionLabel(item.type) }}</span>
            </v-chip>
          </template>
          <template v-slot:item.amount="{ item }">
            <span
              :class="getAmountClass(item.type)"
              v-html="getAmountSign(item.type) + formatCurrency(item.amount)"
            >
            </span>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" size="small">
              {{ getStatusLabel(item.status) }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <!-- Deposit Dialog -->
    <wallets-deposit-dialog v-model:model-value="showDepositDialog" />
    <wallets-withdrawal-dialog v-model:model-value="showWithdrawalDialog" />
  </ui-loader>
</template>

<script setup lang="ts">
import { LoaderAreas } from "~/constants";
import {
  CreditCardIcon,
  ClockExclamationIcon,
  CircleXIcon,
} from "vue-tabler-icons";
import { formatCurrency, formatDate } from "~/helpers";
import useTransactionStore from "~/stores/transaction.store";
import { type TransactionModel } from "~/types/transaction.type";
import transactionComposable from "~/composables/transaction-handler";
import useWalletStore from "~/stores/wallet.store";

// Stores
const transactionStore = useTransactionStore();
const walletStore = useWalletStore();

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

// Meta tags
useSeoHead({
  title: "Transactions",
  subtitle: "Historique de vos transactions",
  forcePrefix: true,
});

// Valeurs réactives...
const transactions = computed(() =>
  transactionStore.getTransactions
    ? transactionStore.getTransactions
    : ([] as TransactionModel[])
);
const isLoading = ref<boolean>(false);
const search = ref("");
const showDepositDialog = ref(false);
const showWithdrawalDialog = ref(false);

const ifExpose = computed(
  () =>
    transactionStore.getTransactions?.length == 0 &&
    walletStore.getWallet?.funds == 0
);

const {
  // Montants
  balance,
  transactionStats,
  evolution,
  // Getters
  getTransactionColor,
  getTransactionIcon,
  getTransactionLabel,
  getAmountClass,
  getAmountSign,
  getStatusColor,
  getStatusLabel,
} = transactionComposable(transactions);

const balanceSummary = [
  {
    title: "Solde disponible",
    amount: balance.value,
    icon: CreditCardIcon,
    color: "primary",
  },
  {
    title: "Evolution",
    amount: evolution.value.amount,
    icon: evolution.value.icon,
    color: evolution.value.color,
    percentage: evolution.value.percentage,
  },
  {
    title: "En attente",
    amount: transactionStats.value.totalPending,
    icon: ClockExclamationIcon,
    color: "warning",
  },
  {
    title: "Transactions échouées",
    amount: transactionStats.value.totalFailed,
    icon: CircleXIcon,
    color: "error",
  },
];

const transactionHeaders = [
  { title: "Date", key: "date" },
  { title: "Type", key: "type" },
  { title: "Description", key: "description" },
  { title: "Montant", key: "amount" },
  { title: "Statut", key: "status" },
];

const loadTransactions = async () => {
  try {
    isLoading.value = true;
    await transactionStore.fetch();
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // load les users
  await loadTransactions();
});
</script>
