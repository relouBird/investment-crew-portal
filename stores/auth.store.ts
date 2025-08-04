import type { AxiosResponse } from "axios";
import useAuthService from "~/services/auth.service";
import type {
  LoginCredentialType,
  RegisterCredentialType,
  RegisterVerificationType,
  ResetVerificationType,
  User,
  UserResponse,
  UsersRegisterResponse,
} from "~/types/user.type";

type StateProps = {
  identifier: string;
  password: string;
  me: User | null;
  access_token: string | null;
  refresh_token: string | null;
  expired_at: number | null;
  is_registrer: boolean;
};

// le service qui gère les requetes
const service = useAuthService();

const useAuthStore = defineStore("auth-store", {
  state: () =>
    <StateProps>{
      identifier: "",
      password: "",
      me: null,
      access_token: null,
      refresh_token: null,
      expired_at: null,
      is_registrer: false,
    },
  persist: true,
  getters: {
    getIdentifier: (state) => state.identifier,
  },
  actions: {
    async login(payload: LoginCredentialType) {
      // garde d'abord les données utiles pour le login dans le state
      this.identifier = payload.email;
      console.log("identifier =>", this.identifier);

      let response: AxiosResponse = await service.login(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as UserResponse;
        console.log("data-login =>", data.data);
        if (data.verify) {
          await navigateTo("/auth/verification");
        } else {
          this.access_token = data.data.session.access_token;
          this.refresh_token = data.data.session.refresh_token;
          this.expired_at = data.data.session.expires_at * 1000;
          this.me = data.data.user;
          await navigateTo("/");
        }
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async register(payload: RegisterCredentialType) {
      this.identifier = payload.email;

      console.log("identifier =>", this.identifier);

      let response: AxiosResponse = await service.register(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as UsersRegisterResponse;
        console.log("data-register =>", data.data);
        this.password = data.data.password;
        this.is_registrer = true;
        await navigateTo("/auth/verification");
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async verifyOTP(otp_code: string) {
      let payload: RegisterVerificationType = {
        email: this.identifier,
        password: this.password,
        otp: otp_code,
      };
      let response: AxiosResponse = await service.verifyOTP(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as UserResponse;
        console.log("data-verify =>", data.data);
        this.password = "";
        this.is_registrer = false;
        this.access_token = data.data.session.access_token;
        this.refresh_token = data.data.session.refresh_token;
        this.expired_at = data.data.session.expires_at * 1000;
        this.me = data.data.user;
        await navigateTo("/");
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async sendOTP(email: string) {
      this.identifier = email;

      let response: AxiosResponse = await service.sendOTP(email);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as any;
        console.log("data-income =>", data.data);
      } else if (response.status == 500 || response.status == 404) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async resendOTP() {
      console.log("identifier =>", this.identifier);

      let response: AxiosResponse = await service.resendOTP(this.identifier);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as any;
        console.log("FOU2");
        console.log("data-income =>", data.data);
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async resetPassword(otp: string) {
      let payload: ResetVerificationType = {
        email: this.identifier,
        otp,
      };

      let response: AxiosResponse = await service.resetPassword(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as any;
        console.log("data-reset-password =>", data.data);
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async changePassword(payload: RegisterCredentialType) {
      let response: AxiosResponse = await service.changePassword(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as UserResponse;
        console.log("data-login =>", data.data);
        this.access_token = data.data.session.access_token;
        this.refresh_token = data.data.session.refresh_token;
        this.expired_at = data.data.session.expires_at * 1000;
        this.me = data.data.user;
        await navigateTo("/");
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async signOut() {
      // Ne jamais l'appeler dans le middleware cause des erreurs inattendus en vide le localstorage meme avant utilisation...
      // this is for signout user....

      this.access_token = null;
      this.refresh_token = null;
      this.expired_at = null;
      this.me = null;
      return navigateTo("/auth/login");
    },
  },
});

export default useAuthStore;
