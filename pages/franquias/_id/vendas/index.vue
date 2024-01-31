<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar color="tertiary" class="mb-2 font-weight-bold align-center">
      <v-toolbar-title
        class="text-h6 font-weight-medium d-flex align-center"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-chart-box</v-icon>
        Vendas
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="toPush"
        ><v-icon class="mr-2">mdi-basket</v-icon> Nova Venda</v-btn
      >
    </v-toolbar>

    <!-- Simple table -->
    <v-simple-table
      fixed-header
      height="75vh"
      :style="{
        backgroundColor: $vuetify.theme.currentTheme.tertiary,
        color: $vuetify.theme.currentTheme.text_primary,
      }"
      class="elevation-8"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <template v-for="item in headers">
              <th
                :key="item.text"
                :style="{
                  backgroundColor: $vuetify.theme.currentTheme.tertiary,
                  color: $vuetify.theme.currentTheme.text_tertiary,
                }"
                :class="item.center ? 'text-center' : 'text-left'"
              >
                {{ item.text }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in salesData" :key="item.id">
            <td>{{ item.sale.name }}</td>
            <td>{{ item.sale.saleDate }}</td>
            <td>{{ item.sale.totalPrice }}</td>
            <td class="text-center">{{ item.sale.products.length }}</td>
            <td class="text-center">
              <v-btn color="secondary" rounded @click="toPushOutput"
                >Mais Detalhes</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Products",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Cliente",
          value: "name",
          center: false,
        },
        { text: "Data de venda", value: "saleDate", center: false },
        { text: "Valor total", value: "totalPrice", center: false },
        { text: "Total de produtos", value: "", center: true },
        { text: "Detalhes da venda", value: "", center: true },
      ],
      details: null,
    };
  },

  computed: {
    ...mapGetters("sales", ["salesData"]),
    ...mapGetters("franchises", ["franchiseId"]),
  },

  async created() {
    await this.getSales();

    console.log(this.salesData);
  },

  methods: {
    ...mapActions("sales", ["getSales"]),

    openModal(item) {
      this.dialog = true;

      console.log(item);
      this.details = item;
    },
    async toPush() {
      try {
        this.$router.push(`/franquias/${this.franchiseId}/realizar-venda`);
      } catch (error) {
        console.error(error);
      }
    },
    async toPushOutput() {
      try {
        this.$router.push(`/franquias/${this.franchiseId}/saidas`);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
