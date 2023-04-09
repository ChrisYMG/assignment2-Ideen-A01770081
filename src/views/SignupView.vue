<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title>
            <h2 class="text-center primary--text">Crea una cuenta</h2>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" @submit.prevent="registerUser">
              <v-text-field
                v-model="fullName"
                label="Nombre Completo"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="studentId"
                label="Matrícula"
                required
                :rules="[studentIdRule]"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="institutionalEmail"
                label="Correo Institucional"
                required
                outlined
                :rules="[emailRule]"
              ></v-text-field>

              <v-text-field
                v-model="personalEmail"
                label="Correo Personal"
                required
                outlined
                :rules="[emailRule]"
              ></v-text-field>

              <v-text-field v-model="career" label="Carrera" requerid outlined>
              </v-text-field>

              <v-text-field
                v-model="password"
                label="Contraseña"
                required
                outlined
                :rules="[passwordRule]"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirmation"
                label="Confirmar Contraseña"
                required
                outlined
                :rules="[passwordRule, matchPassword]"
                type="password"
              ></v-text-field>

              <v-btn color="primary" type="submit" :disabled="!validForm">
                Registrar
              </v-btn>
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
  name: "Signup",
  data() {
    return {
      fullName: "",
      studentId: "",
      institutionalEmail: "",
      personalEmail: "",
      career: "",
      password: "",
      passwordConfirmation: "",
      emailRule: (val) =>
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val) ||
        "El correo electrónico no tiene un formato válido",
      studentIdRule: (value) =>
        value.length >= 6 ||
        "La contraseña debe contener al menos 6 caracteres",
      passwordRule: (value) =>
        value.length >= 6 ||
        "La contraseña debe contener al menos 6 caracteres",
      matchPassword: (value) =>
        value === this.password || "Las contraseñas no coinciden",
    };
  },
  computed: {
    validForm() {
      return (
        this.fullName !== "" &&
        this.matricula !== "" &&
        this.institutionalEmail !== "" &&
        this.personalEmail !== "" &&
        this.career !== "" &&
        this.password !== "" &&
        this.passwordConfirmation !== ""
      );
    },
  },
  methods: {
    async registerUser() {
      if (this.$refs.form.validate()) {
        try {
          await firebase.firestore().collection("users").add({
            fullName: this.fullName,
            studentid: this.studentId,
            institutionalEmail: this.institutionalEmail,
            personalEmail: this.personalEmail,
            career: this.career.toUpperCase(),
            password: this.password,
          });

          await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.institutionalEmail,
              this.password
            );
          console.log("Signup successfully");

          this.$router.push({ name: "login" });
          <LoginView />
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
