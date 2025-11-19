import type { AxiosResponse } from "axios";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type { RefillWalletType } from "~/types/wallet.type";

export default function useWalletService(): ServiceProps {
  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const fetch = async (): Promise<AxiosResponse> => {
    return await request(`/wallet`, {
      method: "get",
    });
  };

  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const refill = async (payload: RefillWalletType): Promise<AxiosResponse> => {
    return await request(`/wallet/refill-account`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Recuperer juste le portefeuille de la personne...
   */
  const withdrawal = async (
    payload: RefillWalletType
  ): Promise<AxiosResponse> => {
    return await request(`/wallet/withdraw-account`, {
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
  return { fetch, refill, withdrawal, check };
}
