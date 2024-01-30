<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar color="tertiary" class="mb-2 font-weight-bold align-center">
      <v-toolbar-title
        class="text-capitalize text-h6 font-weight-medium"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-cart</v-icon>
        Produtos
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialog = true"
        ><v-icon>mdi-plus</v-icon> Novo Produto</v-btn
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
                class="text-center"
              >
                <v-icon>{{ item.text }}</v-icon>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productsData" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td class="text-center">{{ item.unitPrice }}</td>
            <td class="text-center">{{ item.stockValue }}</td>
            <td>{{ item.unitType }}</td>
            <td class="text-center">{{ item.stockQuantity }}</td>
            <td class="text-center">{{ item.minimumQuantity }}</td>
            <td class="d-flex align-center justify-center">
              <v-switch v-model="item.discontinued" inset></v-switch>
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

    <!-- Modal add produto -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card
          :style="{ backgroundColor: $vuetify.theme.currentTheme.tertiary }"
        >
          <v-card-title>
            <span class="text-h5">Adicionar produto</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="validate.valid">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.name"
                      background-color="background"
                      outlined
                      label="Nome"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.category"
                      background-color="background"
                      outlined
                      label="Categoria do produto"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <v-select
                      :items="itemsSelect"
                      v-model="product.unitType"
                      background-color="background"
                      outlined
                      label="Unidade de Medida"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-checkbox
                      v-model="product.perishable"
                      label="Produto perecível?"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="product.unitPrice"
                      background-color="background"
                      outlined
                      label="Preço unitário"
                      prefix="R$"
                      hide-details
                      class="elevation-1"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="product.minimumQuantity"
                      background-color="background"
                      outlined
                      label="Estoque mínimo"
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
            <v-btn color="secondary" text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
              Fechar
            </v-btn>
            <v-btn color="primary" text @click="addProduct"> Salvar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
          text: "Nome",
          value: "name",
          center: false,
        },
        { text: "Categoria", value: "category", center: false },
        { text: "Preço unitário", value: "unitPrice", center: true },
        { text: "Valor do estoque", value: "stockValue", center: true },
        { text: "Unidade", value: "unitType", center: false },
        { text: "Quantidade", value: "stockQuantity", center: true },
        { text: "Quantidade Mínima", value: "minimumQuantity", center: true },
        { text: "Descontinuado?", value: "discontinued", center: true },
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
      product: {
        name: "",
        category: "",
        unitPrice: "",
        stockValue: "R$ 0.00",
        unitType: "",
        perishable: false,
        stockQuantity: 0,
        minimumQuantity: 0,
        discontinued: false,
      },
    };
  },

  computed: {
    ...mapGetters("products", ["productsData"]),
  },

  async created() {
    await this.getProducts();
  },

  methods: {
    ...mapActions("products", ["getProducts", "saveProduct", "deleteProduct"]),
    async addProduct() {
      try {
        await this.saveProduct(this.product);
        this.product = {
          name: "",
          category: "",
          unitPrice: "",
          stockValue: "R$ 0.00",
          unitType: "",
          perishable: false,
          stockQuantity: 0,
          minimumQuantity: 0,
          discontinued: false,
        };

        this.dialog = false;
      } catch (error) {
        console.error(error);
      }
    },

    async removeProduct(product) {
      try {
        await this.deleteProduct(product);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
