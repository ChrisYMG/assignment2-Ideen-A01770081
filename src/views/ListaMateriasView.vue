<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logoTec.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link to="/user">
        <span class="mr-5 terceary--text">Inicio</span>
      </router-link>

      <router-link to="/materias">
        <span class="mr-5 terceary--text">Lista de Materias</span>
      </router-link>

      <router-link to="/login" @click="logout()">
        <span class="mr-5 terceary--text">Salir</span>
      </router-link>
    </v-app-bar>
    <div class="main-container">
      <h2 class="title-page">Materias Inscritas</h2>
      <vue-card class="card elevation-12" v-for="subject in subjects" :key="subject" >
        <h3 class="subject-name">
          {{ subjects[0] }}
        </h3>
        <p class="coach-name">Profesor: {{ subjects[1] }}</p>

        <div>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Ver más
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="subject-name">
                {{ subjects[0] }}
              </v-card-title>
              <v-card-text>
                <p class="coach-name">Profesor: {{ subjects[1] }}</p>
                <p class="coach-name">Salón: {{ subjects[2] }}</p>
                <p class="coach-name">Días: {{ subjects[3] }}</p>
                <p class="coach-name">Horario: {{ subjects[4] }}</p>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </vue-card>
    </div>
  </v-app>
</template>

<style scoped>
.main-container {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}
.title-page {
  font-size: 50px;
  color: #384ffe;
}
.card {
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 150px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

div > li {
  text-decoration: none;
  list-style: none;
}

.subject-name {
  font-weight: bold;
  font-size: 20px;
  color: #384ffe;
}

.coach-name {
  color: #787c9d;
  font-weight: bold;
  font-size: 16px;
}

@media only screen and (max-width: 600px) {
  .title-page {
    font-size: 26px;
  }

  .card {
    width: 250px;
    height: 150px;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
  }
}
</style>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "Materias",
  mounted() {
    this.getData();
  },
  data() {
    return {
      subjects:[]
    };
  },
  methods: {
    async getData() {
      firebase
        .firestore()
        .collection("subjects")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let subject = doc.data();
            this.subjects.push(subject.subject);
            this.subjects.push(subject.teacher);
            this.subjects.push(subject.classroom);
            this.subjects.push(subject.days);
            this.subjects.push(subject.schedule);
          });
          console.log(this.subjects[0])
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          // v-for="subject in subjects" :key="subject"
        });
    },
  },
};
</script>
