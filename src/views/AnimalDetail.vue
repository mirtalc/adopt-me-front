<template>
  <div class="border border-black p-4 sm:max-w-2xl sm:mx-auto sm:my-16">
    <div class="text-2xl">{{ animal.name }} - Detailed information</div>
    <div>
      <img
        src="https://via.placeholder.com/300x200/000000/FFFFFF/?text=Animal+Picture+Placeholder"
        alt="Placeholder"
      />
    </div>
    <div>
      <ul>
        <li>Pet's proposed name: {{ animal.name }}</li>
        <li>Species: {{ animal.type }}</li>
        <li>Vaccination history {{ animal.vaccinations }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AnimalDetail',
  computed: {
    animalId() {
      return this.$route.params.animalId
    },
    ...mapState({
      animal: state => state.animals.current
    })
  },
  methods: {
    ...mapActions({
      fetchDetails: 'fetchDetails'
    })
  },
  created() {
    console.log('created', this.$route)
  },
  beforeMount() {
    this.fetchDetails(this.animalId)
    console.log('beforeMount', this.$route)
  }
}
</script>

<style></style>
