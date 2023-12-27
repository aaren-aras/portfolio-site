import { defineNuxtConfig } from 'nuxt/config'; // Not needed

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Aaren Arasaratnam",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "user-scalable=yes, width=device-width, initial-scale=1, maximum-scale=5" },
        { name: "description", content: "..." }
      ]
    }
  },
  css: [
    // ~ refers to home dir, @ refers to src dir
    "/assets/scss/global.scss"
  ]
})
