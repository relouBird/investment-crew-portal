import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  //...
  build: {
    transpile: ["vuetify"],
  },

  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: ["pinia-plugin-persistedstate"],
    },
  },

  pinia: {
    storesDirs: ["./stores/**"], // Chemin vers vos stores
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "ico", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "use-credentials",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600&display=swap",
        },
      ],
    },
  },

  css: [
    // Votre fichier CSS global
    "@/assets/css/main.css",
  ],

  // Ajoutez ceci si vous rencontrez des problèmes de SSR avec Vuetify
  ssr: false,

  compatibilityDate: "2025-05-28",

  runtimeConfig: {
    // The private keys which are only available within server-side
    API_HOST: process.env.API_HOST,
    API_BASE_URI: process.env.API_BASE_URI,

    // Keys within public, will be also exposed to the client-side
    public: {
      /**
       * Ajout d'une config publique pour l'activer/désactiver
       * la persistance du state dans un store
       */
      persistStore: true,

      APP_NAME: process.env.APP_NAME,
      API_HOST: process.env.API_HOST,
      API_BASE_URI: process.env.API_BASE_URI,
      API_BASE_URL: process.env.API_BASE_URL,
      AUTH_TOKEN_EXPIRED_AT: process.env.AUTH_TOKEN_EXPIRED_AT,
    },
  },
});
