<script setup lang="ts">
import { ArrowUpLeftIcon, ArrowDownRightIcon } from "vue-tabler-icons";
import { formatBalance } from "~/helpers/utils";

type UiCongratulationCardType = {
  name: string;
  funds: number;
  growth: string;
};

const props = defineProps<UiCongratulationCardType>();

// valeur reactive...
const showDepositDialog = ref(false);
</script>

<template>
  <v-card
    elevation="0"
    class="position-relative overflow-hidden border rounded-lg pb-1"
  >
    <span class="lstick"></span>
    <img src="@/assets/images/profile/businessmen.png" class="bg-img-1" />
    <v-card-text>
      <h2 class="title text-h6 overlay-title">
        Bienvenue {{ name ?? "User" }}
      </h2>
      <h2 class="font-weight-bold mt-4 d-flex align-center mb-1">
        &#x244; {{ formatBalance(funds) }}
        <span
          class="text-subtitle-1 ml-2 d-flex align-center text-success"
          v-if="!growth.includes('-')"
        >
          <ArrowUpLeftIcon size="18" />+{{ growth }}
        </span>

        <span
          class="text-subtitle-1 ml-2 d-flex align-center text-error"
          v-else
        >
          <ArrowDownRightIcon size="18" />{{ growth }}
        </span>
      </h2>
      <v-btn
        color="primary"
        class="mt-8"
        @click="showDepositDialog = true"
        flat
      >
        Deposer
      </v-btn>
    </v-card-text>
  </v-card>

  <!-- Deposit Dialog -->
  <wallets-deposit-dialog v-model:model-value="showDepositDialog" />
</template>

<style scoped>
.overlay-title {
  position: relative;
  z-index: 1;
}

.bg-img-1 {
  position: absolute;
  right: -18px;
  width: 265px;
  top: -20px;
}
</style>
