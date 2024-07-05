// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  css: ['~/assets/css/main.css'],
  shadcn: {
    /**
     * @see https://www.shadcn-vue.com/docs/installation/nuxt.html
     */
    componentDir: './components/ui',
  },
  compatibilityDate: '2024-07-04',
});
