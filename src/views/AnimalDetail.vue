<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div
      v-else
      class="squared-container sm:max-w-2xl"
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
      <AnimalPicture :animal="animal" />
      <DetailEdition
        v-if="editionMode"
        :animal="this.animal"
        @editedEvent="reloadComponent()"
      />
      <DetailList v-else :currentAnimal="this.animal" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { routesInfo } from '@/constants/routesInfo'
import ConfirmationWarning from '@/components/ConfirmationWarning'
import DetailList from '@/components/animals/DetailList'
import DetailEdition from '@/components/animals/DetailEdition'
import AnimalPicture from '@/components/animals/AnimalPicture'
import LoadingSpinner from '@/components/basic/LoadingSpinner'
import { bgChooser } from '@/helpers'

export default {
  name: 'AnimalDetail',
  components: {
    ConfirmationWarning,
    DetailList,
    DetailEdition,
    AnimalPicture,
    LoadingSpinner
  },
  data: () => ({
    showConfirmation: false,
    editionMode: false,
    isLoading: false
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
    ...mapMutations({
      setCurrentToNull: 'setCurrentToNull'
    }),
    ...mapActions({
      fetchDetails: 'fetchDetails',
      deleteAnimal: 'deleteAnimal',
      fetchAllSpecies: 'fetchAllSpecies',
      fetchAllStatuses: 'fetchAllStatuses'
    }),
    redirectToAnimalList() {
      this.$router.push({ name: routesInfo.animals.name })
    },
    processDeleteOk() {
      this.$toast.success('Successfully deleted!')
      this.redirectToAnimalList()
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
    this.isLoading = true
    await this.fetchAllStatuses()
    await this.fetchAllSpecies()
    await this.fetchDetails(this.animalId)
    this.isLoading = false
  },
  beforeDestroy() {
    this.setCurrentToNull()
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
