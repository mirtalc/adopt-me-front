<template>
  <div>
    <div class="row">
      <div class="row__title">Pet's name</div>
      <div>{{ currentAnimal ? currentAnimal.name : '' }}</div>
    </div>
    <div class="row">
      <div class="row__title">Species</div>
      <div>{{ currentAnimal.species.name }}</div>
    </div>
    <div class="row">
      <div class="row__title">Status</div>
      <div>{{ currentAnimal.status }}</div>
    </div>
    <div class="row">
      <div class="row__title">Vaccination history</div>
      <div class="w-8/12" v-if="hasVaccinations">
        <div
          v-for="vaccination in currentAnimal.vaccinations"
          :key="vaccination.id"
          class="leading-tight my-3"
        >
          {{ vaccination.date_vaccinated }} | {{ vaccination.vaccine.name }} |
          {{ vaccination.incidences | defaultIfEmpty }}
        </div>
      </div>
      <div v-else>Ø</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    currentAnimal: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    hasVaccinations() {
      return this.currentAnimal.vaccinations.length
    }
  },
  filters: {
    defaultIfEmpty: value => {
      return value ? `Incidences: ${value}` : 'No incidences'
    }
  }
}
</script>

<style lang="css" scoped>
.row {
  display: flex;
  border-bottom: 1px solid black;
  @apply py-2;
}

.row__title {
  @apply font-bold w-4/12 my-auto;
}
</style>
