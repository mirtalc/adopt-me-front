<template>
  <div class="text-center">
    <TextInput
      :name="'animalName'"
      :value="animalName"
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
    <button class="big-button hover:bg-indigo-500" @click="clickSave()">
      Save changes
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TextInput from '@/components/basic/TextInput'
import SelectInput from '@/components/basic/SelectInput'
import { routesInfo } from '@/constants/routesInfo'

export default {
  name: 'DetailEdition',
  components: {
    TextInput,
    SelectInput
  },
  data: () => ({
    animalName: '',
    selectedSpecies: '',
    selectedStatus: '',
    animalSpecies: [
      { text: 'Cat', value: 'CAT' },
      { text: 'Dog', value: 'DOG' }
    ], //TODO obtain from backend
    adoptionStatuses: [
      { text: 'Adopted', value: 'ADOP' },
      { text: 'Deceased', value: 'RIP' },
      { text: 'Processing', value: 'PROC' },
      { text: 'Transferred', value: 'TRANS' },
      { text: 'Available', value: 'AVAIL' }
    ] //TODO obtain from backend
  }),
  props: {
    animal: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    ...mapActions({
      updateAnimal: 'updateAnimal'
    }),
    discardEmitter() {
      this.$emit('discardEvent')
    },
    handleChange(payload) {
      this[payload.targetName] = payload.targetValue
    },
    setInitiaValues() {
      this.animalName = this.animal.name
      this.selectedSpecies = this.animal.species.uid
      this.selectedStatus = this.animal.status.uid
    },
    processSubmitOk() {
      this.$toast.success('Changes saved successfully!')
      this.$emit('editedEvent')
    },
    processSubmitError() {
      this.$toast.error('Oops, something went wrong')
    },
    clickSave() {
      const payload = {
        id: this.animal.id,
        name: this.animalName,
        statusUid: this.selectedStatus,
        speciesUid: this.selectedSpecies
      }
      this.updateAnimal(payload)
        .then(() => this.processSubmitOk())
        .catch(error => this.processSubmitError(error))
    },
    sendToDetails(id) {
      this.$router.push({
        name: routesInfo.animalDetail.name,
        params: {
          animalId: id
        }
      })
    }
  },
  beforeMount() {
    this.setInitiaValues()
  }
}
</script>

<style>
input,
select {
  width: 100%;
}
</style>
