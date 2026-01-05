<script setup lang="ts">
import * as yup from "yup";
import useAuthStore from "~/stores/auth.store";
import type { RegisterCredentialType } from "~/types/user.type";

// Définir le layout à utiliser
definePageMeta({
  layout: "auth",
  middleware: "auth-default"
});

// Meta tags
useSeoHead({
  title: "Mot de passe oublié ?",
  subtitle: "Retrouvez votre mot de passe maintenant",
  forcePrefix : true,
});

const authStore = useAuthStore();
const route = useRoute();
const store = storeToRefs(authStore);

// Variables réactives
const loading = ref(false);
const showPassword = ref(false);
const otpState = ref("step1");
const otpValue = ref("");

// 🔹 Créer un formulaire réactif
const form = useForm(
  // Schéma de validation Yup
  yup.object().shape({
    email: yup.string().email(),
    password: yup
      .string()
      .min(6, "Password is too weak")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contains letters and numbers"
      )
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Not corresponding"),
  }),
  {
    email: store.identifier.value ?? "",
  }
);

// Méthodes
const handleLogin = async () => {
  loading.value = true;
  try {
    // Simulation d'une connexion
    if (otpState.value == "step1") {
      let res = await authStore.sendOTP(form.data.email as string);
      // Ici vous ajouteriez votre logique de connexion
      console.log("Email à verifier :", form.data.email);
      if (res.status == 200 || res.status == 201) {
        otpState.value = "step2";
      }
    } else if (otpState.value == "step2") {
      if (otpValue.value.length == 6) {
        let res = await authStore.resetPassword(otpValue.value);
        // Ici vous ajouteriez votre logique de connexion
        console.log("OTP à verifier :", otpValue.value);
        if (res.status == 200 || res.status == 201) {
          otpState.value = "step3";
        }
      }
    } else {
      let res = await authStore.changePassword(
        form.data as RegisterCredentialType
      );
    }
  } catch (error) {
    console.error("Erreur de connexion:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="title">
      <h2>Forgot password!</h2>
      <p>Recover your credentials here.</p>
    </div>
    <form class="form" @submit.prevent="handleLogin">
      <div v-if="otpState == 'step1'" class="">
        <label for="password">Email</label>
        <v-text-field
          v-model="form.data.email"
          :error-messages="form.errors.email"
          @change="form.validateField('email')"
          id="email"
          type="email"
          placeholder="Email"
          variant="outlined"
          density="compact"
          class="py-1"
          color="primary"
          hide-details
        />
      </div>

      <div v-if="otpState == 'step2'">
        <v-otp-input
          type="number"
          v-model="otpValue"
          max-width="360px"
          class="mb-2"
          height="80px"
          length="6"
          rounded="md"
        />
      </div>

      <div v-if="otpState == 'step3'">
        <div class="input-wrapper pb-2">
          <label for="password">Password</label>
          <v-text-field
            :error-messages="form.errors.password"
            v-model="form.data.password"
            @change="form.validateField('password')"
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            variant="outlined"
            density="compact"
            class="py-1"
            color="primary"
            hide-details
            required
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
          />
        </div>

        <div class="input-wrapper pb-2">
          <label for="password">Confirm Password</label>
          <v-text-field
            id="confirmpassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Confirm Your password"
            :error-messages="form.errors.password_confirmation"
            v-model="form.data.password_confirmation"
            @change="form.validateField('password_confirmation')"
            variant="outlined"
            density="compact"
            color="primary"
            hide-details
            required
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
          />
        </div>
      </div>

      <v-btn
        type="submit"
        color="primary"
        class="text-none mt-4 mb-3"
        :disabled="
          otpState == 'step3' &&
          ((form.isInValid instanceof Object
            ? form.isInValid.value
            : form.isInValid) ||
            (form.processing instanceof Object
              ? form.processing.value
              : form.processing))
        "
        block
        :loading="loading"
      >
        {{
          otpState == "step1"
            ? "Verify Now"
            : otpState == "step2"
            ? "Verify OTP"
            : "Change Password"
        }}
      </v-btn>
    </form>

    <div class="end">
      <p>
        Already have account ?
        <nuxt-link to="/auth/login">Connect now</nuxt-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  width: 100%;
}

.title {
  text-align: center;
}

.title p {
  transform: translateY(-7px);
}

h2 {
  margin-bottom: 0.5rem;
}

.title p {
  color: #6b7280;
  font-size: 0.95em;
}

.form {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.95em;
  color: rgba(0, 0, 0, 0.6);
}

:deep(.custom-input .v-field__input input) {
  color: white !important;
  padding: 0 !important; /* Le padding est maintenant géré par .v-field__input */
  opacity: 1 !important; /* Assure la visibilité */
}

:deep(.custom-input .v-field__input input::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
  opacity: 1 !important;
}

:deep(.custom-input .v-field__append-inner) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.end a {
  color: #1e3a8a;
  text-decoration: none;
}

.end a:hover {
  text-decoration: underline;
}
</style>
