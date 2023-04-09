<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="headline"
            ><h2 class="primary--text">Iniciar sesión</h2></v-card-title
          >
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                required
                :rules="[emailRule]"
                label="Correo electrónico"
                outlined
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                required
                :rules="[passwordRule]"
                label="Contraseña"
                outlined
                type="password"
              ></v-text-field>
              <v-btn color="primary" :disabled="!validForm" @click="login"
                >Iniciar sesión</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailRule: (value) =>
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value) ||
        "El correo electrónico no tiene un formato válido",
      passwordRule: (value) =>
        value.length >= 6 ||
        "La contraseña debe contener al menos 6 caracteres",
    };
  },
  computed: {
    validForm() {
      return (
        this.email !== "" && this.password !== "" && this.password.length >= 6
      );
    },
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
          console.log("Login successfully");
          // Aquí puedes hacer algo con el usuario autenticado, como redirigirlo a otra página
          this.$router.push({ name: "user"});
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: calc(100vh - 70px);
}
</style>
