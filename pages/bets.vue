<!-- pages/dashboard/bets.vue -->
<template>
  <div>
    <div class="mb-6">
      <v-row class="d-flex align-center justify-space-between flex-wrap">
        <!-- Titre -->
        <v-col cols="12" md="6" class="">
          <h1 class="text-h4 font-weight-bold text-primary">Tout Mes Paris</h1>
        </v-col>

        <!-- Boutons -->
        <v-col cols="12" md="6" class="d-flex justify-end flex-wrap">
          <v-btn color="primary" prepend-icon="mdi-plus" @click="$router.push('/dashboard/bets/new')">
            Nouveau Pari
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Tabs for bet status -->
    <v-tabs v-model="selectedTab" color="primary" class="mb-6">
      <v-tab value="active">Paris Actifs (3)</v-tab>
      <v-tab value="completed">Terminés (15)</v-tab>
    </v-tabs>

    <v-window v-model="selectedTab">
      <v-window-item value="active">
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="bet in activeBets"
            :key="bet.id"
          >
            <v-card
              class="bet-card border-sm border-opacity"
              elevation="0"
              rounded="lg"
            >
              <v-card-text>
                <div class="d-flex justify-space-between align-center mb-2">
                  <v-chip :color="bet.sport.color" size="small">
                    <v-icon left size="16">{{ bet.sport.icon }}</v-icon>
                    {{ bet.sport.name }}
                  </v-chip>
                  <v-chip color="warning" size="small">En cours</v-chip>
                </div>
                <h3 class="text-h6 mb-2">{{ bet.match }}</h3>
                <p class="text-body-2 text-grey-600 mb-3">
                  {{ bet.prediction }}
                </p>
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="text-caption text-grey-600">Mise</div>
                    <div class="font-weight-bold">{{ bet.stake }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-caption text-grey-600">Gain potentiel</div>
                    <div class="font-weight-bold text-success">
                      {{ bet.potentialWin }}
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const selectedTab = ref("active");

const activeBets = [
  {
    id: 1,
    match: "Barcelona vs Arsenal",
    sport: { name: "Football", icon: "mdi-soccer", color: "green" },
    prediction: "Barcelona gagne",
    stake: "€50.00",
    potentialWin: "€125.00",
  },
  // ... more bets
];

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
</script>
