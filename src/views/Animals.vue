<template>
  <div class="animals">
    <h1>>> Animals component, still WIP.</h1>
    <div class="container">
      <div v-for="animal in APIData" :key="animal.id" class="card">
        <img
          src="https://via.placeholder.com/300x200/000000/FFFFFF/?text=Animal+Picture+Placeholder"
          alt="Placeholder"
        />
        <div>Name: {{ animal.name }}</div>
        <div>Adoption status: {{ animal.status }}</div>
        <div>Animal type: (pending)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAPI } from "../axios-api";
import { mapState } from "vuex";

export default {
  name: "Animals",
  computed: mapState(["APIData"]),
  created() {
    getAPI
      .get("/animals/", {
        headers: {
          Authorization: `Bearer ${this.$store.state.accessToken}`,
        },
      })
      .then((response) => {
        console.log("Axios has received data: ", response.data);
        this.$store.state.APIData = response.data;
        console.log(this.$store.state.APIData);
      })
      .catch((error) => {
        console.warn("Error trying to receive data: ", error);
      });
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  border: 1px dashed gray;
  background-color: #f9dcc4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: #cbc0d3;
  border: 1px solid gray;
  margin: 1rem;
  padding: 1rem;
}
</style>
