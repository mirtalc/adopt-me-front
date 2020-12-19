<template>
  <div class="page">
    <p class="title">
      All animals from our shelter
    </p>
    <p>
      Here is a list of all animals that the pet shelter processes (or has
      processed).
    </p>
    <p class="my-2">
      <span class="font-bold"> Click on any animal</span> to see more details,
      edit it, or delete it.
    </p>
    <p>
      You can also
      <InlineLink
        :routeName="routesInfo.animalCreate.name"
        :text="'register a new animal'"
        class="text-indigo-600"
      />
      in our database.
    </p>
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
        <div>{{ animal.name }} | {{ animal.species.name }}</div>
        <div>Adoption status: {{ animal.status.name }}</div>
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
