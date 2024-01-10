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
      v-model="drawer"
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
            :to="item.to"
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
        class="text-capitalize"
        :style="{ color: darkTheme ? '#3FBC44' : '#022370' }"
        >{{
          title === "franquias" ? "Smart Stock" : "Franquia 1"
        }}</v-toolbar-title
      >
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
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      darkTheme: false,
      fixed: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
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
      right: true,
      rightDrawer: false,
    };
  },
  computed: {
    title() {
      return this.$route.name;
    },
  },

  methods: {
    toggleTheme(value) {
      if (value == false) {
        localStorage.removeItem("dark");
        this.$vuetify.theme.dark = false;
      } else {
        localStorage.setItem("dark", "yes");
        this.$vuetify.theme.dark = true;
      }
    },
  },
};
</script>
