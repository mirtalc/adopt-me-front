<template>
  <div class="text-center">
    <label for="picture" class="actionLabel py-1"
      >Upload photo: {{ selectedPhoto }}</label
    >
    <input
      type="file"
      id="picture"
      ref="file"
      class="hidden"
      @change="handleFileUpload()"
    />
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
    assembleSelectOptions,
    file: ''
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
    }),
    selectedPhoto() {
      return this.file ? this.file.name : ' ... '
    }
  },
  methods: {
    ...mapActions({
      updateAnimal: 'updateAnimal',
      updatePhoto: 'updatePhoto'
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
    async clickSave() {
      if (this.file) await this.submitFile()

      const payload = {
        id: this.animal.id,
        name: this.animalName,
        statusUid: this.selectedStatus,
        speciesUid: this.selectedSpecies
      }
      try {
        await this.updateAnimal(payload)
        this.processSubmitOk()
      } catch (error) {
        this.processSubmitError(error)
      }
    },
    sendToDetails(id) {
      this.$router.push({
        name: routesInfo.animalDetail.name,
        params: {
          animalId: id
        }
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    async submitFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      await this.updatePhoto({ itemId: this.animal.id, formData })
    }
  },
  beforeMount() {
    this.setInitiaValues()
  }
}
</script>

<style>
input,
select,
.actionLabel {
  @apply w-full text-left;
}
</style>
