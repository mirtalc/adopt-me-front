<template>
  <div class="page">
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
    <img v-if="loading" class="mx-auto" src="../assets/img/loading.gif" />
    <div class="grid-container grid-cols-1 sm:grid-cols-2">
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
import { mapActions, mapState } from 'vuex'
import { routesInfo } from '../constants/routesInfo'
import InlineLink from '../components/InlineLink'

export default {
  name: 'Animals',
  data: () => ({
    routesInfo,
    loading: false
  }),
  components: {
    InlineLink
  },
  computed: {
    ...mapState({
      animals: state => state.animals.all
    })
  },
  methods: {
    ...mapActions({
      fetchAnimals: 'fetchAnimals',
      userLogout: 'userLogout'
    })
  },
  created() {
    this.loading = true
    this.fetchAnimals().finally(() => (this.loading = false))
  },
  onIdle() {
    this.userLogout().then(() => {
      this.$router.push({ name: routesInfo.logout.name })
    })
  }
}
</script>

<style scoped></style>
