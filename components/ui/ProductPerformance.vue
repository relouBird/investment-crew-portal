<script setup lang="ts">
import { product_PerformanceData } from "~/constants/dashboard.constant";
import useSponsoringStore from "~/stores/sponsoring.store";
import type { SponsoringModel } from "~/types/sponsoring.type";
const sponsoringStore = useSponsoringStore();

const sponsored = computed(() => {
  const first = sponsoringStore.items;
  let tab: SponsoringModel[] = [];
  for (let i = 0; i < 3; i++) {
    tab.push(first[i] ? first[i] : ({} as SponsoringModel));
  }
  return tab;
});
</script>

<template>
  <v-card elevation="0" flat class="w-100 border rounded-lg" v-if="sponsoringStore.sponsorCount">
    <span class="lstick"></span>

    <v-card-text>
      <div>
        <p class="mb-1 text-h5">Parrainages</p>
        <h5 class="text-subtitle-2 font-weight-light">
          Tous les utilisateurs parrainés
        </h5>
      </div>

      <!-- WRAPPER POUR SCROLL GLOBAL -->
      <div class="table-scroll-wrapper mt-5">
        <v-table class="month-table">
          <thead>
            <tr>
              <th class="font-weight-medium text-subtitle-1">Initials</th>
              <th class="font-weight-medium text-subtitle-1">Nom</th>
              <th class="font-weight-medium text-subtitle-1">Email</th>
              <th class="font-weight-medium text-subtitle-1">Premier dépôt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in sponsored" :key="key" class="month-item">
              <td v-if="item.initials">
                <div class="d-flex align-center py-2">
                  <v-avatar color="primary" size="40">
                    <span class="text-white font-weight-bold">{{
                      item.initials
                    }}</span>
                  </v-avatar>
                </div>
              </td>
              <td v-else></td>

              <td v-if="item.name">
                <h5 class="text-no-wrap text-body-1">
                  {{ item.name }}
                </h5>
              </td>
              <td v-else></td>

              <td v-if="item.email">
                <h5 class="text-no-wrap text-body-1">
                  {{ item.email }}
                </h5>
              </td>
              <td v-else></td>

              <td
                v-if="
                  item.firstDeposit != undefined && item.firstDeposit != null
                "
              >
                <v-chip
                  class="ma-2 rounded-lg"
                  :color="item.firstDeposit ? 'success' : 'error'"
                  size="small"
                  label
                >
                  {{ item.firstDeposit ? "Oui" : "Non" }}
                </v-chip>
              </td>
              <td v-else></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.table-scroll-wrapper {
  max-height: 230px;
  overflow-y: auto;
}
</style>
