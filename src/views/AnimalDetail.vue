<template>
  <div class="detail-box border p-6 sm:max-w-2xl sm:mx-auto sm:my-16">
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

    <img
      src="https://via.placeholder.com/300x200/000000/FFFFFF/?text=Animal+Picture+Placeholder"
      alt="Placeholder"
      class="picture"
    />

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
import { routesInfo } from '../constants/routesInfo'
import ConfirmationWarning from '../components/ConfirmationWarning'
import DetailList from '../components/animals/DetailList'
import DetailEdition from '../components/animals/DetailEdition'

export default {
  name: 'AnimalDetail',
  components: {
    ConfirmationWarning,
    DetailList,
    DetailEdition
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
      deleteAnimal: 'deleteAnimal'
    }),
    redirectToAllAnimals() {
      this.$router.push({ name: routesInfo.animals.name })
    },
    processDeleteOk() {
      alert('Successfully deleted. We will redirect you to All animals')
      this.redirectToAllAnimals()
    },
    processDeleteError(error) {
      alert('Unknown error trying to delete animal. More info at Console.')
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
    }
  },
  beforeMount() {
    this.fetchDetails(this.animalId)
  }
}
</script>

<style>
.detail-box {
  background-color: #ffd166;
}

.details span {
  @apply font-bold pr-4;
}

.icon {
  cursor: pointer;
}
</style>
