<template>
  <div
    class="bg-pets squared-container sm:max-w-xl sm:mx-auto sm:my-16 sm:rounded-2xl"
  >
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
        :name="'selectedType'"
        :value="selectedType"
        :disabledText="'Animal type'"
        :options="animalTypes"
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
        Create pet {{ animalName }} {{ selectedType }} {{ selectedStatus }}
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="submitError" />
    </form>
  </div>
</template>

<script>
import FormErrors from '../components/FormErrors'
import TextInput from '../components/TextInput'
import SelectInput from '../components/SelectInput'
import { routesInfo } from '../constants/routesInfo'
import { mapActions } from 'vuex'

export default {
  name: 'AnimalCreate',
  components: {
    FormErrors,
    TextInput,
    SelectInput
  },
  data: () => ({
    animalName: '',
    selectedType: '',
    selectedStatus: '',
    inputErrors: [],
    submitError: null,
    animalTypes: [
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
      animalCreate: 'animalCreate'
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
      if (!this.selectedType)
        this.inputErrors.push('You must choose a valid animal type')
      if (!this.selectedStatus)
        this.inputErrors.push('You must choose a valid adoption status')
    },
    submit() {
      this.animalCreate({
        name: this.animalName,
        status: this.selectedStatus,
        type: this.selectedTyped
      })
        .then(() => this.processSubmitOk())
        .catch(error => this.processSubmitError(error))
    },
    processSubmitOk() {
      alert(
        "Success! Animal registered. You'll be redirected to the animal list."
      )
      this.redirectToAllAnimals()
    },
    processSubmitError(error) {
      this.submitError =
        'Unknown error; please try again later. More info at Console.'
      console.warn('Error while registering animal: ', error)
    },
    redirectToAllAnimals() {
      this.$router.push({ name: routesInfo.animals.name })
    }
  }
}
</script>

<style>
select:hover {
  @apply cursor-pointer;
}
</style>
