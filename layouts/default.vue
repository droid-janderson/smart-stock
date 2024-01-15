<template>
  <v-app
    :style="{
      minHeight: '100vh',
      backgroundColor:
        darkTheme && title !== 'index'
          ? '#101729'
          : !darkTheme && title !== 'index'
          ? '#F8F9FD'
          : '#101729',
    }"
  >
    <v-navigation-drawer
      v-if="title != 'index' && title != 'franquias'"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="backgroundNav"
      width="200"
      fixed
      permanent
      app
    >
      <v-list-item dark>
        <v-list-item-content class="mt-2">
          <v-list-item-title class="text-h6 text-center">
            <v-icon large class="mr-1">mdi-package-variant-closed</v-icon>
            Smart Stock
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dark rounded>
        <v-list-item-group color="secondary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="'/franquias/' + idFranchise + item.to"
            router
            exact
          >
            <v-list-item-action class="mr-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="title != 'index'"
      color="background"
      class="font-weight-bold align-center"
      fixed
      app
    >
      <v-toolbar-title
        v-if="title === 'franquias'"
        class="text-capitalize"
        :style="{ color: darkTheme ? '#3FBC44' : '#022370' }"
      >
        <v-icon large color="primary" dark class="mr-1"
          >mdi-package-variant-closed</v-icon
        >
        Smart Stock
      </v-toolbar-title>
      <v-toolbar-title
        v-else
        class="text-capitalize"
        :style="{ color: darkTheme ? '#3FBC44' : '#022370' }"
      >
        {{ franchise ? franchise.name : "" }}
      </v-toolbar-title>
      <v-spacer />

      <v-tooltip bottom :color="darkTheme ? 'secondary' : 'primary'">
        <template #activator="{ on }">
          <v-btn v-on="on" icon @click="toggleTheme((darkTheme = !darkTheme))">
            <v-icon :color="darkTheme ? 'secondary' : 'primary'">
              {{
                darkTheme
                  ? "mdi-white-balance-sunny"
                  : "mdi-moon-waxing-crescent"
              }}
            </v-icon>
          </v-btn>
        </template>
        <span>Mudar tema</span>
      </v-tooltip>
      <v-btn icon @click="logoutUser">
        <v-icon color="secondary">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DefaultLayout",
  middleware: ["auth"],
  data() {
    return {
      clipped: false,
      darkTheme: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-cart",
          title: "Produtos",
          to: "/produtos",
        },
        {
          icon: "mdi-store",
          title: "Franquias",
          to: "/franquias",
        },
        {
          icon: "mdi-chart-box",
          title: "Vendas",
          to: "/vendas",
        },
        {
          icon: "mdi-shopping",
          title: "Realizar venda",
          to: "/realizar-venda",
        },
        {
          icon: "mdi-cart-arrow-right",
          title: "Entradas",
          to: "/entradas",
        },
        {
          icon: "mdi-truck",
          title: "Saídas",
          to: "/saidas",
        },
      ],
      miniVariant: false,
    };
  },
  computed: {
    title() {
      return this.$route.name;
    },
    idFranchise() {
      return this.$store.state.franchises.idFranchise;
    },
    franchise() {
      return this.$store.state.franchises.franchiseData;
    },
  },

  methods: {
    ...mapActions("auth", ["logout"]),

    toggleTheme(value) {
      if (value == false) {
        localStorage.removeItem("dark");
        this.$vuetify.theme.dark = false;
      } else {
        localStorage.setItem("dark", "yes");
        this.$vuetify.theme.dark = true;
      }
    },

    async logoutUser() {
      await this.logout();
      this.$router.push("/");
      console.log("User logout completed");
    },
  },
};
</script>
