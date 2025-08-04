<script setup lang="ts">
import useMeStore from "~/stores/me.store";
import * as yup from "yup";

const props = defineProps<{
  modelTwoFactors: boolean;
}>();

const emit = defineEmits(["update:modelTwoFactors"]);

// Composables
const meStore = useMeStore();

// 🔹 Créer un formulaire réactif pour Changer le mot de passe...
const formChangePassword = useForm(
  // Schéma de validation Yup
  yup.object().shape({
    password: yup
      .string()
      .min(6, "Password is too weak")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contains letters and numbers"
      )
      .required("Password is required"),
    new_password: yup
      .string()
      .min(6, "Password is too weak")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contains letters and numbers"
      )
      .required("Password is required"),
    confirm_new_password: yup
      .string()
      .required()
      .oneOf([yup.ref("new_password")], "Not corresponding"),
  })
);
const loading = ref<boolean>(false);

// Méthodes...
const changePassword = async () => {
  loading.value = true;

  try {
    // do something...
    await formChangePassword.submit(
      async () => await meStore.changePassword(formChangePassword.data)
    );

    console.log("data-change-to =>", formChangePassword.data);

    formChangePassword.data.password = "";
    formChangePassword.data.new_password = "";
    formChangePassword.data.confirm_new_password = "";
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const toggleTwoFactor = (enabled: boolean) => {
  // Logic pour activer/désactiver 2FA
  console.log("Two factor authentication:", enabled);
};
</script>

<template>
  <v-card class="mb-6" elevation="0" border rounded="lg">
    <v-card-title class="text-h6 font-weight-bold font-montserrat">
      <v-icon left>mdi-security</v-icon>
      Sécurité
    </v-card-title>
    <v-card-text>
      <v-form class="pt-3" @submit.prevent="changePassword">
        <v-text-field
          label="Mot de passe actuel"
          type="password"
          variant="outlined"
          class="mb-2"
          density="compact"
          color="primary"
          :error-messages="formChangePassword.errors.password"
          v-model="formChangePassword.data.password"
          @change="formChangePassword.validateField('password')"
        ></v-text-field>
        <v-text-field
          label="Nouveau mot de passe"
          type="password"
          variant="outlined"
          class="mb-2"
          density="compact"
          color="primary"
          :error-messages="formChangePassword.errors.new_password"
          v-model="formChangePassword.data.new_password"
          @change="formChangePassword.validateField('new_password')"
        ></v-text-field>
        <v-text-field
          label="Confirmer le mot de passe"
          type="password"
          variant="outlined"
          class="mb-2"
          density="compact"
          color="primary"
          :error-messages="formChangePassword.errors.confirm_new_password"
          v-model="formChangePassword.data.confirm_new_password"
          @change="formChangePassword.validateField('confirm_new_password')"
        ></v-text-field>
        <v-btn
          color="primary"
          type="submit"
          :disabled="
            (formChangePassword.isInValid instanceof Object
              ? formChangePassword.isInValid.value
              : formChangePassword.isInValid) ||
            (formChangePassword.processing instanceof Object
              ? formChangePassword.processing.value
              : formChangePassword.processing)
          "
          :loading="loading"
        >
          <v-icon left>mdi-key</v-icon>
          Changer le mot de passe
        </v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <!-- Two Factor Authentication -->
      <div class="">
        <h3 class="text-h6 mb-3">Authentification à deux facteurs</h3>
        <v-switch
          v-model="props.modelTwoFactors"
          @update:model-value="
            emit('update:modelTwoFactors', props.modelTwoFactors)
          "
          label="Activer l'authentification à deux facteurs"
          color="primary"
          :readonly="false"
          @change="toggleTwoFactor"
        ></v-switch>
      </div>
    </v-card-text>
  </v-card>
</template>
