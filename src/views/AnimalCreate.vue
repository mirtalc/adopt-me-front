<template>
  <div class="squared-container sm:max-w-xl sm:mx-auto sm:my-16 sm:rounded-2xl">
    <p class="title">Register a new animal</p>
    <p>Enter the details of the new animal</p>

    <form @submit.prevent="checkAndSubmit" class="centered-container">
      <TextInput
        :name="'animalName'"
        :value="animalName"
        :placeholderText="'Pet name'"
        @inputEvent="handleChange($event)"
      />
      <SelectInput
        :name="'selectedSpecies'"
        :value="selectedSpecies"
        :disabledText="'Animal species'"
        :options="animalSpecies"
        @inputEvent="handleChange($event)"
      />
      <SelectInput
        :name="'selectedStatus'"
        :value="selectedStatus"
        :disabledText="'Adoption status'"
        :options="adoptionStatuses"
        @inputEvent="handleChange($event)"
      />
      <button type="submit" class="big-button hover:bg-indigo-500">
        Create pet {{ animalName }} {{ selectedSpecies }} {{ selectedStatus }}
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="submitError" />
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormErrors from '@/components/FormErrors'
import TextInput from '@/components/basic/TextInput'
import SelectInput from '@/components/basic/SelectInput'
import { routesInfo } from '@/constants/routesInfo'

export default {
  name: 'AnimalCreate',
  components: {
    FormErrors,
    TextInput,
    SelectInput
  },
  data: () => ({
    animalName: '',
    selectedSpecies: '',
    selectedStatus: '',
    inputErrors: [],
    submitError: null,
    animalSpecies: [
      { text: 'Cat', value: 'CAT' },
      { text: 'Dog', value: 'DOG' }
    ], //TODO obtain from backend
    adoptionStatuses: [
      { text: 'Adopted', value: 'ADOP' },
      { text: 'Deceased', value: 'RIP' },
      { text: 'Available', value: 'AVAIL' }
    ] //TODO obtain from backend
  }),
  computed: {
    hasInputErrors() {
      return !!this.inputErrors.length
    }
  },
  methods: {
    ...mapActions({
      animalCreate: 'animalCreate',
      fetchAllSpecies: 'fetchAllSpecies',
      fetchAllStatuses: 'fetchAllStatuses'
    }),
    handleChange(payload) {
      this[payload.targetName] = payload.targetValue
    },
    cleanErrors() {
      this.inputErrors = []
      this.loginError = null
    },
    checkAndSubmit() {
      this.checkValues()
      if (!this.hasInputErrors) this.submit()
    },
    checkValues() {
      this.cleanErrors()
      if (!this.animalName)
        this.inputErrors.push('Pet name field may not be empty')
      if (!this.selectedSpecies)
        this.inputErrors.push('You must choose a valid species')
      if (!this.selectedStatus)
        this.inputErrors.push('You must choose a valid adoption status')
    },
    submit() {
      this.animalCreate({
        name: this.animalName,
        statusUid: this.selectedStatus,
        speciesUid: this.selectedSpecies
      })
        .then(() => this.processSubmitOk())
        .catch(error => this.processSubmitError(error))
    },
    processSubmitOk() {
      this.$toast.success('Success! Animal registered')
      this.redirectToAllAnimals()
    },
    processSubmitError(error) {
      this.$toast.error('Oops, something went wrong')
      this.submitError =
        'Unknown error; please try again later. More info at Console.'
      console.warn('Error while registering animal: ', error)
    },
    redirectToAllAnimals() {
      this.$router.push({ name: routesInfo.animals.name })
    }
  },
  beforeMount() {
    this.fetchAllSpecies()
    this.fetchAllStatuses()
  }
}
</script>

<style scoped>
select:hover {
  @apply cursor-pointer;
}

div {
  background-color: #ffd166;
}

button {
  background-color: #f77f00;
}
</style>
