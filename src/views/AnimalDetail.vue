<template>
  <div
    class="border p-6 sm:max-w-2xl sm:mx-auto sm:my-16"
    :class="otherClasses(animal.status)"
  >
    <div class="flex text-2xl">
      <p>
        {{ animal.name }}
        <span class="hidden sm:inline"> - Detailed information</span>
      </p>
      <img
        v-if="editionMode"
        src="../assets/img/icons/discard.png"
        class="icon ml-auto px-2"
        @click="clickDiscard()"
      />
      <img
        v-else
        src="../assets/img/icons/edit.png"
        class="icon ml-auto px-2"
        @click="clickEdit()"
      />
      <img
        src="../assets/img/icons/trash.png"
        class="icon"
        @click="clickDelete()"
      />
    </div>

    <ConfirmationWarning
      v-show="showConfirmation"
      @cancelEvent="cancelAction()"
      @confirmEvent="confirmAction()"
    />
    <AnimalPicture :photo="animal.photo" />
    <DetailEdition
      v-if="editionMode"
      :animal="this.animal"
      @editedEvent="reloadComponent()"
    />
    <DetailList v-else :animal="this.animal" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { routesInfo } from '@/constants/routesInfo'
import ConfirmationWarning from '@/components/ConfirmationWarning'
import DetailList from '@/components/animals/DetailList'
import DetailEdition from '@/components/animals/DetailEdition'
import AnimalPicture from '@/components/animals/AnimalPicture'
import { bgChooser } from '@/helpers'

export default {
  name: 'AnimalDetail',
  components: {
    ConfirmationWarning,
    DetailList,
    DetailEdition,
    AnimalPicture
  },
  data: () => ({
    showConfirmation: false,
    editionMode: false
  }),
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
      fetchDetails: 'fetchDetails',
      deleteAnimal: 'deleteAnimal',
      fetchAllSpecies: 'fetchAllSpecies',
      fetchAllStatuses: 'fetchAllStatuses'
    }),
    redirectToAllAnimals() {
      this.$router.push({ name: routesInfo.animals.name })
    },
    processDeleteOk() {
      this.$toast.success('Successfully deleted!')
      this.redirectToAllAnimals()
    },
    processDeleteError(error) {
      this.$toast.error('Oops, something went wrong')
      console.warn('Error while deleting animal: ', error)
    },
    clickDiscard() {
      this.editionMode = false
    },
    clickEdit() {
      this.editionMode = true
    },
    clickDelete() {
      this.showConfirmation = true
    },
    cancelAction() {
      this.showConfirmation = false
    },
    confirmAction() {
      this.showConfirmation = false
      this.deleteAnimal(this.animalId)
        .then(() => this.processDeleteOk())
        .catch(error => this.processDeleteError(error))
    },
    reloadComponent() {
      this.fetchDetails(this.animalId).then((this.editionMode = false))
    },
    otherClasses: status => (status ? bgChooser(status) : '')
  },

  async beforeMount() {
    await this.fetchDetails(this.animalId)
    await this.fetchAllSpecies()
    await this.fetchAllStatuses()
  },
  beforeDestroy() {
    //TODO convert to mutation
    this.$store.state.animals.current = null
  }
}
</script>

<style>
.details span {
  @apply font-bold pr-4;
}

.icon {
  cursor: pointer;
}
</style>
