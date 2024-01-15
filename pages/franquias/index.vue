<template>
  <v-container class="mt-8">
    <v-row>
      <h1
        :style="{
          color: darkTheme ? '#F8F9FD' : '#232323',
        }"
      >
        Olá! Bem vindo ao Smart Stock
      </h1>
    </v-row>
    <v-row class="mt-4 mb-6">
      <h3
        :style="{
          color: darkTheme ? '#C1B9B9' : '#5E5e5e',
        }"
      >
        Adiciona uma nova franquia e comece a gerenciar o seu estoque :)
      </h3>
    </v-row>
    <v-row class="mt-10 mb-2">
      <h2
        :style="{
          color: darkTheme ? '#F8F9FD' : '#232323',
        }"
      >
        Suas Franquias
      </h2>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-hover v-slot="{ hover }" open-delay="300" close-delay="200">
          <v-card
            :color="
              darkTheme && hover
                ? '#10205099'
                : !darkTheme && hover
                ? '#2323230f'
                : 'tertiary'
            "
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
            <v-card-subtitle class="text-center"
              >Adicione uma franquia</v-card-subtitle
            >
          </v-card>
        </v-hover>
      </v-col>
      <v-col v-for="item in franchisesData" :key="item.name" cols="3">
        <v-hover v-slot="{ hover }" open-delay="300" close-delay="200">
          <v-card
            :color="
              darkTheme && hover
                ? '#10205099'
                : !darkTheme && hover
                ? '#23232311'
                : 'tertiary'
            "
            width="240"
            height="180"
            elevation="4"
            style="cursor: pointer"
            :class="{ 'on-hover': hover }"
            @click="toPush(item.id)"
          >
            <v-card-title> {{ item.name }} </v-card-title>
            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card :style="{ backgroundColor: darkTheme ? '#192340' : '#F8F9FD' }">
          <v-card-title>
            <span class="text-h5">Cadastro Franquia</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="franchise.name"
                    :background-color="darkTheme ? '#101729' : '#F8F9FD'"
                    solo
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="franchise.description"
                    :background-color="darkTheme ? '#101729' : '#F8F9FD'"
                    solo
                    name="input-7-4"
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "InspirePage",
  data() {
    return {
      dialog: false,
      franchise: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters("franchises", ["franchisesData"]),
    darkTheme() {
      return this.$vuetify.theme.dark;
    },
  },

  async created() {
    await this.getFranchises();
  },

  methods: {
    ...mapGetters("auth", ["isAuthenticated", "currentUser"]),
    ...mapActions("franchises", ["getFranchises", "saveFranchise"]),
    ...mapMutations("franchises", ["setIdFranchise"]),

    async addFranchise() {
      try {
        const { name, description } = this.franchise;

        await this.saveFranchise({ name, description });

        this.franchise = {
          name: "",
          description: "",
        };
        this.dialog = false;
        console.log("plano salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
      }
    },

    toPush(id) {
      this.setIdFranchise(id);
      this.$router.push(`/franquias/${id}`);
    },
  },
};
</script>
