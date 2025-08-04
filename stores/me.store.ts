import type { AxiosResponse } from "axios";
import useMeService from "~/services/me.service";
import type {
  ChangePasswordPayload,
  MeResponse,
  UpdateInfosPayload,
} from "~/types/me.type";
import type { UserMetaData } from "~/types/user.type";

type StateProps = {
  email: string;
  user: UserMetaData | null;
};

// le service qui gère les requetes
const service = useMeService();

const useMeStore = defineStore("me-store", {
  state: () =>
    <StateProps>{
      email: "",
      user: null,
    },
  persist: true,
  getters: {
    getMe: (state) => state.user,
  },
  actions: {
    async getMeData() {
      let response: AxiosResponse = await service.getMe();

      if (response.status == 200 || response.status == 201) {
        let data = response.data as MeResponse;
        console.log("data-getted-message =>", data.message);
        this.email = data.email;
        this.user = data.data;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    setMeData(data: UserMetaData, email: string) {
      this.email = email;
      this.user = data;
    },

    async updateUserInfos(payload: UpdateInfosPayload) {
      const payloadToUse: UserMetaData = {
        ...(this.user as UserMetaData),
        ...payload,
      };
      let response: AxiosResponse = await service.updateInfos(payloadToUse);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as MeResponse;
        console.log("data-getted-message =>", data.message);
        this.user = data.data;
        this.email = data.email;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async changePassword(payload: ChangePasswordPayload) {
      let response: AxiosResponse = await service.changePassword(payload);

      if (response.status == 200 || response.status == 201) {
        let data = response.data as MeResponse;
        console.log("data-getted-message =>", data.message);
        this.user = data.data;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async deleteAccount() {
      let response: AxiosResponse = await service.deleteAccount();

      if (response.status == 200 || response.status == 201) {
        let data = response.data as MeResponse;
        console.log("data-getted-message =>", data.message);
        this.email = data.email;
        this.user = data.data;
      } else if (response.status == 500) {
        console.log("error =>", response.data);
      }

      return response;
    },

    async clearMeData() {
      this.email = "";
      this.user = null;
    },
  },
});

export default useMeStore;
