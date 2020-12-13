<template>
  <div class="page">
    <h1>Pets that are available for adopting!</h1>
    <div class="max-w-2xl py-4 mx-auto">
      <div
        v-for="animal in availableAnimals"
        :key="animal.id"
        class="card bg-featured"
      >
        <AnimalPicture :animal="animal" />
        <div>Name: {{ animal.name }}</div>
        <div>Animal species: {{ animal.species.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AnimalPicture from '@/components/animals/AnimalPicture'

export default {
  name: 'Home',
  components: {
    AnimalPicture
  },
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
