<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logoTec.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link to="/login">
        <span class="mr-5 terceary--text ">Inciar Sesión</span>
      </router-link>

      <router-link to="/">
        <span class="mr-5 terceary--text">Registrarse</span>
      </router-link>

      <router-link to="/login" @click="logout()">
        <span class="mr-5 terceary--text">Salir</span>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    logout(){
      firebase.auth().logOut();
    }
  }
};
</script>
