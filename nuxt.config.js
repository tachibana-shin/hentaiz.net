import colors from "vuetify/es5/util/colors";

export default {
  loading: {
    width: 15,
    color: "#ffffff"
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080
  },
  // Router config
  router: {
    extendRoutes(routes, resolve) {
      routes.unshift({
        name: "hentai-id-tap-chap",
        path: "/hentai/:id/tap-:chap",
        component: resolve(__dirname, "pages/hentai/_id/index")
      });
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s » HentaiZ PRO",
    htmlAttrs: {
      lang: "vi"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/axios",
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["history", "favorite"]
      }
    ],

    "@nuxtjs/robots",
    "@luxdamore/nuxt-prune-html"
  ],

  robots: {
    UserAgent: "*"
  },

  axios: {
    baseURL: process.env.API_URL
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          white: colors.grey.darken4,
          theme: "#121212",
          blackme: "#000"
        },
        light: {
          white: colors.grey.lighten5,
          theme: "#ffffff",
          blackme: "#ffffff"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
