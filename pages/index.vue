<template>
  <v-container
    style="height: 100vh"
    class="d-flex align-center justify-space-around"
  >
    <div style="width: 460px">
      <img style="width: 100%" src="../assets/img/amico.svg" alt="" />
    </div>
    <div
      class="d-flex flex-column align-center justify-center rounded-xl"
      :style="{
        width: '400px',
        height: '460px',
        backgroundColor: $vuetify.theme.themes.dark.tertiary,
        'box-shadow': '0px 0px 4px 4px rgba(255, 255, 255, 0.25)',
      }"
    >
      <v-form style="width: 300px" ref="form" v-model="valid" lazy-validation>
        <v-row>
          <div style="width: 180px">
            <img
              style="width: 100%"
              src="../assets/img/Smart Stock Logo - white.png"
            />
          </div>
        </v-row>
        <v-row>
          <h1
            class="mb-7 mx-auto"
            :style="{
              color: $vuetify.theme.themes.dark.text_primary,
            }"
          >
            Login
          </h1>
        </v-row>
        <v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            placeholder="exemplo@gmail.com"
            :background-color="$vuetify.theme.themes.dark.background"
            dark
            solo
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rulesPassword.required, rulesPassword.min]"
            :type="show ? 'text' : 'password'"
            hint="No mínimo 8 caracteres."
            label="Senha"
            placeholder="xxxxxxxx"
            :background-color="$vuetify.theme.themes.dark.background"
            dark
            solo
            required
            @click:append="show = !show"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn
            dark
            block
            :color="$vuetify.theme.themes.dark.primary"
            @click="isLogin"
          >
            Login
          </v-btn>
        </v-row>
        <v-row>
          <span
            class="mx-auto my-2 font-weight-medium"
            :style="{ color: $vuetify.theme.themes.dark.primary }"
            >OU</span
          >
        </v-row>
        <v-row>
          <v-btn
            dark
            block
            outlined
            :color="$vuetify.theme.themes.dark.secondary"
            class="mr-4"
            @click="isGoogleLogin"
          >
            <v-icon class="mr-1">mdi-google</v-icon> Entrar com google
          </v-btn>
        </v-row>
        <v-row>
          <span
            class="mt-2"
            :style="{
              'font-size': '14px',
              color: $vuetify.theme.themes.dark.text_tertiary,
            }"
            >Não tem conta ainda?
            <a
              :style="{
                color: $vuetify.theme.themes.dark.primary,
                'text-decoration': 'none',
              }"
              >Cadastre-se</a
            ></span
          >
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail é obrigatório.",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido.",
    ],
    password: "",
    show: false,
    rulesPassword: {
      required: (value) => !!value || "Senha é obrigatória.",
      min: (v) => v.length >= 8 || "Mínimo 8 caracteres.",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  // eslint-disable-next-line require-await
  // async created() {
  //   const isAuthenticated = this.$store.state.auth.isAuthenticated;
  //   console.log(isAuthenticated);

  //   if (isAuthenticated) {
  //     this.$router.push("/franquias");
  //   }
  // },

  methods: {
    ...mapActions("auth", ["login", "googleLogin"]),

    async isLogin() {
      try {
        const validate = this.$refs.form.validate();
        const user = {
          email: this.email,
          password: this.password,
        };

        if (validate) {
          await this.login(user);

          // this.$toast.success("Login Feito com sucesso!", {
          //   position: "top-right",
          //   timeout: 2000,
          // });

          this.$router.push("/franquias");
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Erro ao autenticar:", error.message);
      }
    },

    async isGoogleLogin() {
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider();
        const credentials = await this.$fire.auth.signInWithPopup(provider);
        console.log(credentials);

        await this.googleLogin(credentials.user);

        this.$router.push("/franquias");
      } catch (error) {
        console.error("Erro ao autenticar:", error.message);
      }
    },
  },
};
</script>
