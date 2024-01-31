<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar color="tertiary" class="mb-2 font-weight-bold align-center">
      <v-toolbar-title
        class="text-h6 font-weight-medium d-flex align-center"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-cart-arrow-right</v-icon>
        Histórico de saídas
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
          <tr v-for="item in salesProducts" :key="item.id">
            <td>{{ item.client }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.unitType }}</td>
            <td class="text-center">{{ item.stockOutput }}</td>
            <td>{{ item.totalPriceProduct }}</td>
            <td>{{ item.saleDate }}</td>
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
      headers: [
        {
          text: "Cliente",
          value: "name",
          center: false,
        },
        {
          text: "Nome",
          value: "name",
          center: false,
        },
        {
          text: "Categoria",
          value: "category",
          center: false,
        },
        {
          text: "Unidade de Medida",
          value: "unitType",
          center: false,
        },
        { text: "Quantidade saída", value: "stockOutput", center: true },
        { text: "Valor total", value: "totalPrice", center: false },
        { text: "Data de venda", value: "saleDate", center: false },
      ],
      salesProducts: [],
    };
  },

  computed: {
    ...mapGetters("sales", ["salesData"]),
    ...mapGetters("franchises", ["franchiseId"]),
  },

  async created() {
    await this.getSales();

    this.salesData.forEach((sale) => {
      sale.sale.products.forEach((product) => {
        product.client = sale.sale.name;
        this.salesProducts.push(product);
      });
    });

    console.log(this.salesData);
  },

  methods: {
    ...mapActions("sales", ["getSales"]),
    async toPush() {
      try {
        this.$router.push(`/franquias/${this.franchiseId}/realizar-venda`);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
