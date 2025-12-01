<script setup lang="ts">
// UserBetsList.vue
import { TrophyIcon } from "vue-tabler-icons";
import { formatDate, formatCurrency } from "~/helpers";
import type { MatchModel, BetModel } from "~/types/bet.type";

type StateType = {
  bets: BetModel[];
  isLoading: boolean;
};

const props = defineProps<StateType>();

const emit = defineEmits<{
  "bet-click": [bet: BetModel];
}>();

// Obtenir le statut du pari
const getBetStatus = (bet: BetModel) => {
  if (bet.win == true) {
    return { text: "Gagné", color: "success", icon: "mdi-check-circle" };
  }
  if (bet.win == false) {
    return { text: "Perdu", color: "error", icon: "mdi-close-circle" };
  }
  if (bet.match.isEnded) {
    return { text: "Terminé", color: "grey", icon: "mdi-flag-checkered" };
  }
  return { text: "En cours", color: "primary", icon: "mdi-clock-outline" };
};

// Obtenir le score formaté
const getScoreDisplay = (score: string) => {
  if (!score || score === "") return null;
  return score;
};

// Obtenir le texte de prédiction
const getPredictionText = (prediction: string, match: MatchModel) => {
  switch (prediction) {
    case match.homeTeam.tla:
      return match.homeTeam.name;
    case match.awayTeam.tla:
      return match.awayTeam.name;
    case "draw":
      return "Nul";
    default:
      return prediction;
  }
};

// Calculer le résultat final
const getFinalResult = (bet: BetModel) => {
  if (bet.win == true) {
    return {
      profit: bet.potentialGain,
      isWin: true,
    };
  } else if (bet.win == false) {
    return {
      profit: -bet.potentialLoss,
      isWin: false,
    };
  }
  return null;
};

function handleBetClick(bet: BetModel) {
  emit("bet-click", bet);
}
</script>

<template>
  <!-- Loading -->
  <div v-if="isLoading" class="text-center py-12">
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
    <p class="text-grey-darken-1 mt-4">Chargement de vos paris...</p>
  </div>

  <!-- Liste des paris -->
  <div v-else>
    <v-row>
      <v-col v-for="bet in bets" :key="bet.id" cols="12" sm="6" md="6" lg="4">
        <v-card
          class="user-bet-card"
          :class="{
            'bet-won': bet.win == true,
            'bet-lost': bet.win == false,
            'bet-pending': bet.win != true && bet.win != false,
          }"
          elevation="0"
          rounded="lg"
          @click="handleBetClick(bet)"
        >
          <!-- Badge de statut -->
          <div class="status-badge">
            <v-chip
              :color="getBetStatus(bet).color"
              size="small"
              variant="flat"
              :prepend-icon="getBetStatus(bet).icon"
            >
              {{ getBetStatus(bet).text }}
            </v-chip>
          </div>

          <v-card-text class="pa-4">
            <!-- ID du pari -->
            <div class="text-caption text-grey-darken-1 mb-3">
              Pari #{{ String(bet.id).split("-").slice(0, 3).join("-") }}
            </div>

            <!-- Équipes -->
            <div class="teams-container mb-3">
              <!-- Équipe domicile -->
              <div class="team-section">
                <v-avatar size="50" color="grey-lighten-4" class="mb-2">
                  <v-img
                    :src="bet.match.homeTeam.crest"
                    :alt="bet.match.homeTeam.name"
                  ></v-img>
                </v-avatar>
                <div class="text-body-2 font-weight-bold text-center team-name">
                  {{ bet.match.homeTeam.tla }}
                </div>
              </div>

              <!-- VS ou Score -->
              <div class="vs-section">
                <div
                  v-if="getScoreDisplay(bet.match.score)"
                  class="score-display"
                >
                  <div class="text-h5 font-weight-bold text-primary">
                    {{ bet.match.score }}
                  </div>
                  <div class="text-caption text-grey-darken-1">Final</div>
                </div>
                <div v-else class="vs-display pt-3">
                  <div class="text-h6 font-weight-bold text-grey-darken-1">
                    VS
                  </div>
                </div>
              </div>

              <!-- Équipe extérieure -->
              <div class="team-section">
                <v-avatar size="50" color="grey-lighten-4" class="mb-2">
                  <v-img
                    :src="bet.match.awayTeam.crest"
                    :alt="bet.match.awayTeam.name"
                  ></v-img>
                </v-avatar>
                <div class="text-body-2 font-weight-bold text-center team-name">
                  {{ bet.match.awayTeam.tla }}
                </div>
              </div>
            </div>

            <!-- Gagnant si terminé -->
            <div
              v-if="bet.match.isEnded && bet.match.winner"
              class="winner-section mb-3"
            >
              <v-chip
                color="warning"
                size="small"
                variant="tonal"
                class="w-100"
              >
                <TrophyIcon :size="16" class="mr-2" />
                Vainqueur:
                {{
                  bet.match.winner != "draw" ? bet.match.winner : "Match Nul"
                }}
              </v-chip>
            </div>

            <v-divider class="my-3"></v-divider>

            <!-- Informations du pari -->
            <div class="bet-info-section mb-3">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-caption text-grey-darken-1"
                  >Votre pronostic:</span
                >
                <v-chip size="x-small" color="primary" variant="flat">
                  {{ getPredictionText(bet.prediction, bet.match) }}
                </v-chip>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption text-grey-darken-1"
                  >Date du pari:</span
                >
                <span class="text-caption text-grey-darken-2">
                  {{ formatDate(bet.created_at, "DD/MM/YYYY HH:mm") }}
                </span>
              </div>
            </div>

            <!-- Résultat si terminé -->
            <div v-if="bet.match.isEnded && getFinalResult(bet)">
              <v-divider class="mb-3"></v-divider>
              <div
                class="result-display pa-3 rounded"
                :class="getFinalResult(bet)!.isWin ? 'bg-success-light' : 'bg-error-light'"
              >
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-body-2 font-weight-bold">
                    {{ getFinalResult(bet)!.isWin ? "Gain:" : "Perte:" }}
                  </span>
                  <span
                    class="text-h6 font-weight-bold"
                    :class="getFinalResult(bet)!.isWin ? 'text-success' : 'text-error'"
                    v-html="(getFinalResult(bet)!.isWin ? '+' : '') + formatCurrency(getFinalResult(bet)?.profit ?? 0)"
                  >
                  </span>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <span class="text-caption text-grey-darken-1"
                    >Solde final:</span
                  >
                  <span
                    class="text-body-2 font-weight-bold"
                    v-html="formatCurrency(getFinalResult(bet)?.profit ?? 0)"
                  >
                  </span>
                </div>
              </div>
            </div>

            <!-- Gains/Pertes potentiels si en cours -->
            <div v-else>
              <v-sheet color="grey-lighten-4" rounded="lg" class="pa-3">
                <div class="d-flex justify-space-between align-center mb-2">
                  <div class="flex-grow-1">
                    <div class="text-caption text-grey-darken-1">
                      Gain potentiel
                    </div>
                    <div
                      class="text-h6 font-weight-bold text-success"
                      v-html="'+ ' + formatCurrency(bet.potentialGain)"
                    ></div>
                  </div>
                  <v-divider vertical class="mx-2"></v-divider>
                  <div class="flex-grow-1 text-right">
                    <div class="text-caption text-grey-darken-1">
                      Perte potentielle
                    </div>
                    <div
                      class="text-h6 font-weight-bold text-error"
                      v-html="'- ' + formatCurrency(bet.potentialLoss)"
                    ></div>
                  </div>
                </div>
              </v-sheet>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Message si aucun pari -->
    <v-alert
      v-if="bets.length === 0"
      type="info"
      variant="tonal"
      class="text-center mt-10"
    >
      Vous n'avez encore placé aucun pari
    </v-alert>
  </div>
</template>

<style scoped>
.user-bet-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.08);
  position: relative;
}
.user-bet-card.bet-won {
  border-color: rgba(var(--v-theme-success), 0.5);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-success), 0.03) 0%,
    #ffffff 100%
  );
}

.user-bet-card.bet-lost {
  border-color: rgba(var(--v-theme-error), 0.5);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-error), 0.03) 0%,
    #ffffff 100%
  );
}

.user-bet-card.bet-pending {
  border-color: rgba(var(--v-theme-primary), 0.3);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-primary), 0.02) 0%,
    #ffffff 100%
  );
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.teams-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.team-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.team-name {
  line-height: 1.2;
  min-height: 1.2em;
}

.vs-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  flex-shrink: 0;
}

.score-display {
  text-align: center;
}

.vs-display {
  text-align: center;
}

.winner-section {
  display: flex;
  justify-content: center;
}

.bet-info-section {
  background: rgba(0, 0, 0, 0.02);
  padding: 12px;
  border-radius: 8px;
}

.result-display {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.bg-success-light {
  background-color: rgba(var(--v-theme-success), 0.1);
  border-color: rgba(var(--v-theme-success), 0.3) !important;
}

.bg-error-light {
  background-color: rgba(var(--v-theme-error), 0.1);
  border-color: rgba(var(--v-theme-error), 0.3) !important;
}

.w-100 {
  width: 100%;
}
</style>
