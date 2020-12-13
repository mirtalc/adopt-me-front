<template>
  <div class="page">
    <p class="title">
      All animals from our shelter
    </p>
    <p>In the future, we'll implement filters by species, or adoption status</p>

    <div class="my-2">
      For now, you can
      <InlineLink
        :routeName="routesInfo.animalCreate.name"
        :text="'register a new animal'"
      />
      in our database (even if you are not an ADMIN)
    </div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="grid-container grid-cols-1 sm:grid-cols-2">
      <div
        v-for="animal in sortedAnimals"
        :key="animal.id"
        class="card"
        :class="otherClasses(animal.status)"
        @click="sendToDetails(animal.id)"
      >
        <AnimalPicture :animal="animal" />
        <div>Name: {{ animal.name }}</div>
        <div>Adoption status: {{ animal.status.name }}</div>
        <div>Animal species: {{ animal.species.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { routesInfo } from '@/constants/routesInfo'
import { bgChooser } from '@/helpers'
import InlineLink from '@/components/InlineLink'
import AnimalPicture from '@/components/animals/AnimalPicture'
import LoadingSpinner from '@/components/basic/LoadingSpinner'

export default {
  name: 'AnimalList',
  data: () => ({
    routesInfo,
    isLoading: false
  }),
  components: {
    InlineLink,
    AnimalPicture,
    LoadingSpinner
  },
  computed: {
    ...mapState({
      animals: state => state.animals.all
    }),
    sortedAnimals() {
      return [...this.animals].reverse()
    }
  },
  methods: {
    ...mapActions({
      fetchAnimals: 'fetchAnimals',
      userLogout: 'userLogout'
    }),
    sendToDetails(id) {
      this.$router.push({
        name: routesInfo.animalDetail.name,
        params: {
          animalId: id
        }
      })
    },
    otherClasses: status => bgChooser(status)
  },
  created() {
    this.isLoading = true
    this.fetchAnimals().finally(() => (this.isLoading = false))
  },
  onIdle() {
    this.userLogout().then(() => {
      this.$router.push({ name: routesInfo.logout.name })
    })
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
