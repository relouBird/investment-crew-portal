<script setup lang="ts">
import { ArrowUpLeftIcon } from "vue-tabler-icons";
import { formatBalance } from "~/helpers/utils";

type UiCongratulationCardType = {
  name : string;
}

const props = defineProps<UiCongratulationCardType>();
</script>

<template>
  <v-card
    elevation="0"
    class="position-relative overflow-hidden border rounded-lg pb-1"
  >
    <span class="lstick"></span>
    <img src="@/assets/images/profile/businessmen.png" class="bg-img-1" />
    <v-card-text>
      <h2 class="title text-h6 overlay-title">Bienvenue {{ name ?? "User" }}</h2>
      <h2 class="font-weight-bold mt-4 d-flex align-center mb-1">
        &#x244; {{ formatBalance(39358) }}
        <span class="text-subtitle-1 ml-2 d-flex align-center text-success">
          <ArrowUpLeftIcon size="18" />+9%
        </span>
      </h2>
      <v-btn color="primary" class="mt-8" flat> Deposer </v-btn>
    </v-card-text>
  </v-card>
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
