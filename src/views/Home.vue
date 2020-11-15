<template>
  <div class="page">
    <h1>Pets that are available for adopting!</h1>
    <img v-if="loading" class="mx-auto" src="../assets/img/loading.gif" />

    <div class="grid-container grid-cols-1 sm:grid-cols-2">
      <div v-for="animal in availableAnimals" :key="animal.id" class="card">
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
export default {
  name: 'Home',
  computed: {
    availableAnimals() {
      return this.$store.getters.availableAnimals
    }
  },
  created() {
    this.$store.dispatch('fetchAnimals')
  }
}
</script>

<style scoped></style>
