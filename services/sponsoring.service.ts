import type { AxiosResponse } from "axios";
import { getIdForRequest } from "~/helpers";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type { SponsoringModel } from "~/types/sponsoring.type";

export default function useSponsoringService(): ServiceProps {
  /**
   * Créer une Transaction
   */
  const create = async (
    transaction: SponsoringModel
  ): Promise<AxiosResponse> => {
    return await request(`/sponsoring`, {
      method: "post",
      data: transaction,
    });
  };
  /**
   * Mettre à jour une Transaction
   */
  const update = async (
    transaction: SponsoringModel
  ): Promise<AxiosResponse> => {
    const productId = getIdForRequest(transaction);
    return await request(`/sponsoring/${productId}`, {
      method: "patch",
      data: transaction,
    });
  };

  /**
   * Récupérer une Transaction spécifique
   */
  const find = async (
    transaction: string | SponsoringModel,
    query?: Record<string, any>
  ): Promise<AxiosResponse> => {
    const productId = getIdForRequest(transaction);

    return await request(`/sponsoring/${productId}`, {
      method: "get",
      params: query,
    });
  };

  /**
   * Récupérer toutes les transactions
   */
  const fetch = async (query?: Record<string, any>): Promise<AxiosResponse> => {
    return await request(`/sponsoring`, {
      method: "get",
      params: query,
    });
  };
  return { fetch, create, update, find };
}
