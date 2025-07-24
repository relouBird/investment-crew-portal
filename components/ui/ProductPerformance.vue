<script setup lang="ts">
import { product_PerformanceData } from "~/constants/dashboard.constant";
</script>

<template>
  <v-card elevation="0" flat class="w-100 border rounded-lg">
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
              <th class="font-weight-medium text-subtitle-1">Assigned</th>
              <th class="font-weight-medium text-subtitle-1">Name</th>
              <th class="font-weight-medium text-subtitle-1">Priority</th>
              <th class="font-weight-medium text-subtitle-1">Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in product_PerformanceData"
              :key="item.leadname"
              :class="item.activestate"
              class="month-item"
            >
              <td>
                <div class="d-flex align-center py-2">
                  <v-avatar size="40">
                    <img :src="item.img" :alt="item.img" width="40" />
                  </v-avatar>
                </div>
              </td>
              <td>
                <h5 class="text-no-wrap text-body-1">
                  {{ item.projectname }}
                </h5>
              </td>
              <td>
                <v-chip
                  class="ma-2 rounded-lg"
                  :color="item.statuscolor"
                  size="small"
                  label
                >
                  {{ item.statustext }}
                </v-chip>
              </td>
              <td>
                <h4
                  class="text-no-wrap text-body-2 opacity-80 font-weight-thin"
                >
                  {{ item.money }}
                </h4>
              </td>
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
