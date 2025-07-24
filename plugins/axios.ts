// plugins/axios.ts
import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { public: publicRuntimeConfig } = useRuntimeConfig();

  const instance = axios.create({
    baseURL: publicRuntimeConfig.API_BASE_URL || "http://localhost:3000",
    method :  "get",
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
