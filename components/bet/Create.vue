<script setup lang="ts">
import { ClockIcon, WalletIcon } from "vue-tabler-icons";
import { formatDate, formatCurrency } from "~/helpers";
import { notify } from "~/helpers/notifications";
import useAuthStore from "~/stores/auth.store";
import useBetStore from "~/stores/bet.store";
import type { MatchModel, BetModel } from "~/types/bet.type";

interface Props {
  match: MatchModel | null;
  modelValue: boolean;
  userBalance: number;
}

type PredictionProps = "home" | "draw" | "away";

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [betData: BetModel];
}>();

// Stores
const authStore = useAuthStore();
const betStore = useBetStore();

// Données réactives
const isLoading = ref<boolean>(false);
const prediction = ref<PredictionProps | null>(null);
const userId = computed(() => authStore.getMe?.id ?? "");

// Validation
const errors = ref<string[]>([]);

// Computed
const dialogValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Calculer les gains/pertes basés sur le solde
const potentialGain = computed(() => {
  if (!props.match) return 0;
  return (props.userBalance * props.match.winPercentage) / 100;
});

const potentialLoss = computed(() => {
  if (!props.match) return 0;
  return (props.userBalance * props.match.lossPercentage) / 100;
});

// Sélectionner une prédiction
const selectPrediction = (type: PredictionProps) => {
  prediction.value = type;
};

// Valider le formulaire
const validateForm = (): boolean => {
  errors.value = [];

  if (!prediction.value) {
    errors.value.push("Vous devez choisir un pronostic");
  }
  if (props.userBalance <= 0) {
    errors.value.push("Votre solde est insuffisant pour parier");
  }

  return errors.value.length === 0;
};

// Confirmer le pari
const confirmBet = async () => {
  if (!props.match || !validateForm()) {
    return;
  }

  const betData: BetModel = {
    matchId: props.match.id!,
    uid: userId.value,
    match: {} as MatchModel,
    prediction: getPredictionTla(prediction.value!),
    potentialGain: potentialGain.value,
    potentialLoss: potentialLoss.value,
  };

  try {
    isLoading.value = true;
    emit("confirm", betData);
    console.log("bet-data ======>", betData);
    await betStore.create(betData);
  } catch (error) {
    console.log("error====>", error);
    notify({
      message: error as string,
      color: "error",
      visible: true,
    });
  } finally {
    isLoading.value = false;
    closeDialog();
  }
};

// Fermer le dialog
const closeDialog = () => {
  dialogValue.value = false;
  resetForm();
};

// Réinitialiser le formulaire
const resetForm = () => {
  prediction.value = null;
  errors.value = [];
};

// Obtenir le nom de la prédiction
const getPredictionName = (type: PredictionProps): string => {
  if (!props.match) return "";
  switch (type) {
    case "home":
      return props.match.homeTeam.name;
    case "draw":
      return "Match Nul";
    case "away":
      return props.match.awayTeam.name;
    default:
      return "";
  }
};

const getPredictionTla = (type: PredictionProps): string => {
  if (!props.match) return "";
  switch (type) {
    case "home":
      return props.match.homeTeam.tla;
    case "draw":
      return "draw";
    case "away":
      return props.match.awayTeam.tla;
    default:
      return "";
  }
};

// Watcher
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetForm();
    }
  }
);
</script>

<template>
  <v-dialog
    v-model="dialogValue"
    max-width="650px"
    max-height="700px"
    persistent
    scrollable
  >
    <v-card v-if="match">
      <!-- En-tête -->
      <v-card-title
        class="d-flex align-center justify-space-between pa-4 bg-primary"
      >
        <div>
          <h3 class="text-h6 font-weight-bold text-white">Placer un pari</h3>
          <p class="text-caption text-white mb-0 opacity-90">
            Choisissez votre pronostic
          </p>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          color="white"
          @click="closeDialog"
        ></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-6" max-height="500px">
        <!-- Solde actuel -->
        <v-card
          color="primary"
          variant="tonal"
          class="px-4 py-2 mb-5"
          elevation="0"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <WalletIcon :size="24" class="mr-3" />
              <div class="text-caption text-grey-darken-1">
                Votre solde actuel:
              </div>
            </div>

            <div
              class="text-body-2 font-weight-bold"
              v-html="formatCurrency(userBalance)"
            ></div>
          </div>
        </v-card>

        <!-- Informations du match -->
        <v-sheet color="grey-lighten-4" rounded="lg" class="pa-4 mb-4">
          <div class="d-flex align-center justify-center mb-3">
            <ClockIcon :size="18" class="text-grey-darken-1 mr-2" />
            <span class="text-body-2 text-grey-darken-1 font-weight-medium">
              Début: {{ formatDate(match.start_at, "DD/MM/YYYY HH:mm") }}
            </span>
          </div>

          <div class="d-flex align-center justify-space-between">
            <!-- Équipe domicile -->
            <div class="text-center" style="flex: 1">
              <v-avatar size="60" class="mb-2">
                <v-img :src="match.homeTeam.crest"></v-img>
              </v-avatar>
              <div class="font-weight-bold">{{ match.homeTeam.name }}</div>
            </div>

            <!-- VS -->
            <div class="text-h5 font-weight-bold text-grey-darken-1 mx-4">
              VS
            </div>

            <!-- Équipe extérieure -->
            <div class="text-center" style="flex: 1">
              <v-avatar size="60" class="mb-2">
                <v-img :src="match.awayTeam.crest"></v-img>
              </v-avatar>
              <div class="font-weight-bold">{{ match.awayTeam.name }}</div>
            </div>
          </div>
        </v-sheet>

        <!-- Messages d'erreur -->
        <v-alert
          v-if="errors.length > 0"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          <ul class="ml-4">
            <li
              v-for="(error, index) in errors"
              :key="index"
              class="text-caption"
            >
              {{ error }}
            </li>
          </ul>
        </v-alert>

        <!-- Calculs des gains/pertes -->
        <v-card color="grey-lighten-5" variant="flat" class="pa-4 mb-4">
          <div class="text-subtitle-2 font-weight-bold mb-3 text-center">
            Résultats possibles
          </div>
          <v-row>
            <v-col cols="6">
              <div class="result-box success-box pa-3 rounded-lg text-center">
                <v-icon color="success" size="32" class="mb-1"
                  >mdi-trending-up</v-icon
                >
                <div class="text-caption text-grey-darken-1 mb-1">
                  Si vous gagnez (+{{ match.winPercentage }}%)
                </div>
                <div
                  class="text-h6 font-weight-bold text-success mb-1"
                  v-html="'+' + formatCurrency(potentialGain)"
                ></div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="result-box error-box pa-3 rounded-lg text-center">
                <v-icon color="error" size="32" class="mb-1"
                  >mdi-trending-down</v-icon
                >
                <div class="text-caption text-grey-darken-1 mb-1">
                  Si vous perdez (-{{ match.lossPercentage }}%)
                </div>
                <div
                  class="text-h6 font-weight-bold text-error mb-1"
                  v-html="'-' + formatCurrency(potentialLoss)"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Sélection du pronostic -->
        <div class="mb-4">
          <h4 class="text-subtitle-2 font-weight-bold mb-3">
            Choisissez votre pronostic
          </h4>
          <v-row>
            <v-col cols="4">
              <v-card
                :class="[
                  'prediction-card',
                  { selected: prediction === 'home' },
                ]"
                @click="selectPrediction('home')"
                elevation="0"
                hover
              >
                <v-card-text class="text-center pa-3">
                  <v-avatar size="40" class="mb-2">
                    <v-img :src="match.homeTeam.crest"></v-img>
                  </v-avatar>
                  <div class="text-caption mb-1">Victoire</div>
                  <div class="text-body-2 font-weight-bold">
                    {{ match.homeTeam.tla }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card
                :class="[
                  'prediction-card',
                  { selected: prediction === 'draw' },
                ]"
                @click="selectPrediction('draw')"
                elevation="0"
                hover
              >
                <v-card-text class="text-center pa-3">
                  <v-avatar color="secondary" size="40" class="mb-2">
                    <v-icon color="white">mdi-equal</v-icon>
                  </v-avatar>
                  <div class="text-caption mb-1">Match</div>
                  <div class="text-body-2 font-weight-bold">Nul</div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card
                :class="[
                  'prediction-card',
                  { selected: prediction === 'away' },
                ]"
                @click="selectPrediction('away')"
                elevation="0"
                hover
              >
                <v-card-text class="text-center pa-3">
                  <v-avatar size="40" class="mb-2">
                    <v-img :src="match.awayTeam.crest"></v-img>
                  </v-avatar>
                  <div class="text-caption mb-1">Victoire</div>
                  <div class="text-body-2 font-weight-bold">
                    {{ match.awayTeam.tla }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Récapitulatif -->
        <v-card v-if="prediction" color="primary" variant="tonal" class="pa-4">
          <div class="text-subtitle-2 font-weight-bold mb-3">Récapitulatif</div>
          <div class="d-flex align-center justify-between mb-2">
            <span class="text-body-2 mr-3">Votre pronostic :</span>
            <v-chip size="small" color="primary" variant="flat">
              {{ getPredictionName(prediction) }}
            </v-chip>
          </div>
          <div class="d-flex align-center justify-between mb-2">
            <span class="text-body-2 pr-1">Si vous gagnez : </span>
            <div class="text-right">
              <div
                class="text-success font-weight-bold"
                v-html="'+' + formatCurrency(potentialGain)"
              ></div>
            </div>
          </div>
          <div class="d-flex align-center justify-between">
            <span class="text-body-2">Si vous perdez :</span>
            <div class="text-right">
              <div
                class="text-error font-weight-bold"
                v-html="'-' + formatCurrency(potentialLoss)"
              ></div>
            </div>
          </div>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions class="pa-4">
        <v-btn variant="text" @click="closeDialog"> Annuler </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="flat"
          size="large"
          :disabled="!prediction || userBalance <= 0"
          :loading="isLoading"
          @click="confirmBet"
          append-icon="mdi-check-circle"
        >
          Confirmer mon pronostic
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.prediction-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid rgba(0, 0, 0, 0.08);
}

.prediction-card.selected {
  border: 2px solid rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.result-box {
  border: 2px solid rgba(0, 0, 0, 0.08);
  background: white;
}

.success-box {
  border-color: rgba(var(--v-theme-success), 0.3);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-success), 0.05) 0%,
    white 100%
  );
}

.error-box {
  border-color: rgba(var(--v-theme-error), 0.3);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-error), 0.05) 0%,
    white 100%
  );
}

.opacity-90 {
  opacity: 0.9;
}
</style>
