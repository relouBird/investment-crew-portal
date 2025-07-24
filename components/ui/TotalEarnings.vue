<script setup lang="ts">
import { CurrencyDollarIcon } from "vue-tabler-icons";
import { formatBalance } from "~/helpers/utils";
</script>

<template>
  <v-card elevation="0" class="border rounded-lg">
    <span class="lstick"></span>
    <v-card-text>
      <div class="d-flex align-start">
        <h2 class="text-h6 mt-1">Total Gagné</h2>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-btn color="primary" icon flat>
            <CurrencyDollarIcon />
          </v-btn>
        </div>
      </div>
      <div class="mt-11">
        <h2 class="title font-weight-bold mb-1">
          &#x244; {{ formatBalance(93438.78) }}
        </h2>
        <span class="text-subtitle-1 textPrimary">Monthly Revenue</span>
      </div>
    </v-card-text>
  </v-card>
</template>
