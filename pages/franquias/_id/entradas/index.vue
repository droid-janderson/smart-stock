<!-- eslint-disable-next-line vue/no-v-html -->
<template>
  <v-container class="pt-0">
    <v-toolbar color="tertiary" class="mb-2 font-weight-bold align-center">
      <v-toolbar-title
        class="text-h6 font-weight-medium d-flex align-center"
        :style="{ color: $vuetify.theme.currentTheme.primary }"
      >
        <v-icon color="primary" dark class="mr-1">mdi-history</v-icon>
        Histórico de entradas
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="toPush"
        ><v-icon>mdi-plus</v-icon> Nova Entrada</v-btn
      >
    </v-toolbar>

    <!-- Tabela de entrada -->
    <v-simple-table
      fixed-header
      height="74vh"
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
          <tr v-for="item in inputsData" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td class="text-center">{{ item.unitPrice }}</td>
            <td class="text-center">{{ item.stockValue }}</td>
            <td>{{ item.unitType }}</td>
            <td class="text-center">{{ item.stockQuantity }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Inputs",
  data() {
    return {
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
      ],
    };
  },

  computed: {
    ...mapGetters("inputs", ["inputsData"]),
    ...mapGetters("franchises", ["franchiseId"]),
  },

  async created() {
    await this.getInputs();
  },

  methods: {
    ...mapActions("inputs", ["getInputs"]),
    async toPush() {
      this.$router.push(`/franquias/${this.franchiseId}/entradas/lancamento`);
    },
  },
};
</script>
