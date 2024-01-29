<template>
  <div class="mt-8">
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
            <v-icon large> mdi-plus </v-icon>
            <v-card-subtitle class="text-center">Adicione uma franquia</v-card-subtitle>
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
            color="primary"
            top
            right
            class="mt-4 mr-4"
            @click="editFranchise(item.id)"
            ><v-icon size="24">mdi-pen</v-icon></v-btn
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
        <v-card :style="{ backgroundColor: $vuetify.theme.currentTheme.tertiary }">
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
            <v-btn color="secondary" text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
              Fechar
            </v-btn>
            <v-btn color="primary" text @click="addFranchise"> Salvar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Modal edit -->
    <v-row justify="center">
      <v-dialog v-model="dialogEdit" persistent max-width="600px">
        <v-card :style="{ backgroundColor: $vuetify.theme.currentTheme.tertiary }">
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
                    no-resize
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
            <v-btn color="secondary" text @click="closeEdit">
              <v-icon>mdi-close</v-icon>
              Cancelar
            </v-btn>
            <v-btn color="primary" text @click="saveFranchise"> Salvar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "InspirePage",
  data() {
    return {
      dialog: false,
      dialogEdit: false,
      franchiseDTO: {
        name: "",
        description: "",
        cnpj: "",
      },
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
    ...mapActions("franchises", ["getFranchises", "saveFranchise", "getFranchise"]),
    ...mapMutations("franchises", ["setIdFranchise"]),

    async addFranchise() {
      try {
        const { name, description, cnpj } = this.franchiseDTO;

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
    async editFranchise(id) {
      try {
        await this.getFranchise(id);

        const { name, cnpj, description } = this.franchiseData;
        console.log(this.franchiseData);

        this.franchiseDTO = {
          name,
          cnpj,
          description,
        };

        this.dialogEdit = true;
      } catch (error) {
        console.error(error);
      }
    },

    closeEdit() {
      this.franchiseDTO = {
        name: "",
        description: "",
        cnpj: "",
      };

      this.dialogEdit = false;
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
