export default defineNuxtConfig({
  modules: ["../src/module"],
  basicAuth: {
    enabled: true,
    users: "test:admin,test2:admin2,test3ö:admin3",
  },
  devtools: { enabled: true },
});
