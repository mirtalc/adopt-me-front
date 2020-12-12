<template>
  <div class="page">
    <p>Here you can see all of our animals!</p>
    <p>In the future, we'll implement filters by species, or adoption status</p>

    <div class="my-4">
      For now, you can
      <InlineLink
        :routeName="routesInfo.animalCreate.name"
        :text="'register a new animal'"
      />
      in our database (even if you are not an ADMIN)
    </div>
    <img v-if="loading" class="picture" src="../assets/img/spinner.gif" />
    <div class="grid-container grid-cols-1 sm:grid-cols-2">
      <div
        v-for="animal in animals"
        :key="animal.id"
        class="card"
        :class="otherClasses(animal.status)"
        @click="sendToDetails(animal.id)"
      >
        <AnimalPicture :photo="animal.photo" />
        <div>Name: {{ animal.name }}</div>
        <div>Adoption status: {{ animal.status.name }}</div>
        <div>Animal species: {{ animal.species }}</div>
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

export default {
  name: 'Animals',
  data: () => ({
    routesInfo,
    loading: false
  }),
  components: {
    InlineLink,
    AnimalPicture
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

<style scoped>
.card {
  cursor: pointer;
}
</style>
