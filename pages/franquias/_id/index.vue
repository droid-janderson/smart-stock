<template>
  <v-container>
    <v-progress-circular
      v-model="loading"
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      loading: true,
    };
  },

  computed: {
    franchiseId() {
      return this.$route.params.id;
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.$router.push(`/franquias/${this.franchiseId}/produtos`);
  },
};
</script>
