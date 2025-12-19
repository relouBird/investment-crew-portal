import type { AxiosResponse } from "axios";
import type { Emitter } from "mitt";
import { notify } from "~/helpers/notifications";
import useWalletService from "~/services/wallet.service";
import type { EventsProps } from "~/types";
import type { TransactionResponse } from "~/types/transaction.type";
import type {
  WalletResponse,
  RefillWalletType,
  WalletModel,
  WalletTransactionInitInterface,
  WalletTransactionInitResponse,
} from "~/types/wallet.type";

type StateProps = {
  wallet: WalletModel | null;
};

// le service qui gère les requetes
const service = useWalletService();

const useWalletStore = defineStore("wallet-store", {
  state: () =>
    <StateProps>{
      wallet: null,
    },
  persist: true,
  getters: {
    getWallet: (state) => state.wallet,
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

    async refillWallet(payload: RefillWalletType) {
      let proto_payload: RefillWalletType = {
        amount: payload.amount,
        // transaction_number: "+237670000000",
        transaction_number: payload.transaction_number,
        service: payload.service,
        // service: "cm.mtn",
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
        amount: payload.amount,
        // transaction_number: "+237670000000",
        transaction_number: payload.transaction_number,
        // service: "cm.mtn",
        service: payload.service,
      };
      console.log("DATA-TO-POST=========>", proto_payload);

      let response: AxiosResponse = await service.withdrawal(proto_payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as WalletTransactionInitResponse;
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
