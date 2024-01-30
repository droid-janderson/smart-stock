<template>
  <v-app
    :style="{
      minHeight: '100vh',
      backgroundColor:
        title === 'index'
          ? $vuetify.theme.themes.dark.background
          : $vuetify.theme.currentTheme.background,
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
          <div style="width: 28px">
            <img
              style="width: 100%"
              src="../assets/img/Smart Stock Logo - white.png"
            />
          </div>
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
      <div
        v-if="title === 'franquias'"
        style="width: 168px"
        class="d-flex align-center"
      >
        <img
          v-if="darkTheme"
          style="width: 100%"
          src="../assets/img/Smart Stock Logo - dark.png"
        />
        <img
          v-else
          style="width: 100%"
          src="../assets/img/Smart Stock Logo - light.png"
        />
      </div>
      <v-toolbar-title
        v-else
        class="text-capitalize text-h5 font-weight-medium"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        {{ franchiseData ? franchiseData.name : "" }}
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom color="backgroundNav">
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
      <v-menu rounded="10" bottom offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom color="backgroundNav">
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                icon
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <span>Menu</span>
          </v-tooltip>
        </template>

        <v-list dark rounded color="backgroundNav">
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in itemsMenu"
              :key="i"
              id="menuItem"
              inactive
              @click="pushRoute(item)"
            >
              <v-list-item-action class="mr-1">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container style="max-width: 1200px">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
          icon: "mdi-basket",
          title: "Realizar venda",
          to: "/realizar-venda",
        },
        {
          icon: "mdi-chart-box",
          title: "Vendas",
          to: "/vendas",
        },
        {
          icon: "mdi-cart-plus",
          title: "Entradas",
          to: "/entradas",
        },
        {
          icon: "mdi-cart-arrow-right",
          title: "Saídas",
          to: "/saidas",
        },
      ],
      itemsMenu: [
        { icon: "mdi-store", title: "Minhas Franquias", path: "/franquias" },
        { icon: "mdi-logout", title: "Sair" },
      ],
      miniVariant: false,
    };
  },
  watch: {
    $nuxt: {
      handler(val) {
        this.loading = val.isFetching;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("franchises", ["franchiseData"]),
    title() {
      return this.$route.name;
    },
    idFranchise() {
      return this.$store.state.franchises.idFranchise;
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

    async pushRoute(item) {
      if (item.title.toLowerCase() === "sair") {
        await this.logout();
        this.$router.push("/");
      } else {
        this.$router.push(item.path);
      }
    },
  },
};
</script>
<style scoped>
#menuItem {
  cursor: pointer;
  transition: background 0.5s ease-in-out;
}

#menuItem:hover {
  background: #f8f9fd4d;
}
</style>
