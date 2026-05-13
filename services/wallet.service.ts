import type { AxiosResponse } from "axios";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type { TransactionComposableResponse } from "~/types/transaction.type";
import type { RefillWalletType } from "~/types/wallet.type";

export type AssignationServiceProps = ServiceProps & {
  /**Recuperer les details juste sur le portefeuille de la personne */
  fetchSummary: () => Promise<AxiosResponse<TransactionComposableResponse>>;
};

export default function useWalletService(): AssignationServiceProps {
  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const fetch = async (): Promise<AxiosResponse> => {
    return await request(`/wallets`, {
      method: "get",
    });
  };

  /**
   * Recuperer les details juste sur le portefeuille de la personne...
   */
  const fetchSummary = async (): Promise<AxiosResponse> => {
    return await request(`/wallets/summary`, {
      method: "get",
    });
  };

  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const refill = async (payload: RefillWalletType): Promise<AxiosResponse> => {
    return await request(`/wallets/refill-account`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const withdrawal = async (
    payload: RefillWalletType,
  ): Promise<AxiosResponse> => {
    return await request(`/wallets/withdraw-account`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Permet de checker l'etat d'une transaction...
   */
  const check = async (id: string): Promise<AxiosResponse> => {
    return await request(`/wallet/check-transaction/${id}`, {
      method: "get",
    });
  };
  return { fetch, fetchSummary, refill, withdrawal, check };
}
