<script setup lang="ts">
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { activeCountries, type CountryType } from "~/helpers/data-countries";
import useCountryStore from "~/stores/countries.store";

const props = defineProps<{
  modelValue: string | undefined;
  disabled?: boolean;
  disabledCountrySelector?: boolean;
  placeholder?: string;
  label?: string;
  errorMessages?: string | string[];
  loading?: boolean;
}>();

const emit = defineEmits([
  "update:modelValue",
  "update:modelCodeValue",
  "on-country-changed",
]);

const countryStore = useCountryStore();
const allCountries = computed(() => countryStore.allCountries || []);

onMounted(async () => {
  console.log("countries-length =>", allCountries.value.length);
  await countryStore.getAllCountries();
});

// Valeurs locales
const prefix = ref<string>("+237");
const number = ref<string>("");
const error = ref<string | null>(null);

// Déterminer le pays actif
const activeCountry = computed<CountryType>({
  get() {
    return activeCountries(allCountries.value, prefix.value);
  },
  set(newCountry: any) {
    prefix.value = newCountry.code;
    emit("update:modelCodeValue", newCountry.code);

    updateFullPhoneNumber();
  },
});

// Met à jour la valeur complète formatée
function updateFullPhoneNumber() {
  const raw = prefix.value + number.value;
  try {
    const phone = parsePhoneNumberFromString(raw);
    const formatted = phone?.format("E.164") || raw;
    emit("update:modelValue", formatted);
  } catch {
    emit("update:modelValue", raw);
  }
}

// Initialiser les valeurs à partir du modelValue
onMounted(() => {
  const phone = parsePhoneNumberFromString(props.modelValue || "");
  prefix.value = phone?.countryCallingCode
    ? "+" + phone.countryCallingCode
    : "+237";
  number.value = phone?.nationalNumber || "";
});

watch(
  () => props.errorMessages,
  (newVal: any) => {
    if (newVal) {
      error.value = newVal;
    }
  },
  { immediate: true }
);

// Met à jour quand l’utilisateur modifie les champs
watch([prefix, number], () => {
  updateFullPhoneNumber();
});
</script>

<template>
  <div class="d-flex align-center ga-2 w-100">
    <!-- Sélecteur de pays -->
    <v-select
      v-model="activeCountry"
      :readonly="disabledCountrySelector || disabled"
      :items="allCountries"
      item-title="all"
      variant="outlined"
      color="primary"
      return-object
      density="compact"
      class="w-33"
      hide-details
    >
      <template v-slot:selection="{ item }">
        <v-avatar size="24" class="mr-2">
          <img :src="item.raw.flag" width="40" />
        </v-avatar>
        ({{ item.raw.code }})
      </template>

      <!-- Personnalisation de la liste des options -->
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <v-avatar size="24">
              <img :src="item.raw.flag" width="40" />
            </v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>

    <!-- Champ de numéro de téléphone -->
    <v-text-field
      v-model="number"
      :label="props.label || 'Numéro de téléphone'"
      :placeholder="props.placeholder || ''"
      :disabled="disabled"
      :loading="props.loading"
      :error-messages="error"
      variant="outlined"
      density="compact"
      color="primary"
      class="w-66"
      hide-details
      prepend-inner-icon="mdi-phone"
    />
  </div>
</template>
