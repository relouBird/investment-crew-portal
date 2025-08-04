<script setup lang="ts">
import useAuthStore from "~/stores/auth.store";
import type { UserMetaData } from "~/types/user.type";
import useMeStore from "~/stores/me.store";
import * as yup from "yup";
import useCountryStore from "~/stores/countries.store";
import type { UpdateInfosPayload } from "~/types/me.type";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

// Composables
const meStore = useMeStore();
const countriesStore = useCountryStore();

const loading = ref<boolean>(false);

//Variables utiles
const userSettings = ref(meStore.getMe ?? ({} as UserMetaData));

// Créer un formulaire réactif pour changer les informations de base...
const formUpdateInfos = useForm(
  // Schéma de validation Yup
  yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().min(5).max(10).required(),
    lastName: yup.string().min(5).max(10).required(),
    country: yup.string(),
    phone: yup.string(),
  }),
  {
    email: userSettings.value.email,
    firstName: userSettings.value.firstName,
    lastName: userSettings.value.lastName,
    country: userSettings.value.country,
    phone: userSettings.value.phone,
  }
);
const codeValue = ref<string>();

// Méthodes...

const saveAccountSettings = async () => {
  loading.value = true;

  try {
    const response = await formUpdateInfos.submit(
      async () => await meStore.updateUserInfos(formUpdateInfos.data as UpdateInfosPayload)
    );
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => codeValue.value,
  (valueCode) => {
    formUpdateInfos.data.country = countriesStore.getCountryFromCode(
      valueCode ?? ""
    );

    console.log("actual-code =>", valueCode);
    console.log("actual-country =>", formUpdateInfos.data.country);
    console.log("actual-phone =>", formUpdateInfos.data.phone);
  }
);
</script>

<template>
  <v-card class="mb-6" elevation="0" border rounded="lg">
    <v-card-title class="text-h6 font-weight-bold font-montserrat mb-3">
      <v-icon left>mdi-account</v-icon>
      Informations du compte
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="saveAccountSettings">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formUpdateInfos.data.firstName"
              :error-messages="formUpdateInfos.errors.firstName"
              @change="formUpdateInfos.validateField('firstName')"
              label="Prénom"
              variant="outlined"
              density="compact"
              color="primary"
              class="mb-0"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formUpdateInfos.data.lastName"
              :error-messages="formUpdateInfos.errors.lastName"
              @change="formUpdateInfos.validateField('lastName')"
              label="Nom"
              variant="outlined"
              density="compact"
              color="primary"
              class="mb-0"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formUpdateInfos.data.email"
              :error-messages="formUpdateInfos.errors.email"
              @change="formUpdateInfos.validateField('email')"
              label="Email"
              type="email"
              variant="outlined"
              density="compact"
              color="primary"
              class="mb-0"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <UiNumberPhone
              v-model="formUpdateInfos.data.phone"
              v-model:model-code-value="codeValue"
            />
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          :disabled="
            (formUpdateInfos.isInValid instanceof Object
              ? formUpdateInfos.isInValid.value
              : formUpdateInfos.isInValid) ||
            (formUpdateInfos.processing instanceof Object
              ? formUpdateInfos.processing.value
              : formUpdateInfos.processing)
          "
          :loading="loading"
          color="primary"
          class="mt-6"
        >
          <v-icon left>mdi-content-save</v-icon>
          Sauvegarder
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
