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
    <button class="big-button hover:bg-indigo-500" @click="clickSave()">
      Save changes
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TextInput from '@/components/basic/TextInput'
import SelectInput from '@/components/basic/SelectInput'
import { routesInfo } from '@/constants/routesInfo'
import { assembleSelectOptions } from '@/infrastructure/assemblers'

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
    assembleSelectOptions
  }),
  props: {
    animal: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    ...mapState({
      animalSpecies: state => state.species.all,
      adoptionStatuses: state => state.status.all
    })
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
