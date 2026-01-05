<script lang="ts" setup>
import useAuthStore from "~/stores/auth.store";
import * as yup from "yup";

// Définir le layout à utiliser
definePageMeta({
  layout: "auth",
  middleware: "auth-default"
});

// Meta tags
useSeoHead({
  title: "Confirmation",
  subtitle: "Verification sur notre plateforme",
  forcePrefix : true,
});

//store
const authStore = useAuthStore();

// Variables réactives
const loading = ref(false);

// 🔹 Créer un formulaire réactif
const form = useForm(
  // Schéma de validation Yup
  yup.object().shape({
    otp: yup
      .string()
      .min(6, "Password is too weak")
      .max(6)
      .required("OTP is required"),
  })
);

// Méthodes
const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await form.submit(
      async () => await authStore.verifyOTP(form.data.otp)
    );

    form.clear();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const resendOTP = async () => {
  try {
    await authStore.resendOTP();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="title">
      <h2>Fine, You're on Investia !</h2>
      <p>Please enter your otp code for completion</p>
    </div>
    <form class="form" @submit.prevent="handleLogin">
      <v-otp-input
        type="number"
        :error-messages="form.errors.otp"
        v-model="form.data.otp"
        @change="form.validateField('otp')"
        max-width="360px"
        class="mb-2"
        height="80px"
        length="6"
        rounded="md"
      />

      <v-btn
        type="submit"
        color="primary"
        class="text-none mt-4"
        block
        :loading="loading"
      >
        Verify
      </v-btn>
      <div class=""></div>
    </form>

    <button
      @click="resendOTP"
      class="text-none text-end py-0 text-primary cursor-pointor"
    >
      resend otp-code ?
    </button>

    <div class="end mt-2">
      <p class="">
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
  margin-bottom: 1rem;
  text-align: center;
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

.end a {
  color: #1e3a8a;
  text-decoration: none;
}

.end a:hover {
  text-decoration: underline;
}
</style>
