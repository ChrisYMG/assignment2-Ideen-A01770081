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

    <v-main>
      <router-view />
    </v-main>
    <div class="main-container">
    <h2 class="title-page">Información del Alumno</h2>
    <img
      class="img-juan"
      src="../assets/juan-escutia2.jpeg"
      alt="juan-escutia"
    />
    <div class="grid">
      <div>
        <h2>Nombre Completo</h2>
        <p>{{ usuarios[0] }}</p>
      </div>
      <div>
        <h2>Matrícula</h2>
        <p>{{ usuarios[3] }}</p>
      </div>
      <div>
        <h2>Correo Institucional</h2>
        <p>{{ usuarios[1] }}</p>
      </div>
      <div>
        <h2>Carrera</h2>
        <p>{{ usuarios[4] }}</p>
      </div>
      <div>
        <h2>Correo Personal</h2>
        <p>{{ usuarios[2] }}</p>
      </div>
    </div>
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
.img-juan {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 30px 0;
}

.grid {
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px 240px;
}

div > h2 {
  font-size: 30px;
  color: #384ffe;
  font-weight: bold;
}

div > p {
  color: #787c9d;
  font-weight: bold;
  font-size: 20px;
}

@media only screen and (max-width: 600px) {
  .grid {
    margin: 15px 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px 0;
  }

  .title-page {
    font-size: 25px;
  }

  div > h2 {
    font-size: 20px;
  }

  div > p {
    font-size: 16px;
  }
}
</style>
<script>
import firebase from "firebase/compat/app";
export default {
  name: "Inicio",

  mounted() {
    this.getData();
  },
  data() {
    return {
      usuarios: [],
    };
  },
  methods: {
    async getData() {
      // const dbRef = firebase.database().ref();
      // dbRef.child("users").child("WrdNsn89fcvcbQOOHmfg").get().then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log(snapshot.val());
      //   } else {
      //     console.log("No data available");
      //   }
      // }).catch((error) => {
      //   console.error(error);
      // });

      let userCurrentEmail = firebase.auth().currentUser.email;
      console.log(userCurrentEmail);
      firebase
        .firestore()
        .collection("users")
        .where("institutionalEmail", "==", userCurrentEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let usuario = doc.data();
            this.usuarios.push(usuario.fullName);
            this.usuarios.push(usuario.institutionalEmail);
            this.usuarios.push(usuario.personalEmail);
            this.usuarios.push(usuario.studentid);
            this.usuarios.push(usuario.career);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
};
</script>
