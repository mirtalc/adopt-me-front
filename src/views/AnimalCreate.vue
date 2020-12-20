<template>
  <div class="squared-container sm:max-w-xl sm:rounded-2xl">
    <p class="subtitle">Register a new animal</p>
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
        :options="assembleSelectOptions(animalSpecies)"
        @inputEvent="handleChange($event)"
      />
      <SelectInput
        :name="'selectedStatus'"
        :value="selectedStatus"
        :disabledText="'Adoption status'"
        :options="assembleSelectOptions(adoptionStatuses)"
        @inputEvent="handleChange($event)"
      />
      <button type="submit" class="big-button hover:bg-indigo-500">
        Create pet
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="submitError" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormErrors from '@/components/FormErrors'
import TextInput from '@/components/basic/TextInput'
import SelectInput from '@/components/basic/SelectInput'
import { routesInfo } from '@/constants/routesInfo'
import { assembleSelectOptions } from '@/infrastructure/assemblers'

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
    assembleSelectOptions
  }),
  computed: {
    ...mapState({
      animalSpecies: state => state.species.all,
      adoptionStatuses: state => state.status.all
    }),
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
    async submit() {
      try {
        await this.animalCreate({
          name: this.animalName,
          statusUid: this.selectedStatus,
          speciesUid: this.selectedSpecies
        })
        this.handleSubmitOk()
      } catch (error) {
        this.handleSubmitError(error)
      }
    },
    handleSubmitOk() {
      this.$toast.success('Success! Animal registered')
      this.redirectToAnimalList()
    },
    handleSubmitError(error) {
      this.$toast.error('Oops, something went wrong')
      this.submitError =
        'Unknown error; please try again later. More info at Console.'
      console.warn('Error while registering animal: ', error)
    },
    redirectToAnimalList() {
      this.$router.push({ name: routesInfo.animals.name })
    }
  },
  async beforeMount() {
    await this.fetchAllSpecies()
    await this.fetchAllStatuses()
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
