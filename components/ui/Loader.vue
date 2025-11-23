<script setup lang="ts">
import { LoaderAreas } from '~/constants';

// Type pour propriétés
type PropsType = {
                modelValue : boolean,
                text?: string;
                area?: LoaderAreas;
                minHeight?: string;
              }

// Definitions des Evenements du composant
const emit = defineEmits(['update:modelValue'])

// Definitions des propriété du composant
const props = withDefaults(
                defineProps<PropsType>(),
              {
                modelValue : false,
                text: "Veuillez patienter ...",
                area: LoaderAreas.BODY,
                minHeight: "300px",
               
              }
            );

const loading = computed<boolean>({
                  get: () => props.modelValue,
                  set: (value : boolean) => {
                      emit("update:modelValue", value);
                  },
              });

</script>

<template>
  <div>
      <!-- Loader en mode plein écran -->
      <v-overlay
        v-if="loading && (area === LoaderAreas.BODY)"
        :model-value="true"
        persistent
        class="align-center justify-center">
        <div class="text-center">
            <v-progress-circular
                indeterminate
                color="primary"
                :size="70"
                :width="7"
                class="mb-1"
            />
        <p class="text-white text-h6 mt-2">{{ text }}</p>
        </div>
      </v-overlay>


    <!-- Loader en mode zone slot -->
    <div class="slot-zone" :style="{ minHeight: minHeight }">
      <slot class="content" />
         <v-overlay
             v-if="loading && (area === LoaderAreas.SLOT)"
             :model-value="true"
             persistent
             class="align-center justify-center"
         >
           <div class="text-center">
               <v-progress-circular
                   indeterminate
                   color="primary"
                   :size="70"
                   :width="7"
                   class="mb-1"
               />
               <p class="text-white text-h6 mt-2">{{ text }}</p>
           </div>
         </v-overlay>
    </div>
</div>
</template>

<style scoped>
  .slot-zone {
    position: relative !important;
  }
</style>

