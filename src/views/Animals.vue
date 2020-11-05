<template>
  <div class="animals">
    <h1>>> Animals component, still WIP.</h1>
    <div class="container grid-cols-1 sm:grid-cols-2">
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
import { getAPI } from '../axios-api'
import { mapState } from 'vuex'
import routesInfo from '../constants/routesInfo'

export default {
  name: 'Animals',
  data: () => {
    routesInfo
  },
  computed: mapState(['APIData']),
  created() {
    getAPI
      .get('/animals/', {
        headers: {
          Authorization: `Bearer ${this.$store.state.accessToken}`
        }
      })
      .then(response => {
        console.log('Axios has received data: ', response.data)
        this.$store.state.APIData = response.data
        console.log(this.$store.state.APIData)
      })
      .catch(error => {
        console.warn('Error trying to receive data: ', error)
      })
  },
  onIdle() {
    this.$store.dispatch('userLogout').then(() => {
      this.$router.push({ name: routesInfo.logout.name })
    })
  }
}
</script>

<style scoped>
.container {
  margin: auto;
  max-width: 1000px;
  @apply grid;
}

.card {
  @apply m-4 p-4 bg-purple-200;
  background-color: #cbc0d3;
  border: 1px solid gray;
}
</style>
