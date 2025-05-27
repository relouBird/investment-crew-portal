// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app:{
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "icon", type: "ico", href: "/favicon.ico" },
        { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600&display=swap" },
      ],
    }
  },
  devtools: { enabled: true },
})
