import type { AxiosResponse } from "axios";
import useWalletService from "~/services/wallet.service";
import type { TransactionComposableResponse } from "~/types/transaction.type";
import type {
  WalletResponse,
  RefillWalletType,
  WalletModel,
  WalletTransactionInitResponse,
} from "~/types/wallet.type";

type StateProps = {
  wallet: WalletModel | null;
  statistic: TransactionComposableResponse | null;
};

// le service qui gère les requetes
const service = useWalletService();

const useWalletStore = defineStore("wallet-store", {
  state: () =>
    <StateProps>{
      wallet: null,
    },
  persist: {
    storage: {
      getItem: (key) => useCookie(key).value ?? null,
      setItem: (key, value) => (useCookie(key).value = value),
    },
  },
  getters: {
    getWallet: (state) => state.wallet,
    getStatitics: (state) => state.statistic,
  },
  actions: {
    async getWalletData() {
      let response: AxiosResponse = service.fetch && (await service.fetch({}));

      if (response.status == 200 || response.status == 201) {
        let data = response.data as WalletResponse;
        console.log("data-getted-message =>", data.message);
        this.wallet = data.data;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      } else {
        console.log("error =>", response.data);
      }

      return response;
    },

    async getSummaryWalletData() {
      let response = service.fetchSummary && (await service.fetchSummary());

      if (response.status == 200 || response.status == 201) {
        let data = response.data;
        console.log("data-getted-user-balance =>", data.balance);
        this.statistic = data;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      } else {
        console.log("error =>", response.data);
      }

      return response;
    },

    async refillWallet(payload: RefillWalletType) {
      let proto_payload: RefillWalletType = {
        amount: Number(payload.amount),
        transaction_number: "+237670000000",
        // transaction_number: payload.transaction_number,
        service: "cm.mtn",
        // service: payload.service,
      };
      let response: AxiosResponse = await service.refill(proto_payload); // à remplacer par payload lors du build...

      if (response.status == 200 || response.status == 201) {
        let data = response.data as WalletTransactionInitResponse;
        console.log("data-getted-message =>", data.message);

        const { $emitter } = useNuxtApp();

        $emitter.emit("payment:started", {
          id: data.data.transaction_id,
          status: response.status,
        });
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      } else {
        console.log("error =>", response.data);
      }

      return response;
    },

    async withDrawal(payload: RefillWalletType) {
      let proto_payload: RefillWalletType = {
        amount: Number(payload.amount),
        transaction_number: "+237670000000",
        // transaction_number: payload.transaction_number,
        service: "cm.mtn",
        // service: payload.service,
      };
      console.log("DATA-TO-POST=========>", proto_payload);

      let response: AxiosResponse = await service.withdrawal(proto_payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as WalletTransactionInitResponse;
        this.wallet = data.data.wallet;
        console.log("data-getted-message =>", data.message);
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      } else {
        console.log("error =>", response.data);
      }

      return response;
    },
  },
});

export default useWalletStore;
