import type { AxiosResponse } from "axios";
import { getIdForRequest } from "~/helpers";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type { TransactionModel } from "~/types/transaction.type";

export default function useTransactionService(): ServiceProps {
  /**
   * Créer une Transaction
   */
  const create = async (
    transaction: TransactionModel
  ): Promise<AxiosResponse> => {
    return await request(`/transaction`, {
      method: "post",
      data: transaction,
    });
  };
  /**
   * Mettre à jour une Transaction
   */
  const update = async (
    transaction: TransactionModel
  ): Promise<AxiosResponse> => {
    const productId = getIdForRequest(transaction);
    return await request(`/transaction/${productId}`, {
      method: "patch",
      data: transaction,
    });
  };

  /**
   * Récupérer une Transaction spécifique
   */
  const find = async (
    transaction: string | TransactionModel,
    query?: Record<string, any>
  ): Promise<AxiosResponse> => {
    const productId = getIdForRequest(transaction);

    return await request(`/transaction/${productId}`, {
      method: "get",
      params: query,
    });
  };

  /**
   * Récupérer toutes les transactions
   */
  const fetch = async (query?: Record<string, any>): Promise<AxiosResponse> => {
    return await request(`/transaction`, {
      method: "get",
      params: query,
    });
  };
  return { fetch, create, update, find };
}
