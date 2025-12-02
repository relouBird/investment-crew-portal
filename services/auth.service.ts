import type { AxiosResponse } from "axios";
import { request } from "~/helpers/request_axios";
import type { ServiceProps } from "~/types/common.type";
import type {
  LoginCredentialType,
  RegisterCredentialType,
  RegisterVerificationType,
  ResetVerificationType,
} from "~/types/user.type";

export default function useAuthService(): ServiceProps {
  /**
   * S'Enregistrer via les credentials...
   */
  const register = async (
    payload: RegisterCredentialType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/register`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * S'Enregistrer à partir d'un parrain via les credentials...
   */
  const registerSponsored = async (
    key:string,
    payload: RegisterCredentialType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/register/${key}`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Se connecter via les credentials...
   */
  const login = async (
    payload: LoginCredentialType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/login`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Se deconnecter...
   */
  const logout = async (): Promise<AxiosResponse> => {
    return await request(`/auth/logout`, {
      method: "post",
    });
  };

  /**
   * Ceci permet d'envoyer un email au user permet de reset son mot de passe
   */
  const sendOTP = async (payload: string): Promise<AxiosResponse> => {
    return await request(`/auth/send-otp`, {
      method: "post",
      data: {
        email: payload,
      },
    });
  };

  /**
   * Ceci permet d'envoyer un email au user dans le cas où il n'a pas reçu d'OTP
   */
  const resendOTP = async (payload: string): Promise<AxiosResponse> => {
    return await request(`/auth/resend-otp`, {
      method: "post",
      data: {
        email: payload,
      },
    });
  };

  /**
   * Ceci permet de verifier l'otp et de le connecter
   */
  const verifyOTP = async (
    payload: RegisterVerificationType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/verify-otp`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * S'Enregistrer via les credentials...
   */
  const changePassword = async (
    payload: RegisterCredentialType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/change-password`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Ceci permet de verifier l'otp et de le connecter
   */
  const resetPassword = async (
    payload: ResetVerificationType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/reset-password`, {
      method: "post",
      data: payload,
    });
  };

  /**
   * Se connecter via les credentials...
   */
  const update = async (
    id: string,
    payload: LoginCredentialType
  ): Promise<AxiosResponse> => {
    return await request(`/auth/${id}/update`, {
      method: "put",
      data: payload,
    });
  };

  return {
    register,
    registerSponsored,
    login,
    logout,
    update,
    verifyOTP,
    sendOTP,
    resendOTP,
    resetPassword,
    changePassword,
  };
}
