<script setup lang="ts">
import { formatCurrency, formatDate } from "~/helpers";
import type { BetModel } from "~/types/bet.type";

type StateType = {
  bets: BetModel[];
};

const props = defineProps<StateType>();

const VIEW_TYPE_TABLE = "table";
const VIEW_TYPE_CARD = "card";

const completedBetsHeaders = [
  { title: "Match", key: "match" },
  { title: "Prédiction", key: "prediction" },
  { title: "Final", key: "final" },
  { title: "Statut", key: "status" },
  { title: "Résultat", key: "result" },
  { title: "Date", key: "date" },
];

// Valeurs réactives...
const currentViewType = ref<string>(VIEW_TYPE_TABLE);
const isLoading = ref<boolean>(false);

// Méthodes utiles
const getFinalScoreByState = (winner: string) => {
  if (winner != "") {
    let state = winner != "draw" ? "Victoire " + winner : "Match Nul";
    return state;
  } else {
    return "Attente...";
  }
};

// Méthodes utiles
const getColorByWinnerState = (winner?: boolean) => {
  if (winner === true) {
    return "success";
  } else if (winner === false) {
    return "error";
  } else {
    return "info";
  }
};
</script>
<template>
  <v-card elevation="0" class="border border-opacity" rounded="lg">
    <v-card-title class="font-montserrat d-flex justify-space-between pt-3">
      <div>
        <p>Historique des paris</p>
        <p class="text-caption opacity-80">
          Ceci est l'historique complète de tout vos paris
        </p>
      </div>
      <div>
        <!-- Bouton pour basculer la vue -->
        <v-btn-toggle
          v-model="currentViewType"
          mandatory
          color="primary"
          variant="outlined"
          divided
          class="d-flex gap-2 justify-end rounded-lg"
        >
          <v-tooltip text="Voir sous forme de tableau">
            <template v-slot:activator="{ props }">
              <v-btn icon :value="VIEW_TYPE_TABLE" v-bind="props">
                <v-icon icon="mdi-table" />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Voir sous forme de card">
            <template v-slot:activator="{ props }">
              <v-btn icon :value="VIEW_TYPE_CARD" v-bind="props">
                <v-icon icon="mdi-view-grid" />
              </v-btn>
            </template>
          </v-tooltip>
        </v-btn-toggle>
      </div>
    </v-card-title>
    <v-data-table
      :headers="completedBetsHeaders"
      :items="bets"
      class="elevation-0"
      v-if="currentViewType == VIEW_TYPE_TABLE"
    >
      <template v-slot:item.match="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex align-center ga-1">
            <v-avatar size="28"
              ><v-img :src="item.match.homeTeam.crest"></v-img
            ></v-avatar>
            <p class="font-weight-bold pt-1">{{ item.match.homeTeam.tla }}</p>
            <p></p>
          </div>

          <div class="d-flex align-center ga-1">
            -
            <v-avatar size="28"
              ><v-img :src="item.match.awayTeam.crest"></v-img
            ></v-avatar>
            <p class="font-weight-bold pt-1">{{ item.match.awayTeam.tla }}</p>
          </div>
        </div>
      </template>

      <template v-slot:item.final="{ item }">
        <p>
          {{ getFinalScoreByState(item.match.winner) }}
        </p>
      </template>

      <template v-slot:item.prediction="{ item }">
        <p>
          {{
            item.prediction != "draw"
              ? "Victoire " + item.prediction
              : "Match Nul"
          }}
        </p>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip :color="getColorByWinnerState(item.win)" size="small">
          {{
            item.win == true ? "Gagné" : item.win == false ? "Perdu" : "Attente"
          }}
        </v-chip>
      </template>
      <template v-slot:item.result="{ item }">
        <span
          class="text-success"
          v-if="item.win == true"
          v-html="'+ ' + formatCurrency(item.potentialGain)"
        >
        </span>
        <span
          v-else-if="item.win == false"
          class="text-error"
          v-html="'- ' + formatCurrency(item.potentialLoss)"
        ></span>

        <span
          class="text-info"
          v-else
          v-html="formatCurrency(0)"
        >
        </span>
      </template>

      <template v-slot:item.date="{ item }">
        <span>
          {{ formatDate(item.created_at) }}
        </span>
      </template>
    </v-data-table>

    <div v-else class="pa-5">
      <bet-created-items :bets="bets" :is-loading="isLoading" />
    </div>
  </v-card>
</template>
