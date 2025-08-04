import type { AxiosResponse } from "axios";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type {
  ChangePasswordPayload,
  UpdateInfosPayload,
} from "~/types/me.type";

export default function useMeService(): ServiceProps {
  /**
   * Recuperer juste le user...
   */
  const getMe = async (): Promise<AxiosResponse> => {
    return await request(`/me`, {
      method: "get",
    });
  };

  /**
   * Permet de changer le mot de passe de l'utilisateur......
   */
  const changePassword = async (
    payload: ChangePasswordPayload
  ): Promise<AxiosResponse> => {
    return await request(`/me/change-password`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Permet de changer le mot de passe de l'utilisateur......
   */
  const updateInfos = async (
    payload: UpdateInfosPayload
  ): Promise<AxiosResponse> => {
    return await request(`/me/update-infos`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Permet de changer le mot de passe de l'utilisateur......
   */
  const deleteAccount = async (): Promise<AxiosResponse> => {
    return await request(`/me/delete-account`, {
      method: "delete",
    });
  };

  return { getMe, changePassword, updateInfos, deleteAccount };
}
