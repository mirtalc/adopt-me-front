<template>
  <div class="animals">
    <div>
      <p>Here you can see all of our animals!</p>
      <p>In the future, we'll implement filters by animal type, or state</p>

      <div class="my-4">
        For now, you can
        <InlineLink
          :routeName="routesInfo.animalCreate.name"
          :text="'register a new animal'"
        />
        in our database (even if you are not an ADMIN)
      </div>
    </div>
    <div class="container grid-cols-1 sm:grid-cols-2">
      <div v-for="animal in animals" :key="animal.id" class="card">
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
import { mapState } from 'vuex'
import { http_headers } from '../infrastructure/axios-api'
import { apiEndpoints } from '../constants/apiEndpoints'
import { routesInfo } from '../constants/routesInfo'
import InlineLink from '../components/InlineLink'

export default {
  name: 'Animals',
  data: () => ({
    routesInfo
  }),
  components: {
    InlineLink
  },
  computed: mapState(['animals']),
  created() {
    http_headers
      .get(apiEndpoints.animals)
      .then(response => {
        console.log('Axios has received data: ', response.data)
        this.$store.state.animals = response.data
        console.log(this.$store.state.animals)
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
