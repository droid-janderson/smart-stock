import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Smart Stock",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/Smart Stock Logo - icon.png",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/scrollbar.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/firebase
    "@nuxtjs/firebase",
  ],

  router: {
    middleware: ["auth", "franchise"],
  },
  // router: {
  //   middleware: ["getFranquia"],
  // },

  firebase: {
    config: {
      apiKey: "AIzaSyCnJ9saZ2nNxPXtzJxA-WLR17ut2CI83Io",
      authDomain: "smart-stock-tcc.firebaseapp.com",
      projectId: "smart-stock-tcc",
      storageBucket: "smart-stock-tcc.appspot.com",
      messagingSenderId: "678182597674",
      appId: "1:678182597674:web:a4bc9b093e708ad2bf3f53",
    },

    services: {
      auth: {
        persistence: "local",
      },
      firestore: true,
      storage: true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          background: "#F8F9FD",
          backgroundNav: "#022370",
          primary: "#022370",
          secondary: "#FF5252",
          tertiary: "#F8F9FD",
          text_primary: "#232323",
          text_secondary: "#F8F9FD",
          text_tertiary: "#5E5e5e",
          hover: "#DADDEB",
        },
        dark: {
          background: "#101729",
          backgroundNav: "#192340",
          primary: "#3FBC44",
          secondary: "#F87D01",
          tertiary: "#192340",
          text_primary: "#F8F9FD",
          text_secondary: "#232323",
          text_tertiary: "#C1B9B9",
          hover: "#233460",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
