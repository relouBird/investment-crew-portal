<script setup lang="ts">
import { useNotificationStore } from "~/stores/notification.store";

const useNotification = useNotificationStore();
const store = storeToRefs(useNotification);

function handleClose() {
  useNotification.close();
  console.log("____verification____");
}

watch(store.visible, (newVal) => {
  console.log("new-notification =>", store.message.value);
  setTimeout(() => {
    if (store.isVisible.value) {
      useNotification.close();
    }
  }, store.timeout.value);
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  
  <div class="bottom">
    <v-alert
      v-model="store.visible.value"
      :close-label="store.color.value"
      :color="store.color.value"
      class="animate-notif"
      theme="dark"
      border
      closable
      @click:close="handleClose"
    >
      {{ store.color.value == "error" ? "Error :" : "" }}
      {{ store.message.value }}
    </v-alert>
  </div>
</template>

<style scoped>
.bottom {
  position: absolute !important;
  bottom: 5em;
  right: 2em;
  z-index: 1000;
}
.animate-notif {
  animation: come 400ms linear;
}

@keyframes come {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
