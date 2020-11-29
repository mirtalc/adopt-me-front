<template>
  <div class="page">
    <h1>Pets that are available for adopting!</h1>
    <div class="max-w-2xl py-4 mx-auto">
      <div
        v-for="animal in availableAnimals"
        :key="animal.id"
        class="card bg-featured"
      >
        <img
          src="https://via.placeholder.com/300x200/000000/FFFFFF/?text=Animal+Picture+Placeholder"
          alt="Placeholder"
          class="picture"
        />
        <div>Name: {{ animal.name }}</div>
        <div>Adoption status: {{ animal.status }}</div>
        <div>Animal type: (pending)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      availableAnimals: 'availableAnimals'
    })
  },
  methods: {
    ...mapActions({
      fetchAnimals: 'fetchAnimals'
    })
  },
  created() {
    this.fetchAnimals()
  }
}
</script>

<style scoped></style>
