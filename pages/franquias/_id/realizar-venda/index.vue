<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar width="100%" class="mb-1" color="tertiary">
      <v-toolbar-title
        class="text-h6 font-weight-medium d-flex align-center"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-basket</v-icon>
        Nova venda
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openModal"
        >Realizar venda<v-icon class="ml-1">mdi-shopping</v-icon></v-btn
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
            <v-col cols="2">
              <v-text-field
                v-model="productDTO.stockQuantity"
                background-color="background"
                outlined
                dense
                label="Quantidade"
                hide-details="auto"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col v-if="product" class="d-flex align-center">
              <span
                >Estoque: {{ product.stockQuantity }}
                {{ product.unitType }}(s)</span
              >
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
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td class="text-center">{{ item.unitPrice }}</td>
            <td>{{ item.unitType }}</td>
            <td class="text-center">
              {{ item.stockOutput ? item.stockOutput : "" }}
            </td>
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

    <!-- Modal make sale -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card
          :style="{ backgroundColor: $vuetify.theme.currentTheme.tertiary }"
        >
          <v-card-title class="mb-2">
            <span class="text-h5">Dados adicionais</span>
          </v-card-title>
          <v-card-subtitle class="pb-0">
            <span class="text-subtitle-1">Preço final: {{ totalPrice }}</span>
          </v-card-subtitle>
          <v-card-text>
            <v-form v-model="validate.valid">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="sale.name"
                      background-color="background"
                      outlined
                      label="Nome do cliente"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-checkbox
                      v-model="addCPF"
                      label="Adicionar CPF?"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col v-if="addCPF" cols="6">
                    <v-text-field
                      v-model="sale.cpfClient"
                      background-color="background"
                      outlined
                      label="CPF"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="currentDate"
                      background-color="background"
                      readonly
                      outlined
                      label="Data atual"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-2"
              color="secondary"
              outlined
              rounded
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
              Fechar
            </v-btn>
            <v-btn
              class="d-flex align-center mb-2"
              color="primary"
              outlined
              rounded
              @click="save"
            >
              <v-icon class="mr-1">mdi-shopping</v-icon>
              Finalizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NewSales",
  data() {
    return {
      dialog: false,
      addCPF: false,
      headers: [
        {
          text: "Nome",
          value: "name",
          center: false,
        },
        { text: "Categoria", value: "category", center: false },
        { text: "Preço unitário", value: "unitPrice", center: true },
        { text: "Unidade", value: "unitType", center: false },
        { text: "Quantidade", value: "stockQuantity", center: true },
        { text: "mdi-function", value: "action", center: true },
      ],
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

      sale: {
        name: "",
        cpfClient: "",
      },
    };
  },

  computed: {
    ...mapGetters("products", ["productsData"]),
    ...mapGetters("franchises", ["franchiseId"]),
    productsInput() {
      return this.products;
    },
    currentDate() {
      return new Date().toLocaleDateString();
    },
    totalPrice() {
      if (this.products.length > 0) {
        const total = this.products.reduce(
          (total, objeto) =>
            total +
            parseFloat(objeto.totalPriceProduct.replace("R$", "").trim()),
          0
        );
        return `R$ ${total.toFixed(2)}`;
      }
    },
  },

  async created() {
    await this.getProducts();
  },

  methods: {
    ...mapActions("products", ["getProducts", "updatedProducts"]),
    ...mapActions("sales", ["saveSaleMade"]),
    openModal() {
      if (this.products.length > 0) {
        this.dialog = true;
      } else {
        this.$toast.error("Nenhum produto encontrado!");
      }
    },
    async save() {
      if (this.products.length > 0) {
        this.updateProductsData();
        const { name, cpfClient } = this.sale;

        this.products.forEach((product) => {
          product.saleDate = this.currentDate;
        });

        const payload = {
          sale: {
            name,
            cpfClient,
            totalPrice: this.totalPrice,
            saleDate: this.currentDate,
            products: this.products,
          },
        };

        await this.updatedProducts(this.productsData);
        await this.saveSaleMade(payload);

        this.$toast.success("Venda Realizada!", {
          position: "top-right",
          timeout: 2000,
        });
        this.$router.push(`/franquias/${this.franchiseId}/vendas`);
      } else {
        this.$toast.error("Adicione produtos!");
      }
    },

    addProduct() {
      if (this.product && this.productDTO.stockQuantity > 0) {
        const { stockQuantity } = this.productDTO;

        if (parseInt(stockQuantity) > parseInt(this.product.stockQuantity)) {
          this.$toast.error("Quantidade maior que o estoque!");
          return;
        }

        if (this.isProductExist(this.product)) {
          this.$toast.error("Produto já adicionado!");
          return;
        }

        this.product.totalPriceProduct = `R$ ${(
          stockQuantity * parseFloat(this.product.unitPrice.replace("R$", ""))
        ).toFixed(2)}`;

        this.product.stockValue = `R$ ${(
          parseFloat(this.product.stockValue.replace("R$", "")) -
          parseFloat(this.product.totalPriceProduct.replace("R$", ""))
        ).toFixed(2)}`;

        this.product.stockOutput = stockQuantity;

        this.product.stockQuantity = `${
          parseInt(this.product.stockQuantity) - parseInt(stockQuantity)
        }`;

        this.products.push(this.product);

        console.log(this.products);
        this.product = null;
        this.productDTO.stockQuantity = 0;
      } else {
        this.$toast.error("Preencha todos os campos!");
      }
    },

    isProductExist(product) {
      return this.products.some((p) => p.name === product.name);
    },

    updateProductsData() {
      this.productsData.forEach((productData) => {
        const product = this.products.find((p) => p.name === productData.name);
        if (product) {
          productData.stockQuantity = product.stockQuantity;
          productData.stockValue = product.stockValue;
        }
      });
    },

    removeProduct(item) {
      const indice = this.products.indexOf(item);

      if (indice !== -1) {
        this.products.splice(indice, 1);
      }
    },
  },
};
</script>
