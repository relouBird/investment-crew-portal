import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import useSponsoringService from "~/services/sponsoring.service";
import type {
  SponsoringModel,
  SponsoringModelResponse,
} from "~/types/sponsoring.type";

interface State {
  items: SponsoringModel[];
  sponsorCount: number;
  count: number;
}

// le service qui gère les requetes
const service = useSponsoringService();

const useSponsoringStore = defineStore("sponsoring-store", {
  persist: {
    storage: {
      getItem: (key) => useCookie(key).value ?? null,
      setItem: (key, value) => (useCookie(key).value = value),
    },
  },
  state: (): State => ({
    items: [],
    sponsorCount: 0,
    count: 0,
  }),

  getters: {
    getBets: (state) => state.items,
    getCount: (state) => state.count,
  },

  actions: {
    // Recuperer tous les paris...
    async fetch() {
      const response = service.fetch && (await service.fetch({}));
      if (response.status === 200) {
        this.items = [];
        const datas = response.data as SponsoringModelResponse;
        this.items = datas.data;
        this.sponsorCount = this.items.length;

        console.log("sponsoring-store =>", this.items);
      } else {
        console.log("sponsoring-store =>", this.items);
      }
      return response;
    },

    increment() {
      this.count++;
    },
  },
});

export default useSponsoringStore;
