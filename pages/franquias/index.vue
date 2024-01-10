<template>
  <v-container class="mt-8">
    <v-row>
      <h1
        :style="{
          color: darkTheme ? '#F8F9FD' : '#022370',
        }"
      >
        Comece a gerenciar seu estoque.
      </h1>
    </v-row>
    <v-row class="mt-10 mb-2">
      <h3
        :style="{
          color: darkTheme ? '#F8F9FD' : '#022370',
        }"
      >
        Suas Franquias
      </h3>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card
          color="tertiary"
          width="240"
          height="180"
          elevation="4"
          rounded="20"
          class="d-flex flex-column justify-center"
          style="cursor: pointer"
        >
          <v-icon large> mdi-plus </v-icon>
          <v-card-subtitle class="text-center"
            >Adicione uma franquia</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="tertiary"
          width="240"
          height="180"
          elevation="4"
          style="cursor: pointer"
          @click="toPush"
        >
          <v-card-title> Franquia 1 </v-card-title>
          <v-card-subtitle>Franquia da casa norte</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "InspirePage",
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark;
    },
  },

  methods: {
    toPush() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
