<template>
  <div class="mt-4">
    <v-row>
      <h1
        :style="{
          color: $vuetify.theme.currentTheme.text_primary,
        }"
      >
        Olá! Bem vindo ao Smart Stock
      </h1>
    </v-row>
    <v-row class="mt-4 mb-6">
      <h3
        :style="{
          color: $vuetify.theme.currentTheme.text_tertiary,
        }"
      >
        Adicione uma nova franquia e comece a gerenciar o seu estoque :)
      </h3>
    </v-row>
    <v-row class="mt-10 mb-2">
      <h2
        :style="{
          color: $vuetify.theme.currentTheme.text_primary,
        }"
      >
        Suas Franquias
      </h2>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-hover v-slot="{ hover }" open-delay="300" close-delay="200">
          <v-card
            :color="hover ? 'hover' : 'tertiary'"
            width="240"
            height="180"
            rounded="20"
            elevation="4"
            :class="{ 'on-hover': hover }"
            class="d-flex flex-column justify-center"
            style="cursor: pointer"
            @click="dialog = true"
          >
            <v-icon size="32" color="text_tertiary"> mdi-store-plus </v-icon>
            <v-card-subtitle
              :style="{ color: $vuetify.theme.currentTheme.text_tertiary }"
              class="text-center text-uppercase font-weight-medium"
              >Nova franquia</v-card-subtitle
            >
          </v-card>
        </v-hover>
      </v-col>
      <v-col v-for="item in franchisesData" :key="item.name" cols="3">
        <div style="width: 280px; position: relative">
          <v-btn
            width="42"
            height="42"
            absolute
            elevation="2"
            fab
            color="secondary"
            bottom
            right
            class="mr-4 mb-4"
            @click="openSnackbar(item)"
            ><v-icon size="24">mdi-delete</v-icon></v-btn
          >

          <v-hover v-slot="{ hover }" open-delay="300" close-delay="200">
            <v-card
              :color="hover ? 'hover' : 'tertiary'"
              width="240"
              height="180"
              elevation="4"
              style="position: relative; cursor: pointer; z-index: 1"
              :class="{ 'on-hover': hover }"
              @click="toPush(item.id)"
            >
              <v-card-title> {{ item.name }} </v-card-title>
              <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>

    <!-- Modals save and edit -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card
          :style="{ backgroundColor: $vuetify.theme.currentTheme.tertiary }"
        >
          <v-card-title>
            <span class="text-h5">Cadastro Franquia</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="franchiseDTO.name"
                    background-color="background"
                    solo
                    label="Nome"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="franchiseDTO.cnpj"
                    background-color="background"
                    solo
                    label="CNPJ"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="franchiseDTO.description"
                    background-color="background"
                    solo
                    name="input-7-4"
                    hide-details
                    label="Descrição"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-1"
              color="secondary"
              outlined
              rounded
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
              Fechar
            </v-btn>
            <v-btn
              class="d-flex align-center mb-1"
              color="primary"
              outlined
              rounded
              @click="addFranchise"
            >
              <v-icon class="mr-1">mdi-content-save-outline</v-icon>
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- remove franchise -->
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :vertical="vertical"
        width="360"
        height="180"
        transition="scale-transition"
        centered
        color="snackbar"
        shaped
        prominent
      >
        <div
          class="d-flex align-center pb-3 font-weight-medium text-subtitle-1"
        >
          <v-icon color="secondary" class="mr-3" x-large
            >mdi-alert-circle-outline</v-icon
          >
          Deseja remover este produto?
        </div>

        <span>Atenção! Essa ação não pode ser desfeita.</span>

        <template #action="{ attrs }">
          <v-btn
            class="mb-3 mr-3"
            outlined
            rounded
            v-bind="attrs"
            @click="removeFranchise"
          >
            Sim
          </v-btn>
          <v-btn
            class="mb-3 mr-3"
            color="secondary"
            outlined
            rounded
            v-bind="attrs"
            @click="snackbar = false"
          >
            Não
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "InspirePage",
  data() {
    return {
      dialog: false,
      snackbar: false,
      vertical: true,
      franchiseDTO: {
        name: "",
        description: "",
        cnpj: "",
      },

      itemSnackbar: null,
    };
  },
  computed: {
    ...mapGetters("franchises", ["franchisesData", "franchiseData"]),
    darkTheme() {
      return this.$vuetify.theme.dark;
    },
  },

  async created() {
    await this.getFranchises();
  },

  methods: {
    ...mapGetters("auth", ["isAuthenticated", "currentUser"]),
    ...mapActions("franchises", [
      "getFranchises",
      "saveFranchise",
      "getFranchise",
      "deleteFranchise",
    ]),
    ...mapMutations("franchises", ["setIdFranchise"]),

    async addFranchise() {
      const { name, description, cnpj } = this.franchiseDTO;
      try {
        if (!name || !description || !cnpj) {
          this.$toast.error("Preencha todos os campos!", {
            position: "top-right",
            timeout: 2000,
          });
          return;
        }

        await this.saveFranchise({ name, description, cnpj });

        this.franchiseDTO = {
          name: "",
          description: "",
          cnpj: "",
        };
        this.dialog = false;
        console.log("plano salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
      }
    },

    openSnackbar(product) {
      this.snackbar = true;
      this.itemSnackbar = product;
    },

    async removeFranchise() {
      try {
        await this.deleteFranchise(this.itemSnackbar);

        this.snackbar = false;
        this.$toast.success("Produto removido com sucesso!", {
          position: "top-right",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async toPush(id) {
      try {
        this.setIdFranchise(id);
        await this.getFranchise(id);
        this.$router.push(`/franquias/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
