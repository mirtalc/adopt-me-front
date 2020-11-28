<template>
  <div class="detail-box border p-6 sm:max-w-2xl sm:mx-auto sm:my-16">
    <div class="flex text-2xl">
      <p>
        {{ animal.name }}
        <span class="hidden sm:inline"> - Detailed information</span>
      </p>
      <img src="../assets/img/icons/edit.png" class="icon ml-auto px-2" />
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
    <ul class="details">
      <li><span>Pet's proposed name: </span> {{ animal.name }}</li>
      <li><span>Species: </span> {{ animal.type }} (Still pending...)</li>
      <li><span>Adoption status: </span>{{ animal.status }}</li>
      <div class="mt-2"><span> Vaccination history</span></div>
      <div v-for="vaccination in animal.vaccinations" :key="vaccination.id">
        <!-- //TODO assembler for preprocessing back response before saving it to state -->
        {{ vaccination.date_vaccinated }} | Vaccine id:
        {{ vaccination.vaccine }} | {{ vaccination.incidences }}
      </div>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { routesInfo } from '../constants/routesInfo'
import ConfirmationWarning from '../components/ConfirmationWarning'

export default {
  name: 'AnimalDetail',
  components: {
    ConfirmationWarning
  },
  data: () => ({
    showConfirmation: false
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
      //TODO rethink error treatment with axios. maybe keep a list of known errors
      // or only show generic error component if server is down
      // or let every component process its errors and redirect to GenericError from component
      alert('Unknown error; trying to delete animal. More info at Console.')
      console.warn('Error while deleting animal: ', error)
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
