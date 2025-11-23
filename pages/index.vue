<script lang="ts" setup>
import transactionComposable from "~/composables/transaction-handler";
import useAuthStore from "~/stores/auth.store";
import useMeStore from "~/stores/me.store";
import useTransactionStore from "~/stores/transaction.store";
import useWalletStore from "~/stores/wallet.store";
import type { TransactionModel } from "~/types/transaction.type";

// Définir le layout à utiliser
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

// Meta tags
useHead({
  title: "Bienvenue - InvestIA",
  meta: [{ name: "description", content: "Bienvenue sur InvestIA" }],
});

//store
const authStore = useAuthStore();
const meStore = useMeStore();
const walletStore = useWalletStore();
const transactionStore = useTransactionStore();

const transactions = computed(() =>
  transactionStore.getTransactions
    ? transactionStore.getTransactions
    : ([] as TransactionModel[])
);

const { evolution, transactionStats } = transactionComposable(transactions);

// data reactive
const funds = computed(() => walletStore.getWallet?.funds ?? 0);
const growth = computed(() =>
  evolution.value.isPositive
    ? evolution.value.percentage
    : "-" + evolution.value.percentage
);
const wins = computed(() => transactionStats.value.totalWins ?? 0);

onMounted(() => {
  console.log("me =>", authStore.me?.user_metadata);
});

const loadTransactions = async () => {
  try {
    await transactionStore.fetch();
  } catch (e) {
  } finally {
  }
};

onMounted(async () => {
  // load les transactions
  await loadTransactions();
});
</script>

<template>
  <v-row>
    <!---Congratulation card---->
    <v-col cols="12" sm="12" lg="8">
      <UiCongratulationCard
        :funds="funds"
        :name="meStore.getMe?.firstName ?? ''"
        :growth="growth"
      />
    </v-col>
    <!---Purchase / Total earnings---->
    <v-col cols="12" sm="12" lg="4">
      <UiTotalEarnings :funds="wins" />
    </v-col>

    <!---Referral Invite Component---->
    <v-col cols="12" sm="12" lg="4">
      <UiReferralInvite />
    </v-col>
    <!---Product performence---->
    <v-col cols="12" sm="12" lg="8">
      <!-- <UiProductPerformance /> -->
    </v-col>
  </v-row>

  <!-- <div class="auth-container">
    <div class="title">
      <h2>Welcome on Investia !</h2>
      <p>This is the most simple investment plateforms</p>
      <v-btn
        block
        color="primary"
        class="text-none mt-5"
        @click="authStore.signOut"
        >Logout</v-btn
      >
    </div>
  </div> -->
</template>

<style scoped>
.auth-container {
  width: 100%;
}

.title {
  margin-bottom: 2rem;
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

.input {
  margin-bottom: 1.5rem;
}

.input label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95em;
}

.input input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: border-color 0.3s;
}

.input input:focus {
  border-color: #1e3a8a;
  outline: none;
}

.login button {
  width: 100%;
  padding: 0.75rem;
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login button:hover {
  background-color: #1e3a8a;
}

.end {
  margin-top: 1.5rem;
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
