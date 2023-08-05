export default defineNuxtConfig({
  modules: ["../src/module"],
  basicAuth: {
    enabled: true,
  },
  devtools: { enabled: true },
});
