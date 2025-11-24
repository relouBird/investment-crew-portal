import type { AxiosResponse } from "axios";
import { getIdForRequest } from "~/helpers";
import { request } from "~/helpers/request_axios";
import type { BetModel, MatchModel } from "~/types/bet.type";
import type { ServiceProps } from "~/types/common.type";

export default function useBetService(): ServiceProps {
  /**
   * Créer un Pari
   */
  const create = async (bet: BetModel): Promise<AxiosResponse> => {
    return await request(`/bets`, {
      method: "post",
      data: bet,
    });
  };
  /**
   * Mettre à jour un Pari
   */
  const update = async (bet: BetModel): Promise<AxiosResponse> => {
    const productId = getIdForRequest(bet);
    return await request(`/bets/${productId}`, {
      method: "patch",
      data: bet,
    });
  };

  /**
   * Récupérer un Pari spécifique
   */
  const find = async (
    bet: string | BetModel,
    query?: Record<string, any>
  ): Promise<AxiosResponse> => {
    const productId = getIdForRequest(bet);

    return await request(`/bets/${productId}`, {
      method: "get",
      params: query,
    });
  };

  /**
   * Récupérer tous les paris
   */
  const fetch = async (query?: Record<string, any>): Promise<AxiosResponse> => {
    return await request(`/bets`, {
      method: "get",
      params: query,
    });
  };

  /* Récupérer un produit spécifique
   */
  const remove = async (bet: string): Promise<AxiosResponse> => {
    return await request(`/bets/${bet}`, {
      method: "delete",
    });
  };

  /*
    Recuperer tout les matchs...
  */
  const fetchAll = async (): Promise<AxiosResponse> => {
    return await request(`/bets/matches`, {
      method: "get",
    });
  };

  return {
    fetch,
    fetchAll,
    create,
    update,
    find,
    remove,
  };
}
