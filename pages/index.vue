<template>
  <div
    class="d-flex align-center justify-space-around mt-4"
    style="min-height: 90vh"
  >
    <div style="width: 460px">
      <img style="width: 100%" src="../assets/img/amico.svg" alt="" />
    </div>

    <!-- Form login -->
    <div
      v-if="!registerPage"
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
            :readonly="loading"
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
            :readonly="loading"
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
            :loading="loading"
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
              @click="registerPage = true"
              >Cadastre-se</a
            ></span
          >
        </v-row>
      </v-form>
    </div>

    <!-- Form cadastro -->
    <div
      v-if="registerPage"
      class="d-flex flex-column align-center justify-center rounded-xl"
      :style="{
        width: '400px',
        height: '540px',
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
            class="mb-6 mx-auto"
            :style="{
              color: $vuetify.theme.themes.dark.text_primary,
            }"
          >
            Cadastro
          </h1>
        </v-row>
        <v-row>
          <v-text-field
            v-model="registerDTO.name"
            :rules="[registerDTO.nameRules.required, registerDTO.nameRules.min]"
            :readonly="loading"
            label="Nome"
            placeholder="John Doe"
            :background-color="$vuetify.theme.themes.dark.background"
            dark
            solo
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="registerDTO.email"
            :rules="emailRules"
            :readonly="loading"
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
            v-model="registerDTO.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rulesPassword.required, rulesPassword.min]"
            :readonly="loading"
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
            :loading="loading"
            dark
            block
            :color="$vuetify.theme.themes.dark.primary"
            @click="registerUser"
          >
            Cadastrar
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
            >Já tem conta?
            <a
              :style="{
                color: $vuetify.theme.themes.dark.primary,
                'text-decoration': 'none',
              }"
              @click="registerPage = false"
              >Faça Login</a
            ></span
          >
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    valid: true,
    loading: false,
    registerPage: false,
    registerDTO: {
      name: "",
      nameRules: {
        required: (v) => !!v || "Nome é obrigatória.",
        min: (v) => v.length >= 3 || "Nome deve ser válido.",
      },
      email: "",
      password: "",
    },
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
    ...mapActions("auth", ["login", "register", "googleLogin"]),

    async isLogin() {
      try {
        const validate = this.$refs.form.validate();
        const user = {
          email: this.email,
          password: this.password,
        };

        if (validate) {
          this.loading = true;

          setTimeout(() => (this.loading = false), 2000);
          await this.login(user);

          this.$toast.success("Login Feito com sucesso!", {
            position: "top-right",
            timeout: 2000,
          });

          this.$router.push("/franquias");
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        this.$toast.error("Erro ao autenticar!", {
          position: "top-right",
          timeout: 2000,
        });

        console.error("Erro ao autenticar:", error.message);
      }
    },

    async registerUser() {
      const validate = this.$refs.form.validate();

      const { name, email, password } = this.register;

      try {
        if (validate) {
          this.loading = true;

          setTimeout(() => (this.loading = false), 2000);
          await this.register({
            name,
            email,
            password,
          });

          this.$toast.success("Cadastro concluído!", {
            position: "top-right",
            timeout: 2000,
          });

          this.registerPage = false;
        }
      } catch (error) {
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
