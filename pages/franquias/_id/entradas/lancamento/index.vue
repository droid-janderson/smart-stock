<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar class="mb-1" color="tertiary">
      <v-toolbar-title
        class="text-capitalize text-h6 font-weight-medium"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-cart-plus</v-icon>
        Nova entrada
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addProduct"
        >Lançar produtos<v-icon class="ml-1">mdi-rocket</v-icon></v-btn
      >
    </v-toolbar>
    <v-card width="100%" color="tertiary" elevation="2" class="mb-2">
      <v-form v-model="validate.valid">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-autocomplete
                :items="productsData"
                item-text="name"
                return-object
                v-model="product"
                background-color="background"
                outlined
                dense
                label="Produto"
                clearable
                hide-details
                class="elevation-1"
                required
              ></v-autocomplete>
            </v-col>
            <v-col v-if="product?.perishable" cols="3">
              <v-menu
                v-model="active"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="260px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="productPerishable.expirationDate"
                    label="Data de vencimento"
                    dense
                    outlined
                    readonly
                    hide-details
                    class="elevation-1"
                    v-on="on"
                    @click:append="active = true"
                  >
                    <template v-slot:append>
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="productPerishable.expirationDate"
                  color="secondary"
                  no-title
                  scrollable
                  @input="active = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="productDTO.stockQuantity"
                background-color="background"
                outlined
                dense
                label="Quantidade"
                hide-details
                class="elevation-1"
                required
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-card-actions class="mr-4">
              <v-btn color="secondary" @click="addProduct"
                ><v-icon>mdi-plus</v-icon> Adicionar</v-btn
              >
            </v-card-actions>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <!-- Simple table -->
    <v-simple-table
      fixed-header
      height="64vh"
      :style="{
        backgroundColor: $vuetify.theme.currentTheme.tertiary,
        color: $vuetify.theme.currentTheme.text_primary,
      }"
      class="elevation-2"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <template v-for="item in headers">
              <th
                v-if="item.value !== 'action'"
                :key="item.text"
                :style="{
                  backgroundColor: $vuetify.theme.currentTheme.tertiary,
                  color: $vuetify.theme.currentTheme.text_tertiary,
                }"
                :class="item.center ? 'text-center' : 'text-left'"
              >
                {{ item.text }}
              </th>
              <th
                v-else
                :key="item.text"
                :style="{
                  backgroundColor: $vuetify.theme.currentTheme.tertiary,
                  color: $vuetify.theme.currentTheme.text_tertiary,
                }"
                :class="item.center ? 'text-center' : 'text-left'"
              >
                <v-icon>{{ item.text }}</v-icon>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productsInput" :key="item.name">
            <td>{{ item.stockId }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td class="text-center">{{ item.unitPrice }}</td>
            <td class="text-center">{{ item.stockValue }}</td>
            <td>{{ item.unitType }}</td>
            <td class="text-center">{{ item.stockQuantity }}</td>
            <td class="text-center">
              <v-icon
                color="secondary"
                size="26"
                style="cursor: pointer"
                @click="removeProduct(item)"
                >mdi-delete</v-icon
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
      active: false,
      headers: [
        {
          text: "ID de estoque",
          value: "stockId",
          center: false,
        },
        {
          text: "Nome",
          value: "name",
          center: false,
        },
        { text: "Categoria", value: "category", center: false },
        { text: "Preço unitário", value: "unitPrice", center: true },
        { text: "Valor do estoque", value: "stockValue", center: true },
        { text: "Unidade", value: "unitType", center: false },
        { text: "Quantidade", value: "stockQuantity", center: true },
        { text: "mdi-function", value: "action", center: true },
      ],
      itemsSelect: ["Unidade", "Quilogramas", "Litros", "Centímetro", "Caixa"],
      validate: {
        valid: false,
        firstname: "",
        lastname: "",
        nameRules: [
          (v) => !!v || "Name is required",
          (v) => v.length <= 10 || "Name must be less than 10 characters",
        ],
        email: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
      },
      productPerishable: {
        expirationDate: null,
      },
      product: null,
      productDTO: {
        stockQuantity: 0,
      },
      products: [],
    };
  },

  computed: {
    ...mapGetters("products", ["productsData"]),
    productsInput() {
      return this.products;
    },
  },

  async created() {
    await this.getProducts();
  },

  methods: {
    ...mapActions("products", ["getProducts", "saveProduct"]),
    async addProduct() {
      const { stockQuantity } = this.productDTO;

      this.product.stockQuantity = stockQuantity;

      this.products.push(this.product);

      console.log(this.products);
    },

    removeProduct(item) {
      const indice = this.products.indexOf(item);

      if (indice !== -1) {
        this.products.splice(indice, 1);
      }
    },

    // async addProduct() {
    //   try {
    //     await this.saveProduct(this.product);
    //     this.product = {
    //       stockId: "",
    //       name: "",
    //       category: "",
    //       unitPrice: "",
    //       stockValue: "",
    //       unitType: "",
    //       perishable: false,
    //       stockQuantity: 0,
    //       minimumQuantity: 0,
    //       discontinued: false,
    //     };

    //     this.dialog = false;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },
};
</script>
