// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
// @ts-ignore: Vuetify styles side-effect import has no type declarations
import "vuetify/styles";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: "light",
      themes:{
        light:{
          colors:{
            primary:"#1e3a8a",
            muted: "#69707c",
          }
        }
      }
    },
    defaults: {
      VCard: {
        VCardTitle: {
          style: "font-family: Manrope; font-weight: 700;",
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
