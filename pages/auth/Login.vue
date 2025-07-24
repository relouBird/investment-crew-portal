<script setup lang="ts">
import * as yup from "yup";
import useAuthStore from "~/stores/auth.store";
import type { LoginCredentialType } from "~/types/user.type";

// Définir le layout à utiliser
definePageMeta({
  layout: "auth",
  middleware: "auth-default"
});

// Meta tags
useHead({
  title: "Se Connecter - InvestIA",
  meta: [{ name: "description", content: "connectez-vous sur InvestIA" }],
});

const authStore = useAuthStore();
const store = storeToRefs(authStore);

// Variables réactives
const showPassword = ref(false);
const loading = ref(false);

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
  }),
  {
    email: store.identifier.value ?? "",
  }
);

// Méthodes
const handleLogin = async () => {
  loading.value = true;

  try {
    const response = await form.submit(
      async () => await authStore.login(form.data as LoginCredentialType)
    );

    form.clear();
    form.data.password = "";
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

watch(form.data, () => {
  console.log("data =>", form.data);
});
</script>

<template>
  <div class="auth-container">
    <div class="title">
      <h2>Welcome Back!</h2>
      <p>Login with your information to continue.</p>
    </div>

    <form class="form" @submit.prevent="handleLogin">
      <div class="input-wrapper">
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
          required
        />
      </div>

      <div class="input-wrapper pb-4">
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

      <v-btn
        block
        type="submit"
        :disabled="
          (form.isInValid instanceof Object
            ? form.isInValid.value
            : form.isInValid) ||
          (form.processing instanceof Object
            ? form.processing.value
            : form.processing)
        "
        :loading="loading"
        color="primary"
        class="text-none"
        size="large"
      >
        Login
      </v-btn>
      <div class="d-flex justify-end pt-1">
        <nuxt-link
          to="/auth/forgot-password"
          class="text-decoration-none text-subtitle-1 text-primary"
          >forgot password?</nuxt-link
        >
      </div>
    </form>

    <div class="end">
      <p>
        Dont't have account ? <nuxt-link to="/auth/register">Sign Up</nuxt-link>
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

.input-wrapper {
  margin-bottom: 0.5rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.95em;
  color: rgba(0, 0, 0, 0.6);
}

.end {
  margin-top: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.95em;
}

.end a {
  color: #1e3a8a;
  text-decoration: none;
}

.end a:hover {
  text-decoration: underline;
}
</style>
