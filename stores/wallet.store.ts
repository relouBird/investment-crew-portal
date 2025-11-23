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
        transaction_number: "+237670000000",
        service: "cm.mtn",
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
      let response: AxiosResponse = await service.withdrawal(payload);

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

    // async checkTransactionState(id: string) {
    //   let isFinish: boolean = false;
    //   let response: AxiosResponse = await service.check(id);

    //   if (response.status == 200 || response.status == 201) {
    //     let data = response.data as TransactionResponse;
    //     console.log("data-transaction-getted-message =>", data.message);
    //     if (data.transaction.status == "done") {
    //       this.wallet = { ...this.wallet, ...data.wallet };
    //       isFinish = true;
    //     } else if (data.transaction.status == "failed") {
    //       // Ceci envoie la notification directement dans le store de notifications mais àa partir du helpers
    //       notify({
    //         color: "error",
    //         message: "The Transaction has failed...",
    //         visible: true,
    //       });
    //       isFinish = true;
    //     }
    //   } else if (response.status == 500) {
    //     console.log("error =>", response.data);
    //   } else {
    //     console.log("error =>", response.data);
    //   }

    //   return { state: isFinish, response };
    // },
  },
});

export default useWalletStore;
