export default defineNuxtConfig({
  modules: ["../src/module"],
  basicAuth: {
    enabled: true,
    users: "test:admin, test2:admin2",
  },
  devtools: { enabled: true },
});
