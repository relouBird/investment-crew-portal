<!-- pages/dashboard/bets.vue -->
<template>
  <ui-loader
    v-model="isLoading"
    :area="LoaderAreas.BODY"
    :text="`Chargement de vos paris...`"
  >
    <div v-if="isLoading" class="loading-container">
      <v-row class="mt-0">
        <v-col cols="12">
          <v-skeleton-loader type="article" />
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="12" lg="4" md="6" v-for="value in 6">
          <v-skeleton-loader
            class="mx-auto border"
            type="image, article, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>

    <v-container fluid class="pa-0" v-else>
      <div class="mb-6">
        <v-row class="d-flex align-center justify-space-between flex-wrap">
          <!-- Titre -->
          <v-col cols="12" md="6" class="">
            <h1 class="text-h4 font-weight-bold text-primary">
              Tout Mes Paris
            </h1>
          </v-col>
        </v-row>
      </div>

      <!-- Tabs for bet status -->
      <v-tabs v-model="selectedTab" color="primary" class="mb-6">
        <v-tab value="available"
          >Paris Disponible ({{ activeMatches?.length ?? 0 }})</v-tab
        >
        <v-tab value="active">Paris Actifs ({{ activesBets.length ?? 0 }})</v-tab>
        <v-tab value="completed">Terminés (15)</v-tab>
      </v-tabs>

      <v-window v-model="selectedTab">
        <v-window-item value="available">
          <bet-items
            :matches="activeMatches"
            v-model:model-value="actions"
            v-if="activeMatches"
          />
        </v-window-item>

        <v-window-item value="active">
          <bet-created-items :bets="activesBets" :is-loading="isLoading" />
        </v-window-item>

        <v-window-item value="completed">
          <v-card elevation="0" class="border border-opacity" rounded="lg">
            <v-card-title class="font-montserrat"
              >Historique des paris</v-card-title
            >
            <v-data-table
              :headers="completedBetsHeaders"
              :items="completedBets"
              class="elevation-0"
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="item.status === 'won' ? 'success' : 'error'"
                  size="small"
                >
                  {{ item.status === "won" ? "Gagné" : "Perdu" }}
                </v-chip>
              </template>
              <template v-slot:item.result="{ item }">
                <span
                  :class="item.status === 'won' ? 'text-success' : 'text-error'"
                >
                  {{ item.result }}
                </span>
              </template>
            </v-data-table>
          </v-card>
        </v-window-item>
      </v-window>
    </v-container>

    <bet-create
      v-model:model-value="isCreateBet"
      :match="actions.match"
      :user-balance="balance"
      v-if="actions.match"
    />
  </ui-loader>
</template>

<script setup lang="ts">
import { LoaderAreas } from "~/constants";
import useBetStore from "~/stores/bet.store";
import useWalletStore from "~/stores/wallet.store";
import type { BetModel, MatchModel } from "~/types/bet.type";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

// Stores
const betStore = useBetStore();
const walletStore = useWalletStore();

// Valeurs réactives...
const isLoading = ref<boolean>(false);
const isCreateBet = ref<boolean>(false);
const balance = computed(() => walletStore.getWallet?.funds ?? 0);

const selectedTab = ref("available");

const activeMatches = computed(() => betStore.matches);
const activesBets = computed(() => betStore.getBets ?? []);

const actions = ref<{ action: boolean; match: MatchModel | undefined }>({
  action: false,
  match: undefined,
});

const completedBetsHeaders = [
  { title: "Match", key: "match" },
  { title: "Prédiction", key: "prediction" },
  { title: "Mise", key: "stake" },
  { title: "Statut", key: "status" },
  { title: "Résultat", key: "result" },
  { title: "Date", key: "date" },
];

const completedBets = [
  {
    match: "PSG vs Real Madrid",
    prediction: "PSG gagne",
    stake: "€100",
    status: "won",
    result: "+€150",
    date: "2024-07-18",
  },
  // ... more completed bets
];

// Méthodes...
const loadBets = async () => {
  try {
    isLoading.value = true;
    await betStore.fetchMatches();
    await betStore.fetch();
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadBets();
});

watch(
  () => actions.value,
  (newValue) => {
    if (newValue.action && newValue.match) {
      console.log(
        "actions: ",
        newValue.action,
        ", bet-id: ",
        newValue.match.id
      );
      isCreateBet.value = newValue.action;
    }
  }
);
</script>
