<template>
  <v-container
    :style="{
      backgroundColor: darkTheme ? '#101729' : '#F8F9FD',
    }"
    class="d-flex flex-column align-center justify-center"
  >
    <div>
      <img src="../assets/img/error-404-PhotoRoom.png-PhotoRoom.png" />
      <h1 style="font-size: 40px" class="text-center font-weight-bold">
        Página não encontrada!
      </h1>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },

  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark;
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
